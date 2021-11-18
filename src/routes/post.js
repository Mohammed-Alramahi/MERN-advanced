const express = require('express');
const { createPost, getUserPosts, getPosts, deletePost, updatePost } = require('../controllers/post');
const router = express.Router();
const authorizeUser = require('../middleware/auth');

router.post("/", authorizeUser, createPost);
router.get("/:userId", getUserPosts);
router.get("/", getPosts);
router.delete("/:postId", authorizeUser, deletePost);
router.put("/:postId", authorizeUser, updatePost);
module.exports = router;