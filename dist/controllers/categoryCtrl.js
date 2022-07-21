"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const BlogModel_1 = __importDefault(require("../models/BlogModel"));
const categoryCtrl = {
    createCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).json({ msg: 'Invalid Authentication' });
        if (req.user.role !== 'admin')
            return res.status(400).json({ msg: 'Invalid Authentication' });
        console.log(req.user);
        try {
            const name = req.body.name.toLowerCase();
            const newCategory = new categoryModel_1.default({ name });
            yield newCategory.save();
            res.json({ newCategory });
        }
        catch (err) {
            let errMsg;
            if (err.code === 11000) {
                errMsg = Object.values(err.keyValue)[0] + ' already exists';
            }
            else {
                let name = Object.keys(err.errors)[0];
                errMsg = err.errors[`${name}`].message;
            }
            return res.status(500).json({ msg: errMsg });
        }
    }),
    getCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield categoryModel_1.default.find().sort("-createdAt");
            res.json({ categories });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    updateCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).json({ msg: "Invalid Authentication!" });
        if (req.user.role !== 'admin')
            return res.status(400).json({ msg: "Invalid Authentication!" });
        try {
            const response = yield categoryModel_1.default.findByIdAndUpdate({
                _id: req.params.id
            }, { name: req.body.name.toLowerCase() });
            if (response) {
                res.json({ msg: 'Update Success!' });
            }
            else {
                res.status(404).json({ msg: 'Category not found' });
            }
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    deleteCategory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).json({ msg: "Invalid Authentication!" });
        if (req.user.role !== 'admin')
            return res.status(400).json({ msg: "Invalid Authentication!" });
        try {
            const blogs = yield BlogModel_1.default.findOne({ category: req.params.id });
            if (blogs)
                return res.status(400).json({ msg: 'Can not delete!, In this category also exist blogs' });
            const category = yield categoryModel_1.default.findByIdAndDelete(req.params.id);
            if (category) {
                res.json({
                    errCode: 1,
                    msg: 'Delete Success!'
                });
            }
            else {
                return res.status(404).json({ msg: 'Category does not exist!' });
            }
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    })
};
exports.default = categoryCtrl;
