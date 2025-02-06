import './style.css'
import { useState } from 'react';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import Emotions from './Emotions';
import Movies from './Movies';

function Home() {
  const [movies, setMovies] = useState(null)
  const [clusters, setClusters] = useState(null)
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div className='container selections'>
        <Emotions loading={loading} onSubmit={async (emotions) => {
          // make a backend request to retrieve the data
          // go the recommended movies list
          setLoading(true)
          setClusters(null)
          // const result = await (await fetch(`http://127.0.0.1:5000/movies?emotions_list=${JSON.stringify(emotions)}&limit=${limit}`)).json()
          // setMovies(result)
          try {
            const response =  await fetch(`http://127.0.0.1:5000/movies?emotions_list=${JSON.stringify(emotions)}&limit=${limit}`)
            if (response.ok) {
              const result = await response.json()
              setMovies(result)
            }
          }
          catch (err) {
              console.log('caught a fetch error (emotions):', err)
          }
          
          setTimeout(setLoading, 1000)
        }} />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Limit</InputLabel>
          <Select
            value={limit}
            label="Movies limit"
            onChange={(e) => setLimit(e.target.value)}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            <MenuItem value={50}>Fifty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="container">
        {movies && (
        <div>
          <Typography variant='h4'>Recommended Movies</Typography>
          <Movies movies={movies} getClusters={async (movie) => {
                    setLoading(true)
                    // const result = await (await fetch(`http://127.0.0.1:5000/clusters?imdb_id=${movie[0]}&limit=${limit}`)).json()
                    // setClusters(result)

                    try {
                      const response = await fetch(`http://127.0.0.1:5000/clusters?imdb_id=${movie[0]}&limit=${limit}`)
                      if (response.ok) {
                        const result = await response.json()
                        setClusters(result)
                      }
                    }
                    catch (err) {
                      console.log('caught a fetch error (clusters):', err)
                    }
                    setTimeout(setLoading, 1000)
                  }}
          />
        </div>
        )}
        {clusters &&
          <div>
            <Typography variant='h4'>Similar Movies</Typography>
            {!loading ? <Movies movies={clusters} /> : <CircularProgress />}
          </div>}
      </div>
    </>
  );
}

/*
  [
    {title: "Forrest Gump", imdb_id: "tt0109830"}, 
    {title: "The Batman", imdb_id: "tt1877830"}
  ],
  ...
*/

export default Home;
