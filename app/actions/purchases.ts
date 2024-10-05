"use server";

import { db } from "@/lib/db";

export async function getAllPurchases() {
  try {
    const purchases = await db.allpurchase.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return purchases;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getDashboardData() {
  const purchases = await getAllPurchases();

  // Get current date and last month's date
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Filter purchases by month
  const thisMonthPurchases = purchases.filter(
    (p) => new Date(p.createdAt) >= thisMonth
  );
  const lastMonthPurchases = purchases.filter((p) => {
    const date = new Date(p.createdAt);
    return date >= lastMonth && date < thisMonth;
  });

  // Calculate metrics for this month
  const thisMonthTotal = thisMonthPurchases.reduce(
    (sum, p) => sum + (p.price || 0),
    0
  );
  const thisMonthOrders = thisMonthPurchases.length;
  const thisMonthClients = new Set(thisMonthPurchases.map((p) => p.buyerEmail))
    .size;

  // Calculate metrics for last month
  const lastMonthTotal = lastMonthPurchases.reduce(
    (sum, p) => sum + (p.price || 0),
    0
  );
  const lastMonthOrders = lastMonthPurchases.length;
  const lastMonthClients = new Set(lastMonthPurchases.map((p) => p.buyerEmail))
    .size;

  // Calculate percentage changes
  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  return {
    totalDelivery: {
      current: thisMonthTotal,
      previous: lastMonthTotal,
      change: calculatePercentageChange(thisMonthTotal, lastMonthTotal),
    },
    orders: {
      current: thisMonthOrders,
      previous: lastMonthOrders,
      change: calculatePercentageChange(thisMonthOrders, lastMonthOrders),
    },
    clients: {
      current: thisMonthClients,
      previous: lastMonthClients,
      change: calculatePercentageChange(thisMonthClients, lastMonthClients),
    },
    allTimeTotals: {
      delivery: purchases.reduce((sum, p) => sum + (p.price || 0), 0),
      orders: purchases.length,
      clients: new Set(purchases.map((p) => p.buyerEmail)).size,
    },
  };
}

export async function checkUserPurchase(userid: string, categoryid: string) {
  try {
    const purchases = await db.categoryPurchase.findMany({
      where: {
        userId: userid,
        categoryId: categoryid,
      },
    });
    if (purchases.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
