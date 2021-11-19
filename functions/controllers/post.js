const admin = require('firebase-admin')
const { validationResult } = require("express-validator");
const slugify = require('slugify')

//set firebase firestore 
const db = admin.firestore()

const createPost = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
        let {title,summary,source,uid,author,time,imageUrl} = req.body
        // time format - 06:41 PM 18 Nov 2021,Thursday
        title = slugify(title,{
            lower:true,
            trim:true
        })
        const newPost = {
            title,summary,source,uid,author,time,imageUrl,publish:false
        }
        await db.collection("posts").add(newPost)
        res.json({msg:"Post added successfully"})
    }catch(error){
        // console.log(error)
      res.status(400).json({error})
    }
}

const getEditorPosts = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
        const snapshot = await db.collection('posts').get()
     
      next()
    }catch(error){
      res.status(400).json(error)
    }
}



module.exports = {
    createPost,getEditorPosts
}