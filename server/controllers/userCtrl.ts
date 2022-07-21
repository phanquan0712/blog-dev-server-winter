import { Request, Response } from "express"
import { IReqAuth } from "../config/interface"
import Users from '../models/UserModel'
import bcrypt from 'bcrypt'
const userCtrl = {
   updateUser: async(req: IReqAuth, res: Response) => {
      if(!req.user) return res.status(400).json({ msg: 'Invalid Authentication' })
      try {
         const { name, avatar } = req.body
         const user = await Users.findByIdAndUpdate(req.user._id, { name, avatar })
         return res.status(200).json({ msg: 'User updated', user })
      }
      catch(err: any) {
         return res.status(500).json({ msg: err.message })
      }
   },
   resetPassword: async(req: IReqAuth, res: Response) => {
      if(!req.user) return res.status(400).json({ msg: 'Invalid Authentication'})
      if(req.user.type !== 'register') return res.status(400).json({  
         msg: `Quick login account with ${req.user.type} can't use the function`
      })
      try  {
         const { password } = req.body
         const passworHash = await bcrypt.hash(password, 12)
         await Users.findByIdAndUpdate(req.user._id, { password: passworHash })
         return res.status(200).json({ msg: 'Password updated' })
      }
      catch(err: any) {
         return res.status(500).json({ msg: err.message })
      }
   },
   getUser: async(req: Request, res: Response) => {
      try {
         const user = await Users.findById(req.params.id).select('-password');
         res.json(user)
      } catch(err: any) {
         return res.status(500).json({ msg: err.message })
      }
   }
}

export default userCtrl;