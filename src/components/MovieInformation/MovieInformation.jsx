import { useState } from 'react';
/* eslint-disable operator-linebreak */
/* eslint-disable no-unsafe-optional-chaining */
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Modal,
  Rating,
  Typography,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  FavoriteBorderOutlined,
  Favorite,
  Remove,
  PlusOne,
  ArrowBack,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  useGetMovieQuery,
  useGetCastQuery,
  useGetRecommendationsQuery,
} from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import genreIcons from '../../assets/genres';

import useStyles from './styles';
import MovieList from '../MovieList/MovieList';

function MovieInformation() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { data, isFetching, isError } = useGetMovieQuery(id);
  const { data: movieCast } = useGetCastQuery(id);
  const { data: recommended } = useGetRecommendationsQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch();

  const isFavorited = false;
  const isWatchlisted = false;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <CircularProgress size="8rem" />
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

  const addToFavorites = () => {};

  const addToWatchlist = () => {};

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          alt={data?.original_title}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          className={classes.poster}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" gutterBottom align="center">
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" gutterBottom align="center">
          {data?.tagline}
        </Typography>
        <Grid className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              {data?.vote_average.toFixed(1)} / 10
            </Typography>
          </Box>
          <Typography variant="h6" gutterBottom>
            {data?.runtime}min{' '}
            {data.spoken_languages.length > 0
              ? `/ ${data.spoken_languages[0].name}`
              : ''}
          </Typography>
        </Grid>
        <Grid item className={classes.genreContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              to="/"
              className={classes.links}
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                height={30}
                className={classes.genreImage}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2em' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {movieCast &&
            movieCast.cast
              .map(
                (character) =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  character.profile_path && (
                    <Grid
                      key={character.credit_id}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      style={{ textDecoration: 'none' }}
                      to={`/actor/${character.id}`}
                    >
                      <img
                        className={classes.castImage}
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character.split('/')[0]}
                      </Typography>
                    </Grid>
                    // eslint-disable-next-line comma-dangle
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferer"
                  endIcon={<Language />}
                  href={data?.homepage}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferer"
                  endIcon={<MovieIcon />}
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    variant="subtitle2"
                    color="inherit"
                    style={{ textDecoration: 'none' }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommended ? (
          <MovieList movies={recommended?.results} numberOfMovies={12} />
        ) : (
          <Box>There is no recommended movies</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
        className={classes.modal}
      >
        <div>
          {data?.videos?.results?.length > 0 && (
            <iframe
              autoPlay
              title="Trailers"
              className={classes.video}
              style={{ border: 'none' }}
              src={`https://youtube.com/embed/${data.videos.results[0].key}`}
              allow="autoplay"
            />
          )}
        </div>
      </Modal>
    </Grid>
  );
}
export default MovieInformation;
