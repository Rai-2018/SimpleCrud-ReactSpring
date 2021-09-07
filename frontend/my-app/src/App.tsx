import './App.css';
import { AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Create from './actions/create';
import Update from './actions/update';
import Read from './actions/read';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  create: {
      'margin-left':20,
      'background-color':'rgb(51, 102, 255)'
  },
});

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              Simple CRUD application
            </Typography>
            <Button variant="contained" 
                    className={classes.create} 
                    size='small' 
                    color='primary'
                    onClick={()=>window.location.href='/Create'}> 
                    Create Person
            </Button>
          </Toolbar>
        </AppBar>


        
          <Switch>
            <Route exact path="/" component={Read} /> 
            <Route exact path="/Create" component={Create} /> 
            <Route path="/Update/:id" component={Update} />
          </Switch>
      </div>
    </Router>

  );
}

export default App;
