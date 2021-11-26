import React, { useState, useEffect } from 'react';
import Axios from '../../../utils/axios';
import Post from '../Post/Post';
import jwt from 'jsonwebtoken';
function Posts() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const request = (await Axios.get(`/posts`)).data;

    setPosts(request.data);
  };
  const getUserPosts = async () => {
    const userId = jwt.decode(localStorage.getItem('authToken')).id;
    const request = await Axios.get(`/posts/${userId}`);
    console.log(request?.data.data);
  };

  useEffect(() => {
    getPosts();
    getUserPosts();
  }, []);
  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post._id}
            title={post.title}
            content={post.content}
            image={post.imagePath}
            creator={post.creator}
          />
        );
      })}
    </>
  );
}

export default Posts;
