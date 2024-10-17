

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();


async function seedCategoryPurchases() {
  try {
    // First, let's get some existing users and categories
    const user = await database.user.findUnique({
      where: {
        email: 'njagiiharmaton@gmailcom'
      }
    })

    console.log(user)

    const categories = await database.category.findMany({ take: 2 });

    if (!user || categories.length === 0) {
      console.log("No users or categories found. Please seed users and categories first.");
      return;
    }

    const categoryPurchases = [];

    // Create 2 sample category purchases
    for (let i = 0; i < 2; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      categoryPurchases.push({
        userId: user.id,
        categoryId: randomCategory.id,
        price: parseFloat((Math.random() * 100).toFixed(2)), // Random price between 0 and 100
        isPaid: true
      });
    }

    // Bulk create the category purchases
    await database.categoryPurchase.createMany({
      data: categoryPurchases,
    });

    console.log(`Successfully seeded ${categoryPurchases.length} category purchases.`);
  } catch (error) {
    console.error("Error seeding category purchases:", error);
  } finally {
    await database .$disconnect();
  }
}

seedCategoryPurchases();


