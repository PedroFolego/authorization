// @filename: server.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
 
const t = initTRPC.create();
 
interface User {
  id: number;
  name: string;
  email: string;
  password: string;

  updatedAt?: Date;
  createAt: Date;

  roles?: Role[];
}

interface Role {
  id: number;
  tag: string;
  name: string;

  updatedAt?: Date;
  createAt: Date;

  users?: User[];
}
 
const userList: User[] = [
  {
    id: 1,
    name: 'Katarina',
    email: 'katarina@gmail.com',
    password: 'kat123',
  
    createAt: new Date(),
  },
];
 

const zUser = z.object({ 
  name: z.string(),  
  password: z.string(),
  email: z.string(),
})
const appRouter = t.router({
  userById: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const input = req.input;

      const user = userList.find((it) => it.id === Number(input));
 
      return user;
    }),
  userCreate: t.procedure
    .input(zUser)
    .mutation((req) => {
 
      const user: User = {
        id: Math.random(),
        name: req.input.name,
        
      };
 
      userList.push(user);
 
      return user;
    }),
});
 
export type AppRouter = typeof appRouter;