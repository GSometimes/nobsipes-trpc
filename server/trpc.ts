import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

// tRPC context; mainly used for auth
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res }); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

// Init tRPC
const t = initTRPC.context<Context>().create();

export const trpcRouter = t.router;
export const publicProcedure = t.procedure;
