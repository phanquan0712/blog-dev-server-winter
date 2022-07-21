"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        require: [true, 'Please add a name'],
        unique: true,
        maxLength: [50, 'Name is up to 50 chars long']
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('categories', categorySchema);
