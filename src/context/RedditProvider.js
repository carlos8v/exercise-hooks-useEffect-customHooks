import React, { createContext, useState, useEffect } from 'react';

import { getPostsBySubreddit } from '../services/redditAPI';

const RedditContext = createContext();

function RedditProvider({ children }) {
  const [selectedSubreddit, setSelectedSubreddit] = useState('reactjs');
  const [shouldRefreshSubreddit, setShouldRefreshSubreddit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [postsBySubreddit, setPostsBySubreddit] = useState({
    frontend: {},
    reactjs: {},
  });

  const fetchPosts = () => {
    if (!shouldFetchPosts()) return;

    setShouldRefreshSubreddit(false);
    setIsFetching(true);

    getPostsBySubreddit(selectedSubreddit)
      .then(handleFetchSuccess, handleFetchError);
  };

  useEffect(fetchPosts, [selectedSubreddit, shouldRefreshSubreddit]);

  const shouldFetchPosts = () => {
    const posts = postsBySubreddit[selectedSubreddit];

    if (!posts.items) return true;
    if (isFetching) return false;
    return shouldRefreshSubreddit;
  };

  const handleFetchSuccess = (json) => {
    const lastUpdated = Date.now();
    const items = json.data.children.map((child) => child.data);

    setShouldRefreshSubreddit(false);
    setIsFetching(false);
    setPostsBySubreddit((prevState) => ({
      ...prevState,
      [selectedSubreddit]: {
        items,
        lastUpdated,
      }
    }));
  };

  const handleFetchError = (error) => {
    setShouldRefreshSubreddit(false);
    setIsFetching(false);

    setPostsBySubreddit((prevState) => ({
      ...prevState,
      [selectedSubreddit]: {
        error: error.message,
        items: [],
      }
    }));
  }

  const handleSubredditChange = (selectedSubreddit) => {
    setSelectedSubreddit(selectedSubreddit);
  };

  const handleRefreshSubreddit = () => {
    setShouldRefreshSubreddit(true);
  }

  return(
    <RedditContext.Provider
      value={{
        postsBySubreddit,
        selectedSubreddit,
        shouldRefreshSubreddit,
        isFetching,
        selectSubreddit: handleSubredditChange,
        fetchPosts,
        refreshSubreddit: handleRefreshSubreddit,
        availableSubreddits: Object.keys(postsBySubreddit),
        posts: postsBySubreddit[selectedSubreddit].items,
      }}
    >
      {children}
    </RedditContext.Provider>
  );
}

export { RedditContext, RedditProvider };