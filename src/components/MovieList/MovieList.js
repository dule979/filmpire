import { Grid } from '@mui/material';
import Movie from '../Movie/Movie';

import useStyles from './styles';

function MovieList({ movies }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  );
}
export default MovieList;
