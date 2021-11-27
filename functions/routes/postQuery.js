const postQueryRouter = require("express").Router();
const { check } = require("express-validator");
const { createPost, postStatus, editPost } = require("../controllers/postQuery");
const { isEditor } = require("../middlewares/authenticate");

// @route POST /api/addPost
// @desc Create Post
// @access Private admin/editor
postQueryRouter.post(
    "/addPost",
    // isEditor,
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

// @route PUT /api/editPost
// @desc Edit Post
// @access Private admin/editor
postQueryRouter.put(
    "/editPost",
    // isEditor,
    [
      check("title", "Title is required!").notEmpty(),
      check("summary", "Summary is required!").notEmpty(),
      check("source", "source is required!").notEmpty(),
      check("author", "Author is required!").notEmpty(),
      check("uid", "uid is required!").notEmpty(),
      check("time", "time is required!").notEmpty(),
      check("imageUrl", "image url is required!").notEmpty().isURL(),
    ],
    editPost
);

// @route  PATCH /api/postStatus
// @desc   Update Publish Status
// @access Private admin/editor
postQueryRouter.patch(
    "/postStatus",
    // isEditor,
    postStatus
);

module.exports=postQueryRouter