import { Request, Response } from 'express'
import Categories from '../models/categoryModel'
import { IReqAuth } from '../config/interface';
import Blogs from '../models/BlogModel';
const categoryCtrl = {
   createCategory: async (req: IReqAuth, res: Response) => {
      if (!req.user) return res.status(400).json({ msg: 'Invalid Authentication' })
      if (req.user.role !== 'admin') return res.status(400).json({ msg: 'Invalid Authentication' })
      console.log(req.user)
      try {
         const name = req.body.name.toLowerCase();

         const newCategory = new Categories({ name })
         await newCategory.save();

         res.json({ newCategory });

      } catch (err: any) {
         let errMsg;

         if (err.code === 11000) {
            errMsg = Object.values(err.keyValue)[0] + ' already exists';
         } else {
            let name = Object.keys(err.errors)[0];
            errMsg = err.errors[`${name}`].message
         }
         return res.status(500).json({ msg: errMsg })
      }
   },
   getCategories: async (req: Request, res: Response) => {
      try {
         const categories = await Categories.find().sort("-createdAt")
         res.json({ categories });
      } catch (err: any) {
         return res.status(500).json({ msg: err.message })
      }
   },
   updateCategory: async (req: IReqAuth, res: Response) => {
      if (!req.user) return res.status(400).json({ msg: "Invalid Authentication!" })
      if (req.user.role !== 'admin') return res.status(400).json({ msg: "Invalid Authentication!" })
      try {
         const response = await Categories.findByIdAndUpdate(
            {
               _id: req.params.id
            },
            { name: req.body.name.toLowerCase() },
         );
         if (response) {
            res.json({ msg: 'Update Success!' });
         } else {
            res.status(404).json({ msg: 'Category not found' });
         }
      } catch (err: any) {
         return res.status(500).json({ msg: err.message })
      }
   },
   deleteCategory: async (req: IReqAuth, res: Response) => {
      if (!req.user) return res.status(400).json({ msg: "Invalid Authentication!" })
      if (req.user.role !== 'admin') return res.status(400).json({ msg: "Invalid Authentication!" })
      try {
         const blogs = await Blogs.findOne({ category: req.params.id })
         if (blogs) return res.status(400).json({ msg: 'Can not delete!, In this category also exist blogs' })

         const category = await Categories.findByIdAndDelete(req.params.id);
         if (category) {
            res.json({
               errCode: 1,
               msg: 'Delete Success!'
            });
         } else {
            return res.status(404).json({ msg: 'Category does not exist!' })
         }
      } catch (err: any) {
         return res.status(500).json({ msg: err.message })
      }
   }
}


export default categoryCtrl