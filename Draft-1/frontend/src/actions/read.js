import {Card, CardContent, CardActions, Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useCallback } from 'react';

const useStyles = makeStyles({
    root: {
        width: 275,
        margin:30,
        display: 'inline-block',
    },
    content: {
        textAlign: 'left',
    }
  });


function Read() {

    const GetData = useCallback(() => {
        const apiUrl = 'http://localhost:8080/all';
        fetch(
            apiUrl
        ).then(
            response => {
                if (response.ok){
                    return response.json()
                }
                throw response
            }
        ).then(data => {
            setResult([...data])
        }).catch(error => {console.error(error)})
    },[])

    function Update(id) {
        var url = '/Update/'+id
        history.push(url);
    }
    
    function Delete(id) {
        var url = 'http://localhost:8080/delete/'+id
        fetch(
            url
        ).then( response => {
            if(response.ok){
                GetData()
                return
            }
            throw response
        })
        .then(GetData())
        .catch(error=>{console.error(error)})
    }

    const [result, setResult] = useState([]);
    useEffect(()=>{
        GetData()
    },[GetData]);

    const classes = useStyles();
    const history = useHistory();

    return (
        <div className='ReadPage'>
            {   result.map((object, i) => {
                const id = object.id
                return (
                    <Card className={classes.root} id={object.id} key={object.id}>
                        <CardContent className={classes.content}> 
                            <Typography gutterBottom variant="h5" component="h2"> 
                                {object.name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary"> 
                                Age: {object.age}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Description: {object.description}
                            </Typography>
                        </CardContent>
    
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => Update(id)}>Update</Button>
                            <Button size="small" color="primary" onClick={() => Delete(id)}>Delete</Button>
                        </CardActions>
                    </Card>
                )}
            )}
        </div>

    );
  }
  
  export default Read;