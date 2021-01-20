import React, { useContext } from 'react';

import { RedditContext } from '../context/RedditProvider';

const renderOptions = (options) => (
  options.map((option) => (
    <option
      value={option}
      key={option}
    >
      {option}
    </option>
  ))
);

function Selector() {
  const { selectedSubreddit, availableSubreddits, selectSubreddit } = useContext(RedditContext);
  return(
    <span>
      <h1>{`Selected: ${selectedSubreddit}`}</h1>
      <select
        onChange={(e) => selectSubreddit(e.target.value)}
        value={selectedSubreddit}
      >
        {renderOptions(availableSubreddits)}
      </select>
    </span>
  );
}

export default Selector;