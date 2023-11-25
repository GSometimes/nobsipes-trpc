import { rootStatusHandler } from '../controller/standard';
import { publicProcedure, trpcRouter } from '../trpc';

export const standardRouter = trpcRouter({
  rootStatus: publicProcedure.query(rootStatusHandler),
});
