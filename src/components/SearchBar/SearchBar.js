import React, { useState } from 'react';
import style from './index.scss';
import _ from 'lodash';

const SearchBarComponent = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState({});

  /**
   * This will be called every time there is
   * a change in the input
   * @param {*} { target: { value } }
   */
  const onChange = ({ target: { value } }) => {
    setQuery(value);

    const search = _.debounce(sendQuery, 300);

    setSearchQuery(prevSearch => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    search(value);
  };

  /**
   * In charge to send the value
   * to Back End.
   * @param {*} value
   */
  const sendQuery = value => {
    console.log(value);
  };

  return (
    <div>
      <p>Type to search!</p>
      <input type="text" value={query} placeholder="Enter Movie Title" onChange={onChange} />
    </div>
  );
};

export default SearchBarComponent;
