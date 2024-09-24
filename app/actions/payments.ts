'use server'

import { db } from "@/lib/db";
import { PurchaseData } from "@/types";

export async function updateSaleAndAccess(data: PurchaseData) {
    const productUcode = data.data.product.id
    const productName = data.data.product.name
    const buyerEmail = data.data.buyer.email

    if (!buyerEmail) {
        return null;
    }

    const user = await db.user.findUnique({
        where: {
            email: buyerEmail
        }
    })

    if (!user) {
        const purchase = await db.allpurchase.create({
            data: {
                userId: data.data.product.name,
                productId: productUcode,
                productUcode: productUcode,
                productName: productName,
                buyerEmail: buyerEmail,
                price: data.data.purchase.price.value
            }
        })
        return purchase
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

    // Find all categories and check if their names are included in the product name
    const allCategories = await db.category.findMany();
    const matchedCategory = allCategories.find(cat => productName.toLowerCase().includes(cat.name.toLowerCase()));

    const course = await db.course.findFirst({
        where: { title: productName }
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
                price: data.data.purchase.price.value,
                isPaid: true
            }
        });
    } else if (matchedCategory) {
        // If a category name is included in the product name, update all courses within the category
        await db.course.updateMany({
            where: { categoryId: matchedCategory.id },
            data: { isBought: true }
        });

        // Create a CategoryPurchase record
        await db.categoryPurchase.create({
            data: {
                userId: user.id,
                categoryId: matchedCategory.id,
                price: data.data.purchase.price.value,
                isPaid: true
            }
        });
    } else if (course) {
        // If it's a single course, update the course
        const purchasedCourse = await db.course.update({
            where: { id: course.id },
            data: { isBought: true }
        });

        // Create a purchase record
        await db.coursePurchase.create({
            data: {
                userId: user.id,
                courseId: purchasedCourse.id,
                price: data.data.purchase.price.value
            }
        });
    }
}