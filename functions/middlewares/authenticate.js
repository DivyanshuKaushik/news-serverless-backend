const admin = require('firebase-admin')

// Allow access to requested admin resource.
const isAdmin = (req,res,next)=>{
  const idToken = req.headers.authorization || req.cookies.userToken
  if(!idToken){
    return res.status(401).json({error:"Unauthorized"})
  }
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      if (decodedToken.admin) {
        req.uid = decodedToken.uid
        req.data = decodedToken
        next()
      }else{
          return res.status(401).json({error:"Unauthorized"})
      }
    }).catch((e)=>res.status(401).json({error:"Unauthorized"}));
}

// Allow access to requested editor resource.
const isEditor = (req,res,next)=>{
  const idToken = req.headers.authorization || req.cookies.userToken
    if(!idToken){
      return res.status(401).json({error:"Unauthorized"})
    }
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      if (decodedToken.admin || decodedToken.editor) {
        req.uid = decodedToken.uid
        req.data = decodedToken
        next()
      }else{
          return res.status(401).json({error:"Unauthorized"})
      }
    }).catch((e)=>res.status(401).json({error:"Unauthorized"}));
}

// Allow access to requested user resource.
const isReporter = (req,res,next)=>{
  if(!idToken){
    return res.status(401).json({error:"Unauthorized"})
  }
  const idToken = req.headers.authorization || req.cookies.userToken
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      if (decodedToken.reporter || decodedToken.editor || decodedToken.admin) {
        req.uid = decodedToken.uid
        req.data = decodedToken
        next()
      }else{
          return res.status(401).json({error:"Unauthorized"})
      }
    }).catch((e)=>res.status(401).json({error:"Unauthorized"}));
}

module.exports ={
    isAdmin,isEditor,isReporter
}