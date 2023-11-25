"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicProcedure = exports.trpcRouter = exports.createContext = void 0;
const server_1 = require("@trpc/server");
// tRPC context; mainly used for auth
const createContext = ({ req, res, }) => ({ req, res }); // no context
exports.createContext = createContext;
// Init tRPC
const t = server_1.initTRPC.context().create();
exports.trpcRouter = t.router;
exports.publicProcedure = t.procedure;
