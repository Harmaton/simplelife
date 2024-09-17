'use server'

import { db } from "@/lib/db";
import { PurchaseData } from "@/types"; 

export async function updateSaleAndAccess(data: PurchaseData) {
    
    const productUcode = data.data.product.id
    const productName = data.data.product.name
    const buyerEmail =  data.data.buyer.email

    if (!buyerEmail) {
        return null;
    }

    const user = await db.user.findUnique({where: {
        email: buyerEmail
    }})

    if (!user) {
        return null;
    }
    
    // Create a new schema to track purchases
    await db.allpurchase.create({
        data: {
            userId: user.id,
            productId: productUcode,
            productUcode: productUcode,
            productName: productName,
            buyerEmail: buyerEmail,
            price: data.data.purchase.price.value
        }
    });

    // Query the product type based on ucode
    const pack = await db.pack.findUnique({
        where: { productCode: productUcode },
        include: { categories: true }
    });

    const category = await db.category.findUnique({
        where: { productCode: productUcode },
        include: { Courses: true }
    });

    const course = await db.course.findMany({
        where: { productcode: productUcode, 
            
         } 
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
                userId: user.id,
                packId: pack.id,
                price: data.data.purchase.price.value, // Assuming price is still part of data
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
                userId: user.id,
                categoryId: category.id,
                price: data.data.purchase.price.value, // Changed to number type
                isPaid: true
            }
        });
    } else if (course) {
        // If it's a single course, update the course
      const purchasedcourse =  await db.course.update({
            where: { productcode: productUcode }, 
            data: { isBought: true }
        });
        
        // Create a purchase record
        await db.coursePurchase.create({
            data: {
                userId: user.id,
                courseId: purchasedcourse.id,
                price: data.data.purchase.price.value          }
        });
    }
}