"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoute_1 = __importDefault(require("./authRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const categoryRoute_1 = __importDefault(require("./categoryRoute"));
const blogRoute_1 = __importDefault(require("./blogRoute"));
const commentRoute_1 = __importDefault(require("./commentRoute"));
const routes = {
    authRoute: authRoute_1.default,
    userRoute: userRoute_1.default,
    categoryRoute: categoryRoute_1.default,
    blogRoute: blogRoute_1.default,
    commentRoute: commentRoute_1.default
};
exports.default = routes;
