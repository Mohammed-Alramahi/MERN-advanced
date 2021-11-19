const Post = require('../models/Post');
const User = require('../models/User');
const redis = require('../utils/redis');
exports.createPost = async (req, res, next) => {
    const { title, content, imagePath } = req.body;
    const userId = req.user;
    try {
        const post = await Post.create({
            title,
            content,
            imagePath,
            creator: userId
        })
        await post.save();

        res.status(201).json({
            success: true,
            data: post
        })
    }

    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.getUserPosts = async (req, res, next) => {
    const userId = req.params.userId;
    const cache = await redis.getCache(userId);

    if (cache) {
        res.status(200).json({
            success: true,
            from: "Redis",
            data: JSON.parse(cache),
        })
    }

    else {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        try {
            const posts = await Post.find({ creator: userId })
                .select('-__v -creator');
            await redis.setCache(userId, posts);
            res.status(200).json({
                success: true,
                from: "db",
                data: posts
            })
        }

        catch (err) {
            res.status(500).json({
                success: false,
                error: err.message
            })
        }
    }

}

exports.getPosts = async (req, res, next) => {
    const cache = await redis.getCache("all-posts");
    if (cache) {
        return res.status(201).json({
            success: true,
            from: "Redis",
            data: JSON.parse(cache)
        })
    }
    else {
        const posts = await Post.find();
        await redis.setCache("all-posts", posts);
        if (!posts) {
            res.status(404).json({
                success: false,
                error: "No Posts Found"
            })
        }

        res.status(200).json({
            success: true,
            from: "DB",
            data: posts
        })
    }

}

exports.deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({
            success: false,
            error: "Post is not found!"
        })
    }
    try {
        if (post.creator.toString() == userId.toString()) {
            await Post.findByIdAndDelete(postId);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    }
    res.status(204).json({
        success: true,
        message: "Post Deleted Successfully",
        post
    })

}

exports.updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const userId = req.user._id.toString().split("\"")[0];;
    const { content, title, imagePath } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
        return res.status(404).json({
            success: false,
            error: "Post is not found!"
        })
    }

    try {
        if (post.creator == userId) {
            await Post.findByIdAndUpdate(postId, { content, title, imagePath });

            const allPosts = await Post.find();
            const posts = await Post.find({ creator: userId })
                .select('-__v -creator');

            await redis.setCache(userId, posts);
            await redis.setCache("all-posts", allPosts);
        }
    }

    catch (error) {
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    }

    res.status(200).json({
        success: true,
        message: "Post Updated Successfully",
    })

}
