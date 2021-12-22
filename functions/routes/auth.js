const authRouter = require("express").Router();
const { check } = require("express-validator");
const {createUser,generateCookie, getUserRole, getUsers, updateUserRole} = require('../controllers/auth')

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

// @route GET /api/getUserRole
// @desc get the user role
// @access Private
authRouter.get('/getUserRole',getUserRole)

// @route GET /api/getUserRole
// @desc get the user role
// @access Private
authRouter.get('/getUsers',getUsers)

// @route GET /api/getUserRole
// @desc get the user role
// @access Private
authRouter.patch('/updateUserRole/:uid',updateUserRole)


module.exports = authRouter;
