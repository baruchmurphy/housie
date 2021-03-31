import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

interface GroceryItemProps {
    item: {
        text: string, 
        complete: boolean
    }
}

const GroceryItem = ({item}: GroceryItemProps) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(item.complete);

    return (
        <> 
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />}
              label={item.text}
            />
            </FormGroup>
            </FormControl>
            {/* {item.text +  item.complete} */}
        </>
    )
}

export default GroceryItem;