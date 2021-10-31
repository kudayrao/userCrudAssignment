import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const RedButton = () => {
  return(
    <ButtonGroup color="primary" aria-label="outlined primary button group">
    <Button 
    style={{backgroundColor: '#821230', color: '#FFFFFF'}}
    >Delete</Button>
    </ButtonGroup>
  )
}

export default RedButton;