import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client" 

const prisma = new PrismaClient();

const users = [
    {
      username: "admin",
      email: "admin@admin.com",
    },
    {
      username: "user",
      // use your own email here
      email: "spencerxu79@gmail.com",
    },
  ];


const tickets = [
    {
        
        title:"Ticket 1",
        content:"This is first ticket from the database.",
        status:"DONE" as const,
        deadline: new Date().toISOString().split("T")[0],
        bounty: 499,
    },
    {
        
        title:"Ticket 2",
        content:"This is second ticket from the database.",
        status:"OPEN" as const,
        deadline: new Date().toISOString().split("T")[0],
        bounty: 399,
        
    },
    {
        
        title:"Ticket 3",
        content:"This is third ticket from the database.",
        status:"IN_PROGRESS" as const,
        deadline: new Date().toISOString().split("T")[0],
        bounty: 599,
    }
]

const seed = async () => {

    const t0 = performance.now()
    console.log("DB Seed: Started ...")

    await prisma.user.deleteMany();
    await prisma.ticket.deleteMany();

    const passwordHash = await hash("aycaramba");

    const dbUsers = await prisma.user.createManyAndReturn({
        data: users.map((user) => ({
          ...user,
          passwordHash,
        })),
      });

      await prisma.ticket.createManyAndReturn({
        data: tickets.map((ticket) => ({
          ...ticket,
          userId: dbUsers[0].id,
        })),
      });

    const t1 = performance.now()
    console.log(`DB Seed: Finished (${t1-t0}ms)`)


}

seed();