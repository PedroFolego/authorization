import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      {
        name: "Super Admin",
        tag: "super_admin",
      },
      {
        name: "User Admin",
        tag: "user_admin",
      },
      {
        name: "Admin",
        tag: "admin",
      },
      {
        name: "Reader",
        tag: "reader",
      },
      {
        name: "TI Admin",
        tag: "ti_admin",
      },
      {
        name: "RH Admin",
        tag: "rh_admin",
      },
      {
        name: "FI Admin",
        tag: "fi_admin",
      },
    ],
  });

  console.log(roles);
  
  
  const userAlice = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      password: bcrypt.hashSync("1234Alice", 10),
      roles: {
        connect: { tag: "fi_admin" },
      },
    },
  });
  const userBruce = await prisma.user.create({
    data: {
      name: "Bruce",
      email: "bruce@prisma.io",
      password: bcrypt.hashSync("1234Bruce", 10),
      roles: {
        connect: { tag: "super_admin" },
      },
    },
  });
  const userYumi = await prisma.user.create({
    data: {
      name: "Yumi",
      email: "yumi@prisma.io",
      password: bcrypt.hashSync("1234Yumi", 10),
      roles: {
        connect: { tag: "user_admin" },
      },
    },
  });
  const userWallace = await prisma.user.create({
    data: {
      name: "Wallace",
      email: "wallace@prisma.io",
      password: bcrypt.hashSync("1234Wallace", 10),
      roles: {
        connect: { tag: "reader" },
      },
    },
  });
  //https://github.com/prisma/docs/issues/2795
  console.log(userAlice, userBruce, userYumi, userWallace);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
