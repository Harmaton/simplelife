"use server";

import { db } from "@/lib/db";
import { PurchaseData } from "@/types";

export async function updateSaleAndAccess(data: PurchaseData) {
  const productId = data.product.id;
  const productName = data.product.name;
  const buyerEmail = data.buyer.email;
  const buyerName = data.buyer.name;
  const productUcode = data.product.ucode;
  const productPrice = data.purchase.original_offer_price.value;

  if (!buyerEmail) {
    console.log("--->  No buyer Enmail Passes");
    return null;
  }



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

  if (!user) {
    return purchase;
  }

  // Query all categories to match the product name
  const allCategories = await db.category.findMany({});

  const wordsToIgnore = ["simple life", "pack"];

  const matchedCategories = allCategories.filter((category) => {
    // Split category name into words and filter out ignored words
    const categoryWords = category.name
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => !wordsToIgnore.includes(word));

    // Check if any remaining category word is in the product name
    return categoryWords.some((word) =>
      productName.toLowerCase().includes(word)
    );
  });

  // Update courses if matching categories found
  if (matchedCategories.length > 0) {
    for (const category of matchedCategories) {
      await db.categoryPurchase.create({
        data: {
          userId: user.id,
          categoryId: category.id,
          price: productPrice,
          isPaid: true,
        },
      });
    }
  }

  return purchase;
}


export async function UpdateCancelledPayment(){
  try {
    
  } catch (error) {
    console.log(error)
  }
}

export async function UpdateRefundedPayment(){
  try {
    
  } catch (error) {
    console.log(error)
  }
}

export async function UpdateDelayedPayment(){
  try {
    
  } catch (error) {
    console.log(error)
  }
}

