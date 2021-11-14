const admin = require("firebase-admin");
const authRouter = require("express").Router();
const { check, validationResult } = require("express-validator");

// @route POST /api/signup
// @desc Create User
// @access Public
authRouter.post(
  "/signup",
  [
    check("email", "Email is required!!").notEmpty().isEmail(),
    check("password", "Password is required!!").notEmpty().trim(),
    check('name','Name is Required!!').notEmpty().trim(),
    check("phone",'Phone is Required').notEmpty().isMobilePhone()
  ],
  async (req, res) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(401).json({errors:errors.array()})
      }
      const {name,email,password,phone} = req.body
    //  const role = "admin"
      const {uid} = await admin.auth().createUser({name,email,password,phone})
      await admin.auth().setCustomUserClaims(uid, { admin:true })
      const data = await admin.auth().getUser(uid)
      return res.status(201).json({ uid,data })
  }
);

// @route POST /api/signin
// @desc Login User
// @access Public
authRouter.post(
    "/signin",
    [
      check("email", "Email is required!!").notEmpty().isEmail(),
      check("password", "Password is required!!").notEmpty().trim(),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(401).json({errors:errors.array()})
        }
    }
  );

module.exports = authRouter;
