"use server";

import { db } from "@/lib/db";

export async function getAllPurchases() {
  try {
    const purchases = await db.allpurchase.findMany({});
    return purchases;
  } catch (error) {
    console.log(error);
    return [];
  }
}
