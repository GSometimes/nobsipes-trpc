"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardRouter = void 0;
const standard_1 = require("../controller/standard");
const trpc_1 = require("../trpc");
exports.standardRouter = (0, trpc_1.trpcRouter)({
    rootStatus: trpc_1.publicProcedure.query(standard_1.rootStatusHandler),
});
