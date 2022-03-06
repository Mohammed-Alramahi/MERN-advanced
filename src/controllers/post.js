const  HttpException  = require('../error-handlers/exception');
const Post = require('../models/Post');
const User = require('../models/User');
exports.createPost = async (req, res, next) => {
    const { title, content, imagePath } = req.body;
    const userId = req.user;
    console.log(userId);
    try {
        const post = await Post.create({
            title,
            content,
            imagePath,
            creator: userId,
        })
        await post.save();
        res.status(201).json({
            success: true,
            data: post
        })
    }

    catch (err) {
       next(new HttpException(400, err.message));
    }
}

exports.getUserPosts = async (req, res, next) => {
    
    try {        
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
            const posts = await Post.find({ creator: userId })
                .select('-__v -creator');
            res.status(200).json({
                success: true,
                from: "db",
                data: posts
            })
        }

        catch (err) {
         next(new HttpException(400, err.message));
        }
    
    }


exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();

        for (let i = 0; i < posts.length; i++) {
            const user = await getUserInfo(posts[i].creator);
            posts[i].creator = user;
    }
    
        if (!posts.length) {
           return res.status(404).json({
                success: false,
                error: "No Posts Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                from: "DB",
                data: posts
            })
        }
      
     
       }
    catch (err) {
        next(new HttpException(500, err.message));
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
            return res.status(204).json({
                success: true,
                message: "Post Deleted Successfully"
            });
        }
    }
    catch (err) {
        next(new HttpException(500, err.message));
    }

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
            return res.status(200).json({
                success: true,
                message: "Post Updated Successfully"
            });
        }
    }

    catch (error) {
        throw new HttpException(400, error.message);
    }

}
const getUserInfo = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (user) {
            return user
        }
        else {
            throw new Error("User not found");
        }
    }
    catch (err) {
        throw new HttpException(404, err.message);
    }
}