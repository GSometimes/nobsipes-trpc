import { config } from 'dotenv';
config({ path: './.env' });

import express, { Express, Request, Response } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { createContext, trpcRouter } from './trpc';
import { standardRouter } from './routers/standard';
import mongoose from 'mongoose';

// database connection?
mongoose.connect(process.env.DATABASE_URl ?? '');
// console.log('database url', process.env.DATABASE_URl);

mongoose.connection
  .on('open', () => console.log('Your are connected to mongoose'))
  .on('close', () => console.log('Your are disconnected from mongoose'))
  .on('error', (error) => console.log(error));

const appRouter = trpcRouter({
  standard: trpcRouter({
    test: standardRouter,
  }),
});

const app: Express = express();
const port = process.env.PORT ?? 6969;

app.use(cors());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Typescript World!!');
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
