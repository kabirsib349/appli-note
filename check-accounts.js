const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: './prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

async function checkAccounts() {
  const accounts = await prisma.account.findMany({
    include: {
      user: true
    }
  });
  
  console.log('=== COMPTES ===');
  console.log(`Nombre total: ${accounts.length}\n`);
  
  accounts.forEach((account, index) => {
    console.log(`Compte ${index + 1}:`);
    console.log(`  Provider: ${account.provider}`);
    console.log(`  Provider Account ID: ${account.providerAccountId}`);
    console.log(`  User ID: ${account.userId}`);
    console.log(`  User Email: ${account.user.email}`);
    console.log(`  User Name: ${account.user.name}`);
    console.log('');
  });
  
  await prisma.$disconnect();
}

checkAccounts();
