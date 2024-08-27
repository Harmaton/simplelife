'use server'

import { auth } from "@/firebase";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function updateSaleAndAccess(data: any, id: string, buyerDetails: any, productDetails: any) {
    // const productId = productDetails.ucode;
    const productUcode = productDetails.id;
    const productName = productDetails.name;

    const user = auth.currentUser
    const userId = user?.uid

    if(!userId){
        return null
    }
    // Create a new schema to track purchases
     await db.allpurchase.create({
        data: {
            id: id,
            userId: userId,
            productId: productUcode,
            productUcode: productUcode,
            productName: productName,
            buyerEmail: buyerDetails.email,
            price: data.purchase.price.toString(),
        }
    });

    // Query the product type based on ucode
    const pack = await db.pack.findUnique({
        where: {productCode: productUcode },
        include: { categories: true }
    });

    const category = await db.category.findUnique({
        where: { productCode: productUcode },
        include: { Courses: true }
    });

    const course = await db.course.findUnique({
        where: { productcode: productUcode }
    });

    if (pack) {
        // If it's a pack, update all courses in all categories
        for (const category of pack.categories) {
            await db.course.updateMany({
                where: { categoryId: category.id },
                data: { isBought: true }
            });
        }
        
        // Create a PackPurchase record
        await db.packPurchase.create({
            data: {
                userId: userId,
                packId: pack.id,
                price: parseFloat(data.purchase.price),
                isPaid: true
            }
        });
    } else if (category) {
        // If it's a category, update all courses within the category
        await db.course.updateMany({
            where: { categoryId: category.id },
            data: { isBought: true }
        });
        
        // Create a CategoryPurchase record
        await db.categoryPurchase.create({
            data: {
                userId: userId,
                categoryId: category.id,
                price: parseFloat(data.purchase.price),
                isPaid: true
            }
        });
    } else if (course) {
        // If it's a single course, update the course
        await db.course.update({
            where: { productcode: productUcode },
            data: { isBought: true }
        });
         // Create a purchase record
    await db.coursePurchase.create({
        data: {
            userId: userId,
            courseId: course.id,
            price: data.purchase.price.toString(),
        }
    });
    }

 
   

}
