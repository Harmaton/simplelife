
const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    
    const adminEmail = "gpietromoura@gmail.com"; // Replace with the hardcoded admin email
    const adminUser = await database.user.findUnique({
      where: { email: adminEmail },
    });

    if (adminUser) {
      await database.user.update({
        where: { email: adminEmail },
        data: { isadmin: true }, // Assuming isAdmin is the field to make the user an admin
      });
      console.log(`User with email ${adminEmail} has been made an admin.`);
    } else {
      console.log(`No user found with email ${adminEmail}.`);
    }
    
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main()