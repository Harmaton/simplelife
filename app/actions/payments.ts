"use server";

import { db } from "@/lib/db";
import { PurchaseData } from "@/types";

export async function updateSaleAndAccess(data: PurchaseData) {
  console.log("payment action -->", data);

  const productId = data.product.id;
  const productName = data.product.name;
  const buyerEmail = data.buyer.email;
  const buyerName = data.buyer.name;
  const productUcode = data.product.ucode;
  const productPrice = data.purchase.original_offer_price.value

  if (!buyerEmail) {
    console.log("--->  No buyer Enmail Passes");
    return null;
  }

  console.log("buyer Email --->", buyerEmail);

  const user = await db.user.findUnique({
    where: { email: buyerEmail },
  });

  // Record the purchase even if the user does not exist
  const purchase = await db.allpurchase.create({
    data: {
      userId: user ? user.id : productName, // Use product name if no user
      productId: productId,
      productUcode: productUcode,
      productName: productName,
      buyerEmail: buyerEmail,
      price: productPrice,
      buyerName: buyerName,
    },
  });

  console.log("Purchase event -->", purchase);

  if (!user) {
    return purchase;
  }

  // Query all categories to match the product name
  const allCategories = await db.category.findMany({});

  console.log("all categories --->", allCategories);

  const matchedCategories = allCategories.filter((cat: { name: string }) =>
    productName.toLowerCase().split(/\W+/).includes(cat.name.toLowerCase())
  );

  console.log("matched categories ---->", matchedCategories);

  // Update courses if matching categories found
  if (matchedCategories.length > 0) {
    for (const category of matchedCategories) {
      const boughtCourse = await db.course.updateMany({
        where: { categoryId: category.id },
        data: { isBought: true },
      });

      console.log("Bought Courses ---->", boughtCourse);

      // Create CategoryPurchase records for each matched category
      const categorypurchase = await db.categoryPurchase.create({
        data: {
          userId: user.id,
          categoryId: category.id,
          price: productPrice,
          isPaid: true,
        },
      });

      console.log("Category Purchase", categorypurchase);
    }
  }

  return purchase;
}
