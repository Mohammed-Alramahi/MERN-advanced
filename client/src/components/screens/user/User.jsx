import React from 'react';
import female from '../../../images/defaults/female.jpg';
import male from '../../../images/defaults/male.png';
function User(props) {
  let userImage = props.userImage;
  if (userImage == 'default') {
    userImage = props.gender == male ? male : female;
  }
  return (
    <div>
      <img src={userImage} width='250px' height='250px' />
      <strong>{props.userName}</strong>
    </div>
  );
}

export default User;
