import React, { useContext } from 'react';

import { RedditContext } from '../context/RedditProvider';

function Posts() {
  const { posts } = useContext(RedditContext);
  return(
    <ul>
      {posts.map(({ id, title }) => <li key={id}>{title}</li>)}
    </ul>
  );
}

export default Posts;