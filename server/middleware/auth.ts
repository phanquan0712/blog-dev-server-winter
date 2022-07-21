import { Response, Request, NextFunction } from 'express'
import Users from '../models/UserModel'
import jwt from 'jsonwebtoken'
import { IDecodedToken, IReqAuth } from '../config/interface'

const auth = async(req: IReqAuth, res: Response, next: NextFunction) => {
   try {
      const token = req.header('Authorization')
      if(!token) return res.status(400).json({ msg: 'Invalid Authentication'})

      const decode = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
      if(!decode) return res.status(400).json({ msg: 'Invalid Authentication'})
      const user = await Users.findById(decode.id).select('-password')
      if(!user) return res.status(400).json({ msg: 'The user does not exist' })
      req.user = user;

      next();
   }
   catch(err: any) {
      return res.status(500).json({ msg: err.message })
   }
}

export default auth;