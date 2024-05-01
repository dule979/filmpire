import { useParams, Link, useHistory } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import {
  useGetActorBiographyQuery,
  useGetMoviesByActorQuery,
} from '../../services/TMDB';
import useStyles from './styles';
import MovieList from '../MovieList/MovieList';

function Actors() {
  const { id } = useParams();
  const { data, isError, isFetching } = useGetActorBiographyQuery(id);
  // eslint-disable-next-line operator-linebreak
  const { data: movies, isFetching: isMoviesFetching } =
    useGetMoviesByActorQuery(id);
  const classes = useStyles();
  const history = useHistory();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xl={4} lg={5}>
        <img
          alt={data?.name}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          className={classes.image}
        />
      </Grid>
      <Grid
        item
        xl={8}
        lg={7}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h2" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5">
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography
          variant="body2"
          paragraph
          align="justify"
          style={{ marginTop: '1rem' }}
        >
          {data?.biography || 'No biography yet'}
        </Typography>
        <Box marginTop="2rem" display="flex" justifyContent="space-around">
          <Button
            target="_blank"
            rel="noopener noreferer"
            variant="contained"
            href={`https://imdb.com/name/${data?.imdb_id}`}
          >
            IMDB
          </Button>
          <Button startIcon={<ArrowBack />} onClick={() => history.goBack()}>
            Back
          </Button>
        </Box>
      </Grid>
      <Box marginTop="2rem" width="100%">
        <Typography variant="h2" align="center" gutterBottom>
          Movies
        </Typography>
        {movies && !isMoviesFetching ? (
          <MovieList movies={movies?.cast} numberOfMovies={18} />
        ) : (
          <Box display="flex" justifyContent="center" alignContent="center">
            <CircularProgress size="4rem" />
          </Box>
        )}
      </Box>
    </Grid>
  );
}
export default Actors;
