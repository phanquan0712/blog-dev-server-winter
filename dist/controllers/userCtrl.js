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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userCtrl = {
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).json({ msg: 'Invalid Authentication' });
        try {
            const { name, avatar } = req.body;
            const user = yield UserModel_1.default.findByIdAndUpdate(req.user._id, { name, avatar });
            return res.status(200).json({ msg: 'User updated', user });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    resetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user)
            return res.status(400).json({ msg: 'Invalid Authentication' });
        if (req.user.type !== 'register')
            return res.status(400).json({
                msg: `Quick login account with ${req.user.type} can't use the function`
            });
        try {
            const { password } = req.body;
            const passworHash = yield bcrypt_1.default.hash(password, 12);
            yield UserModel_1.default.findByIdAndUpdate(req.user._id, { password: passworHash });
            return res.status(200).json({ msg: 'Password updated' });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield UserModel_1.default.findById(req.params.id).select('-password');
            res.json(user);
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    })
};
exports.default = userCtrl;
