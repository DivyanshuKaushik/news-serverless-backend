const postRouter = require("express").Router();
// const { check } = require("express-validator");
const { isEditor } = require("../middlewares/authenticate");
const { getAllPosts, getUserPosts, getPublishedPost, getPublishedPostById, searchPost, getPublishedPostByCategory } = require("../controllers/post");


// @route GET /api/getAllPosts
// @desc get all posts
// @access Private admin/editor
postRouter.get("/getAllPosts",isEditor, getAllPosts);

// @route GET /api/getUserPosts
// @desc get specific user posts
// @access Private admin/editor
postRouter.get("/getUserPosts/:uid", getUserPosts);

// @route GET /api/getPublishedPost
// @desc get all published posts
// @access Public
postRouter.get("/getPublishedPosts", getPublishedPost);

// @route GET /api/getPublishedPostById
// @desc get all published posts
// @access Public
postRouter.get("/getPublishedPostById/:id", getPublishedPostById);

// @route GET /api/getPublishedPostByCategory
// @desc get all published posts by category
// @access Public
postRouter.get("/getPublishedPostByCategory/:category", getPublishedPostByCategory);

// @route GET /api/getPublishedPost
// @desc get all published posts
// @access Public
postRouter.get("/searchPost/:search", searchPost);

module.exports = postRouter;
