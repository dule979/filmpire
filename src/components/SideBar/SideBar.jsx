import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const categories = [
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Popular', value: 'popular' },
  { label: 'Upcoming', value: 'upcoming' },
];

const genres = [
  { label: 'Action', value: 'action' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

function Sidebar() {
  const theme = useTheme();
  const classes = useStyles();

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
            <Link key={value} to="/" className={classes.links}>
              <ListItem onClick={() => {}} button>
                {/* <ListItemIcon>
                  <img
                    src={blueLogo}
                    height={30}
                    className={classes.genreImages}
                  />
                </ListItemIcon> */}
                <ListItemText primary={label} />
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {genres.map(({ label, value }) => {
          return (
            <Link key={value} to="/" className={classes.links}>
              <ListItem onClick={() => {}} button>
                {/* <ListItemIcon>
                  <img
                    src={blueLogo}
                    height={30}
                    className={classes.genreImages}
                  />
                </ListItemIcon> */}
                <ListItemText primary={label} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </>
  );
}
export default Sidebar;
