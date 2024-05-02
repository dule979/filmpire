import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './style';

function FeaturedMovie({ movie }) {
  const classes = useStyles();

  return (
    <Box
      component={Link}
      to={`/movie/${movie?.id}`}
      className={classes.featureContainer}
    >
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          media="picture"
          className={classes.cardMedia}
          title={movie?.title}
          alt={movie?.title}
        />
        <Box padding="20px">
          <CardContent
            className={classes.cardContent}
            classes={{ root: classes.cardContentRoot }}
          >
            <Typography variant="h5" gutterBottom>
              {movie?.title}
            </Typography>
            <Typography variant="body2">{movie?.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
export default FeaturedMovie;
