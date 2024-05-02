import { Grid } from '@mui/material';
import Movie from '../Movie/Movie';

import useStyles from './styles';

function MovieList({ movies, numberOfMovies, excludeFirst }) {
  const classes = useStyles();
  const first = excludeFirst ? 1 : 0;

  return (
    <Grid container className={classes.moviesContainer}>
      {movies.slice(first, numberOfMovies).map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Grid>
  );
}
export default MovieList;
