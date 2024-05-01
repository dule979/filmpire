import { Button, Typography } from '@mui/material';
import useStyles from './styles';

function Pagination({ currentPage, totalPages, setPage }) {
  const classes = useStyles();

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((nextPage) => nextPage + 1);
    }
  };

  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        onClick={handlePrev}
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        className={classes.button}
        onClick={handleNext}
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </Button>
    </div>
  );
}
export default Pagination;
