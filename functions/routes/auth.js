const authRouter = require("express").Router();
const { check } = require("express-validator");
const {createUser,generateCookie} = require('../controllers/auth')

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
  createUser
);

// authRouter.post('/verify')

// @route POST /api/sessonLogin
// @desc verify user and generate sesson cookie
// @access Public
authRouter.post('/sessionLogin',generateCookie );
module.exports = authRouter;
