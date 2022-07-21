import { Request, Response, NextFunction } from 'express';

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
   const { name, account, password } = req.body;
   const errors = [];
   // check name
   if (!name) {
         errors.push('Please add your name!')
   }
   else if (name.length > 20) {
      errors.push('Name must be less than 20 characters!')
   }
   // check account
   if (!account) {
      errors.push('Please add your account!')
   }
   else if (!validEmail(account) && !validPhone(account)) {
      errors.push('Email or phone number format is incorrect!')
   }
   // check password
   if(password.length < 6) {
      errors.push('Password must be at least 6 characters!')
   }
   if(errors.length > 0) {
      return res.status(400).json({msg: errors})
   }
   else {
      next();
   }
}

export function validPhone(phone: string) {
   const re = /^[+]/g;
   return re.test(phone);
}

export function validEmail(email: string) {
   const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
   return regex.test(email);
}