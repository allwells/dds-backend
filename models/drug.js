const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// async function main() {
//   const allDrug = await prisma.drug_table.findMany();
//   console.log(allDrug);
// }

// main()
//   .catch((error) => {
//     throw error;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
