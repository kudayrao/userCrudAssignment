import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

function UserList() {
  const tmp = [];
  const classes = useStyles();
  const [userList, setUserList] = useState([]);
  const [isEdited, setEditedState] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getData = async (_id, flag) => {
      const arr = [],
            created = false;

      const stateObj = {
        state: {
            created: false
        }
      };  
      const url = 'https://reqres.in/api/users?page=1';

      const response = await fetch(url);
      const data = await response.json();
      if(data !== undefined) {
        data.data.map((value, index) => {
            tmp.push({
              "id": value.id,
              "first_name": value.first_name,
              "last_name": value.last_name,
              "email": value.email
            })    
        })
        setUserList(tmp);
      }
      
      if(flag) {
        let rec = tmp.filter((user) => {
            return user.id !== _id;
        })
        setUserList(rec);
        flag = false;
      } 

      if(window.history.state !== null && (window.history.state.state.created || window.history.state.state.updated) && tmp.length > 0) {
        let updatedData = window.history.state.state.data;
        let isEdited = window.history.state.state.updated;
        let arr3 = [];
        arr.push({
            "id": updatedData.id,
            "first_name": updatedData.first_name,
            "last_name": updatedData.last_name,
            "email": updatedData.email
        })
        if(isEdited) {
          tmp[tmp.length-1] = arr[0];  
          arr3 = [...tmp]; 
        } else {
          arr3 = [...tmp, ...arr]; 
        }
        
        setUserList(arr3);
        window.history.pushState(stateObj, '', '/');
      }
  };

  useEffect(() => {
    getData();
  }, []);
  

  const editRecord = (id) => {
    window.location = '/update/'+id;
    setEditedState(true);
  }

  const deleteRecord = (id) => {
    let url = 'https://reqres.in/api/users';
    let updated_id = id > 6 ? undefined : id;

    fetch(url + '/' + updated_id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      }
    })
    .then(res => res)
    .then((result) => {
        if (result['ok'] === true) {
          getData(id, true);
        }
      }
    )
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="App">
            <div className={classes.root}>
                <Container className={classes.container} maxWidth="lg">    
                <Paper className={classes.paper}>
                  <Box display="flex">
                    <Box flexGrow={1}>
                      <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        USERS
                      </Typography>
                    </Box>
                    <Box>
                      <Link to="/create">
                        <Button variant="contained" color="primary">
                          CREATE
                        </Button>
                      </Link>
                    </Box>   
                  </Box>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0 ? userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : userList
                    ).map((user) => (
                    //{userList.length> 0 && (userList.map((user) => (
                        <TableRow>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell align="center">
                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <Button onClick={() => editRecord(user.id)} style={{backgroundColor: '#12824C', color: '#FFFFFF'}}>Edit</Button>
                                    <Button onClick={() => deleteRecord(user.id)} style={{backgroundColor: '#821230', color: '#FFFFFF'}}>Delete</Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                                          
                  </TableBody>
                  <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                          colSpan={3}
                          count={userList.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Paper>
          </Container>
        </div>
    </div>
  );
}

export default UserList;
