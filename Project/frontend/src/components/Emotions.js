import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';


const emotions = {
    joy: false, //{ selected: false, order: 0, },
    anger: false, //{ selected: false, order: 0, },
    fear: false, //{ selected: false, order: 0, },
    sadness:false, // { selected: false, order: 0, },
    love: false, //{ selected: false, order: 0, },
    surprise: false, //{ selected: false, order: 0, }
}

export default function EmotionsGroup({ onSubmit, loading }) {
  const [state, setState] = React.useState(emotions);
  const [order, setOrder] = React.useState([]);
  /*
  Counter({'joy': 0.49907673260895535, 'anger': 0.18385250273526513, 'fear': 0.1576198216893577, 'sadness': 0.12327680666099436, 'love': 0.030240426561379406, 'surprise': 0.00593369871525543})

  Counter({'anger': 0.48385250273526513, 'fear': 0.1576198216893577, 'sadness': 0.12327680666099436, 'love': 0.030240426561379406, joy: 0.006, 'surprise': 0.00593369871525543})
  */

  const handleChange = (event) => {
      let nextOrder = order
      if (event.target.checked) {
          nextOrder.push(event.target.name)
      } else {
          nextOrder = order.filter(item => item !== event.target.name)
      }
      setOrder(nextOrder)
      setState({
          ...state,
          [event.target.name]: event.target.checked
      });
  };

const limit = order.length > 2; // cannot select more than 3 emotions.

// Emotions: 'joy', 'anger', 'fear', 'sadness', 'love', 'surprise'
  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Choose an emotion to be associated with a movie</FormLabel>
        <FormGroup>
            {Object.keys(state).map(emotion => {
                return (
                    <FormControlLabel
                        key={emotion}
                        disabled={limit && !state[emotion]}
                        control={
                            <Checkbox checked={state[emotion]} onChange={handleChange} name={emotion} />
                        }
                        label={`${order.includes(emotion) ? `[${order.indexOf(emotion) + 1}]` : ''} ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}`}
                    />
                )
            })}
        </FormGroup>
        <FormHelperText color='red'>{limit && "You've reached the maximum!"}</FormHelperText>
        <Button disabled={loading} variant="contained" onClick={() => onSubmit(order)}>Recommend Movies</Button>
      </FormControl>
    </Box>
  );
}