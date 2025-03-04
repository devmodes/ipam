import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { hashSync } from "bcrypt";

async function main() {
  const admin = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
    }
  });

  const user = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
    },
  });

  await prisma.user.upsert({
    where: { email: "ipadmin@domain.com" },
    update: {},
    create: {
      email: "ipadmin@domain.com",
      name: "IP Admin",
      password: hashSync("password", 10),
      role_id: admin.id
    },
  });

  await prisma.user.upsert({
    where: { email: 'ipuser@domain.com' },
    update: {},
    create: {
      email: 'ipuser@domain.com',
      name: "IP User",
      password: hashSync("password", 10),
      role_id: user.id,
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });