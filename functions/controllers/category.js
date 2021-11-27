const admin = require('firebase-admin')
const { validationResult } = require("express-validator");

// initialize firestore 
const db = admin.firestore()

const addCategory = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
        const {category} = req.body
        const categorySnap = await db.collection('category').where('category','==',category).get()
        categorySnap.forEach(doc=>{
            let cat = {...doc.data()}
            if(cat.category){
                return res.status(400).json({error:"Category exist!"})
            }
        })
        await db.collection('category').add({category})
        res.json({msg:"Category added successfully"})
        
    }catch(error){
      res.status(400).json({error})
    }
}

const getCategory = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
        const snapshot = await db.collection('category').get()
        let category = []
        snapshot.forEach((doc)=>{
            category.push({id:doc.id,...doc.data()})
        })
        res.json({category})
        
    }catch(error){
      res.status(400).json({error})
    }
}

const deleteCategory = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
       const {id} = req.params
       const snap = await db.collection('category').doc(id).get()
       if(!snap.data()){
            return res.json({err:"Category Doesn't exist",...snap.data()})
       }
       db.collection('category').doc(id).delete().then(()=>{
           res.json({msg:"Category Deleted Successfully!!"})
       }).catch(e=>res.json({e}))
        
    }catch(error){
      res.status(400).json({error})
    }
}


module.exports = {
    addCategory,getCategory,deleteCategory
}