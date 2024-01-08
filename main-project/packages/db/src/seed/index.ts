import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const seedData = Array.from({ length: 100 }, (_, index) => ({
    email: `user${index + 1}@example.com`,
    profileImage:
      "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    firstName: `Robin${index + 1}`,
    lastName: "Hood",
    login: `user${index + 1}`,
    url: `https://example.com/user${index + 1}`,
    phone: "1234567890",
    kind: "regular",
    status: "offline",
    points: 0,
    twoFactorEnabled : false
  }));

  // Check if users already exist based on their emails
  const existingEmails = await prisma.user.findMany({
    where: {
      email: {
        in: seedData.map((user) => user.email),
      },
    },
    select: {
      email: true,
    },
  });

  const existingEmailSet = new Set(existingEmails.map((user) => user.email));

  const uniqueSeedData = seedData.filter(
    (user) => !existingEmailSet.has(user.email)
  );
  await prisma.user.createMany({
    data: uniqueSeedData,
  });
}

seed()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
