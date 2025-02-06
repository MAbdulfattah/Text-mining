
import * as React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Movies from './Movies';

export default function Clusters() {
    let { imdb_id } = useParams();
    const [movies, setMovies] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        console.log('Clusters for ', imdb_id)
        fetch('http://127.0.0.1:5000/clusters/' + imdb_id, {
          // body: JSON.stringify
        })

    }, [])
    return (
        <div>
            <div>
                <Link to='/'>
                    Back
                </Link>
            </div>
            {loading && <CircularProgress />}
            {movies && <Movies movies={movies}/>}
        </div>
    );
}