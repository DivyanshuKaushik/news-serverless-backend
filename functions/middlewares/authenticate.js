const admin = require('firebase-admin')

const isAdmin = (req,res,next)=>{
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      if (decodedToken.claims.admin) {
        // Allow access to requested admin resource.
        req.uid = decodedToken.uid
        next()
      }else{
          return res.status(401).json({error:"Unauthorized"})
      }
    });
}
const isEditor = (req,res,next)=>{
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      if (decodedToken.claims.admin || decodedToken.claims.admin) {
        // Allow access to requested admin resource.
        req.uid = decodedToken.uid
        next()
      }else{
          return res.status(401).json({error:"Unauthorized"})
      }
    });
}
const isUser = (req,res,next)=>{
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      if (decodedToken.claims.user || decodedToken.claims.admin) {
        // Allow access to requested admin resource.
        req.uid = decodedToken.uid
        next()
      }else{
          return res.status(401).json({error:"Unauthorized"})
      }
    });
}

module.exports ={
    isAdmin,isEditor,isUser
}