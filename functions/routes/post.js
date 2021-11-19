const postRouter = require("express").Router();
const { check } = require("express-validator");
const { createPost, getEditorPosts } = require("../controllers/post");
const { isEditor } = require("../middlewares/authenticate");

// @route POST /api/addPost
// @desc Create Post
// @access Private admin/editor
postRouter.post(
  "/addPost",
  isEditor,
  [
    check("title", "Title is required!").notEmpty(),
    check("summary", "Summary is required!").notEmpty(),
    check("source", "source is required!").notEmpty(),
    check("author", "Author is required!").notEmpty(),
    check("uid", "uid is required!").notEmpty(),
    check("time", "time is required!").notEmpty(),
    check("imageUrl", "image url is required!").notEmpty().isURL(),
  ],
  createPost
);
postRouter.post("/upload",(req,res)=>{
    console.log(req)
    return res.json({body:req.body,file:req.file})
});

// @route POST /api/getPosts
// @desc get editors posts
// @access Private admin/editor
postRouter.get("/getPosts", isEditor, getEditorPosts);

module.exports = postRouter;
