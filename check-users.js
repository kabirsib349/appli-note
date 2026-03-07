const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const adapter = new PrismaBetterSqlite3({ url: './prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

async function checkUsers() {
  const users = await prisma.user.findMany({
    include: {
      accounts: true
    }
  });
  
  console.log('=== UTILISATEURS ===');
  console.log(`Nombre total: ${users.length}\n`);
  
  users.forEach((user, index) => {
    console.log(`Utilisateur ${index + 1}:`);
    console.log(`  ID: ${user.id}`);
    console.log(`  Nom: ${user.name}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Comptes liés:`);
    user.accounts.forEach(account => {
      console.log(`    - ${account.provider} (${account.providerAccountId})`);
    });
    console.log('');
  });
  
  await prisma.$disconnect();
}

checkUsers();
