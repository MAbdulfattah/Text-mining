import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Movies({ movies, getClusters }) {
  const [selectedMovie, setSelectedMovie] = React.useState([])
  const navigate = useNavigate();
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {movies.map((movie) => (
        <ListItem
          key={movie[1]}
          style={{
            background: movie[0] === selectedMovie[0] && "#FFB6C1"
          }}
          disablePadding
        >
          <ListItemText
            primary={
            <Typography variant="h5" component="h4">{movie[1]}</Typography>
            }
            secondary={
              <React.Fragment>
                {getClusters && <Button size='small' variant='outlined' onClick={() => {
                  setSelectedMovie(movie)
                  getClusters(movie)
                }}>Similar Movies</Button>}
                <Button color='info'>
                  <Link href={`https://www.imdb.com/title/${movie[0]}/`} target="_blank">IMDB</Link>
                </Button>
                {/* {" — I'll be in your neighborhood doing errands this…"} */}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}