const admin = require('firebase-admin')
const { validationResult } = require("express-validator");
const slugify = require('slugify');

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
        let dateObj = new Date();
        time = `${dateObj.toLocaleTimeString()} ${dateObj.toDateString()}`
        const newPost = {
            title,summary,source,uid,author,time,imageUrl,publish:false,timestamp:admin.firestore.FieldValue.serverTimestamp()
        }
        // await db.collection("posts").doc(uid).collection('posts').add(newPost)
        await db.collection(`posts/${uid}/posts`).add(newPost)
        res.json({msg:"Post added successfully"})
    }catch(error){
        // console.log(error)
      res.status(400).json({error})
    }
}

const postStatus = async(req,res)=>{
    try{
        const {uid,id,publish} = req.body
        const data = await db.collection('posts').doc(uid).collection('posts').doc(id).update({publish})
        if(publish){
            return res.json({msg:"Post Published"})
        }
        res.json({msg:"Post Unpublished"})
    }catch(error){
      res.status(400).json({error})
    }
}


const editPost = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
        let {title,summary,source,uid,author,time,imageUrl,id} = req.body
        // time format - 06:41 PM 18 Nov 2021,Thursday
        title = slugify(title,{
            lower:true,
            trim:true
        })
        let dateObj = new Date();
        time = `${dateObj.toLocaleTimeString()} ${dateObj.toDateString()}`
        const updatedPost = {
            title,summary,source,uid,author,time,imageUrl,publish:false,timestamp:admin.firestore.FieldValue.serverTimestamp()
        }
        await db.collection("posts").doc(uid).collection('posts').doc(id).set(updatedPost)
        res.json({msg:"Post Updated successfully"})
    }catch(error){
        // console.log(error)
      res.status(400).json({error})
    }
}

module.exports = {
    createPost,postStatus,editPost
}