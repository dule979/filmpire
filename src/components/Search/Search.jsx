import { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectSearch } from '../../features/currentGenreOrCategory';

import useStyles from './styles';

function Search() {
  const [query, setQuery] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(selectSearch(query));
      setQuery('');
    }
  };

  if (location.pathname !== '/') return null;

  return (
    <div className={classes.searchContainer}>
      <TextField
        variant="standard"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyUp={handleKeyPress}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
export default Search;
