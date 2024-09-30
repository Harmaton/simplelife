"use server";

import { db } from "@/lib/db";
import { PurchaseData } from "@/types";

export async function updateSaleAndAccess(data: PurchaseData) {
  const productUcode = data.data.product.id;
  const productName = data.data.product.name;
  const buyerEmail = data.data.buyer.email;

  if (!buyerEmail) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { email: buyerEmail },
  });

  // Record the purchase even if the user does not exist
  const purchase = await db.allpurchase.create({
    data: {
      userId: user ? user.id : productName, // Use product name if no user
      productId: productUcode,
      productUcode: productUcode,
      productName: productName,
      buyerEmail: buyerEmail,
      price: data.data.purchase.price.value,
    },
  });

  if (!user) {
    return purchase;
  }

  // Query all categories to match the product name
  const allCategories = await db.category.findMany();
  const matchedCategories = allCategories.filter((cat) =>
    productName.toLowerCase().includes(cat.name.toLowerCase())
  );

  // Update courses if matching categories found
  if (matchedCategories.length > 0) {
    for (const category of matchedCategories) {
      await db.course.updateMany({
        where: { categoryId: category.id },
        data: { isBought: true },
      });

      // Create CategoryPurchase records for each matched category
      await db.categoryPurchase.create({
        data: {
          userId: user.id,
          categoryId: category.id,
          price: data.data.purchase.price.value,
          isPaid: true,
        },
      });
    }
  }

  return purchase;
}
