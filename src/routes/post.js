const express = require('express');
const { createPost, getUserPosts } = require('../controllers/post');
const router = express.Router();
const authorizeUser = require('../middleware/auth');

router.post("/", authorizeUser, createPost);
router.get("/:userId", getUserPosts);
module.exports = router;