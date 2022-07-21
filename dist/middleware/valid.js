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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validEmail = exports.validPhone = exports.validRegister = void 0;
const validRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, account, password } = req.body;
    const errors = [];
    // check name
    if (!name) {
        errors.push('Please add your name!');
    }
    else if (name.length > 20) {
        errors.push('Name must be less than 20 characters!');
    }
    // check account
    if (!account) {
        errors.push('Please add your account!');
    }
    else if (!validEmail(account) && !validPhone(account)) {
        errors.push('Email or phone number format is incorrect!');
    }
    // check password
    if (password.length < 6) {
        errors.push('Password must be at least 6 characters!');
    }
    if (errors.length > 0) {
        return res.status(400).json({ msg: errors });
    }
    else {
        next();
    }
});
exports.validRegister = validRegister;
function validPhone(phone) {
    const re = /^[+]/g;
    return re.test(phone);
}
exports.validPhone = validPhone;
function validEmail(email) {
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return regex.test(email);
}
exports.validEmail = validEmail;
