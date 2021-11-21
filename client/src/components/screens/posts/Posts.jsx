import React, { useState, useEffect } from 'react';
import Axios from '../../../utils/axios';
import Post from '../Post/Post';
function Posts() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const request = (await Axios.get('/posts')).data;
    console.log(request.data);
    setPosts(request.data);
  };

  useEffect(() => {
    getPosts();
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
