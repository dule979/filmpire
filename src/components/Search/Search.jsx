import { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { selectSearch } from '../../features/currentGenreOrCategory';

import useStyles from './styles';

function Search() {
  const [query, setQuery] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(selectSearch(query));
      setQuery('');
    }
  };

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
