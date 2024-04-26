import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movieContainer: {
    padding: '10px',
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '230px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginBottom: 0,
    marginTop: '10px',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  links: {
    textDecoration: 'none',
    alignItems: 'center',
    fontWeight: 'bolder',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  image: {
    height: '300px',
    borderRadius: '20px',
    marginBottom: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));
