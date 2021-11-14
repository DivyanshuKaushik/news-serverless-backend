const admin = require('firebase-admin')
const { validationResult } = require("express-validator");

const createUser = async (req, res, next) => {
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
      const {uid} = await admin.auth().createUser({name,email,password,phone})
      await admin.auth().setCustomUserClaims(uid, { admin:true })
      const data = await admin.auth().getUser(uid)

      const token = await admin.auth().createCustomToken(uid,{admin:true})
      res.status(201).json({ token})
      next()
    }catch(error){
      res.status(400).json(error)
    }
}

const generateCookie = (req, res) => {

    // Get the ID token passed and the CSRF token.
    const idToken = req.body.idToken.toString();
    const csrfToken = req.body.csrfToken.toString();
    // Guard against CSRF attacks.
    if (csrfToken !== req.cookies.csrfToken) {
      res.status(401).send('UNAUTHORIZED REQUEST!');
      return;
    }
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

module.exports = {
    createUser,generateCookie
}