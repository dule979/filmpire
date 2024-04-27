import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Divider,
  Box,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const categories = [
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Popular', value: 'popular' },
  { label: 'Upcoming', value: 'upcoming' },
];

// eslint-disable-next-line operator-linebreak
const blueLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
// eslint-disable-next-line operator-linebreak
const redLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

function Sidebar() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          src={theme.palette.mode === 'dark' ? redLogo : blueLogo}
          className={classes.image}
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => {
          return (
            <Link key={label} to="/" className={classes.links}>
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(value))}
                button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[value.toLowerCase()]}
                    height={30}
                    className={classes.genreImages}
                  />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => {
            return (
              <Link key={name} to="/" className={classes.links}>
                <ListItem
                  onClick={() => dispatch(selectGenreOrCategory(id))}
                  button
                >
                  <ListItemIcon>
                    <img
                      src={genreIcons[name.toLowerCase()]}
                      height={30}
                      className={classes.genreImages}
                    />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              </Link>
            );
          })
        )}
      </List>
    </>
  );
}
export default Sidebar;
