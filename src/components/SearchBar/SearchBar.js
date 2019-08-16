import React, { useState } from 'react';
import _ from 'lodash';
import { fetchData } from '../../services/movies';
import ResultListComponent from '../ResultList';
import './index.scss';

const SearchBarComponent = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState({});
  const [dataList, setDataList] = useState([]);
  const [errorMssg, setErrorMssg] = useState('');
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

    if (value) {
      search(value);
    } else {
      setDataList([]);
      setErrorMssg('');
    }
  };

  /**
   * In charge to send the value
   * to the API.
   * @param {*} value
   */
  const sendQuery = async value => {
    const { cancelPrevQuery, result } = await fetchData(value);

    if (cancelPrevQuery) return;

    if (result.Response === 'True') {
      setDataList(result.Search);
      setErrorMssg('');
    } else {
      setDataList([]);
      setErrorMssg(result.Error);
    }
  };

  return (
    <div>
      <div className="SearchBar">
        <p className="SearchBar_title">Type to search!</p>
        <input
          className="SearchBar_input"
          type="text"
          value={query}
          placeholder="Enter Movie Title"
          onChange={onChange}
        />
      </div>
      <div>
        <ResultListComponent items={dataList} />
        {errorMssg}
      </div>
    </div>
  );
};

export default SearchBarComponent;
