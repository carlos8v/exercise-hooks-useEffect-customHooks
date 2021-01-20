import React, { useContext, useEffect } from 'react';

import { RedditContext } from './context/RedditProvider';

import Posts from './components/Posts';
import Selector from './components/Selector';

function App() {
  const {
    fetchPosts,
    selectedSubreddit, 
    postsBySubreddit, 
    isFetching,
    refreshSubreddit,
  } = useContext(RedditContext);

  useEffect(fetchPosts,[]);

  const { items: posts = [] } = postsBySubreddit[selectedSubreddit];
  const isEmpty = posts.length === 0;

  const renderLastUpdatedAt = () => {
    const { lastUpdated } = postsBySubreddit[selectedSubreddit];

    if (!lastUpdated) return null;

    return (
      <span>
        {`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}.`}
      </span>
    );
  };

  const renderRefreshButton = () => {
    if (isFetching) return null;

    return (
      <button
        type="button"
        onClick={(event) => refreshSubreddit(event)}
        disabled={isFetching}
      >
        Refresh
      </button>
    );
  };

  return(
    <div>
      <Selector />
      <div>
        {renderLastUpdatedAt()}
        {renderRefreshButton()}
      </div>
      {isFetching && <h2>Loading...</h2>}
      {!isFetching && isEmpty && <h2>Empty.</h2>}
      {!isFetching && !isEmpty && <Posts />}
    </div>
  );
}

export default App;
