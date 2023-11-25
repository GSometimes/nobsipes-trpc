"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: './.env' });
const express_1 = __importDefault(require("express"));
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const cors_1 = __importDefault(require("cors"));
const trpc_1 = require("./trpc");
const standard_1 = require("./routers/standard");
const mongoose_1 = __importDefault(require("mongoose"));
// import model
const recipe_1 = __importDefault(require("./models/recipe"));
console.log('recipe', recipe_1.default);
// database connection?
mongoose_1.default.connect((_a = process.env.DATABASE_URl) !== null && _a !== void 0 ? _a : '');
// console.log('database url', process.env.DATABASE_URl);
mongoose_1.default.connection
    .on('open', () => console.log('Your are connected to mongoose'))
    .on('close', () => console.log('Your are disconnected from mongoose'))
    .on('error', (error) => console.log(error));
const appRouter = (0, trpc_1.trpcRouter)({
    standard: (0, trpc_1.trpcRouter)({
        test: standard_1.standardRouter,
    }),
});
const app = (0, express_1.default)();
const port = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 6969;
app.use((0, cors_1.default)());
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: trpc_1.createContext,
}));
app.get('/', (req, res) => {
    res.send('Hello Typescript World!!');
});
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
