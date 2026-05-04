import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.documentShare.deleteMany();
  await prisma.document.deleteMany();
  await prisma.user.deleteMany();

  const kumar = await prisma.user.create({
    data: {
      name: "Kumar",
      email: "kumar@demo.com",
    },
  });

  const alex = await prisma.user.create({
    data: {
      name: "Alex",
      email: "alex@demo.com",
    },
  });

  const maya = await prisma.user.create({
    data: {
      name: "Maya",
      email: "maya@demo.com",
    },
  });

  const sampleDoc = await prisma.document.create({
    data: {
      title: "Welcome to MiniDocs",
      contentHtml:
        "<h1>Welcome to MiniDocs</h1><p>This is a lightweight collaborative document editor.</p><ul><li>Create rich-text documents</li><li>Upload .txt or .md files</li><li>Share with seeded users</li></ul>",
      ownerId: kumar.id,
    },
  });

  await prisma.documentShare.create({
    data: {
      documentId: sampleDoc.id,
      userId: alex.id,
    },
  });

  console.log("Seeded users:");
  console.log({ kumar, alex, maya });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });