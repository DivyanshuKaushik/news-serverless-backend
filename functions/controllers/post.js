const admin = require('firebase-admin')
const { validationResult } = require("express-validator");

//set firebase firestore 
const db = admin.firestore()

const getAllPosts = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
        db.collectionGroup('posts').orderBy("timestamp",'desc').get().then(snapshot=>{     
            let posts = []
            snapshot.forEach(doc=>{
                posts.push({id:doc.id,...doc.data()})
            })
            return res.json(posts)
        }).catch((e)=>{return res.json(e)})
       
    }catch(error){
      res.status(400).json({error})
    }
}
const getUserPosts = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
        const uid = req.params.uid
        let posts = []
        const data = await db.collection('posts').doc(uid).collection('posts').orderBy("timestamp",'desc').get()
        data.forEach(doc=>{
            posts.push({id:doc.id,...doc.data()})
        })
        res.json(posts)
       
    }catch(error){
      res.status(400).json({error})
    }
}

const getPublishedPost = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
        db.collectionGroup('posts').where("publish","==",true).orderBy("timestamp",'desc').get().then(snapshot=>{     
            let posts = []
            snapshot.forEach(doc=>{
                posts.push({id:doc.id,...doc.data()})
            })
            res.status(200).json(posts)
        }).catch((e)=>{return res.json(e)})
       
    }catch(error){
      res.status(400).json({error})
    }
}

const getPublishedPostById = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
        // const {uid,id} = req.query
        const {id} = req.params
        db.collectionGroup('posts').where("publish","==",true).get().then(snapshot=>{  
           // return res.json(id)   
            snapshot.forEach(doc=>{
                if(doc.id===id){
                    let post = {id:doc.id,...doc.data()}
                    return res.status(200).json(post)
                }
            })
        }).catch((e)=>{return res.json('geterror')})
       
        
    }catch(error){
        // console.log(error)
      res.status(400).json({error})
    }
}

const searchPost = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
        const {search} = req.params
        db.collectionGroup('posts').where("publish","==",true).where("title",'array-contains',"divyanshu").orderBy("timestamp",'desc').get().then(snapshot=>{     
            let posts = []
            snapshot.forEach(doc=>{
                posts.push({id:doc.id,...doc.data()})
            })
            res.status(200).json(posts)
        }).catch((e)=>{return res.json(e)})
       
    }catch(error){
      res.status(400).json({error})
    }
}



module.exports = {
   getAllPosts,getUserPosts,getPublishedPost,getPublishedPostById,searchPost
}