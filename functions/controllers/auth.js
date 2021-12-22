const admin = require('firebase-admin')
const { validationResult } = require("express-validator");

const createUser = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    try{
      const {name,email,password,phone} = req.body
      admin.auth().getUserByEmail(email).then(user=>{
        if(user.uid){
          return res.status(400).json({error:"Already Registered"})
        }
      })
      //  const role = "admin"
      const {uid} = await admin.auth().createUser({displayName:name,email,password,phone})
      await admin.auth().setCustomUserClaims(uid, { editor:true })
      const data = await admin.auth().getUser(uid)

      // const expiresIn = 60 * 60 * 24 * 5 * 1000;
      // const options = { maxAge: expiresIn, httpOnly: true};
      // res.cookie('name','divyanshu',options)

      // const token = await admin.auth().createCustomToken(uid,data)
      res.status(201).json({ msg:"User Registered Successfully",data})
    }catch(error){
      res.status(400).json(error)
    }
}

const generateCookie = (req, res) => {

  console.log(req.body)

    // Get the ID token passed and the CSRF token.
    const idToken = req.body.idToken.toString();
    // const csrfToken = req.body.csrfToken.toString();
    // Guard against CSRF attacks.
    // if (csrfToken !== req.cookies.csrfToken) {
    //   res.status(401).send('UNAUTHORIZED REQUEST!');
    //   return;
    // }
    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    admin.auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie('session', sessionCookie, options);
        res.end(JSON.stringify({ status: 'success' }));
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      }
    );
  }

  const getUserRole = (req,res)=>{
    const idToken = req.headers.authorization
    if(!idToken){
      return res.status(401).json({error:"Unauthorized"})
    }
      admin.auth().verifyIdToken(idToken)
      .then((decodedToken) => {
        if (decodedToken.admin) {
         res.status(200).json({admin:true})
        }
        else if(decodedToken.editor){
          res.status(200).json({editor:true})
        }
        else if(decodedToken.reporter){
          res.status(200).json({reporter:true})
        }
        else{
            return res.status(401).json({error:"Unauthorized"})
        }
      }).catch((e)=>res.status(401).json({error:"Unauthorized"}));
  }

  const getUsers = async(req,res)=>{
    try{
      const users = await admin.auth().listUsers()
      res.status(200).json(users)

    }catch(err){
      res.status(500).json(err)
    }
  }

  const updateUserRole = async(req,res)=>{
    try{
      if(!req.body.admin || !req.body.editor || req.body.reporter   ){
        return res.status(400).json({error:"Empty fields"})
      }
      await admin.auth().setCustomUserClaims(req.params.uid, req.body)
      res.json({msg:"Role updated"})
    }catch(err){
      res.status(500).json(err)
    }
  }
module.exports = {
    createUser,generateCookie,getUserRole,getUsers,updateUserRole
}