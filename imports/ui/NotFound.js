import React from 'react';
import { Link } from 'react-router'; 

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
          <h1>Page Not Found</h1>
          <p>Hi, I'm the internet. You and I need to talk. The internet is for everyone. It is very important, and this really can't be stressed enough, that you don't blame the programmer.</p>
          <Link to="/" className="button button--link">HEAD HOME</Link>
      </div>
    </div>
  ); 
}; 

// export default class NotFound extends React.Component {
//     render() {
//       return <p>Not Found component here</p>;
//     }
//   }