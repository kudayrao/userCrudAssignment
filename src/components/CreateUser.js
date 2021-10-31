import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function CreateUser() {
    const classes = useStyles();

    const { push } = useHistory();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');

    async function postData() {
        let post__data = {
            "first_name": fname,
            "last_name": lname,
            "email": email
        }
        let config = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post__data)
        }
        
        const response = await fetch('https://reqres.in/api/users', config);
        const res = await response.json();
        if(response.ok === true) {
            push({
            pathname: '/',
            state: {
                data: res,
                created: true
            }
        })
        }
        
    }

    const createRecord = () => {
        postData();
    }
    return (
        <Container maxWidth="xs">
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              User
            </Typography>
        <form className={classes.form}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    onChange={(e) => setFname(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
            </Grid>
            <Button fullWidth onClick={() => createRecord()} variant="contained" color="primary" className={classes.submit}>
                CREATE
            </Button>
        </form>
        </div>
    </Container>
  );
}

export default CreateUser;