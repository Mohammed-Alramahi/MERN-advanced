import React from 'react';
import User from '../user/User';

function Post(props) {
  return (
    <div>
      <User
        userName={props.creator.userName}
        gender={props.creator.gender}
        userImage={props.creator.image}
      />
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

export default Post;
