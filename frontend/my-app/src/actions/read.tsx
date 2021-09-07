import {Card, CardContent, CardActions, Button, Typography, TextField, Grid } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useCallback } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 275,
        margin:30,
        display: 'inline-block',
    },
    content: {
        textAlign: 'left',
    },
    filter:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        width: '80%'
    },
    mainView:{
        flexGrow: 1,
    },
    errMsg: {
        width:'30%',
        textAlign:'left',
        margin:'auto'
    }, 
    button:{
        textColor:'white'
    }
  }))


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
        ).then((data:any[]) => {
            setResult([...data])
        }).catch(error => {console.error(error)})
    },[])

    const GetDataByName = useCallback((filter:string, page:number) => {
        const apiUrl = 'http://localhost:8080/findNames?name='+ filter + '&page=' + page;
        fetch(
            apiUrl
        ).then(
            response => {
                if (response.ok){
                    return response.json()
                }
                throw response
            }
        ).then((data:any) => {
            setTotalPage(data.totalPages)
            setCurrPage(data.currentPage)
            setTotalItems(data.totalItems)
            setResult([...data.names])
        }).catch(error => {console.error(error)})
    },[])

    function Update(id:string) {
        var url = '/Update/'+id
        history.push(url);
    }
    
    function Delete(id:string) {
        var url = 'http://localhost:8080/delete/'+id
        fetch(
            url
        ).then( response => {
            if(response.ok){
                if(!filter){
                    GetData();
                    setCurrPage(0)
                    setTotalItems(0)
                    setTotalPage(0)
                } else {
                    if(result.length === 1 && currPage > 0){
                        setCurrPage(currPage-1)
                    } else {
                        setTotalItems(totalItems-1)
                    }
                    
                }
                return
            }
            throw response
        })
        .catch(error=>{console.error(error)})
    }

    function handleChangeFilter(e:any){
        var inputFilter = e.target.value
        setFilter(inputFilter);
    }

    function handleNextPage(){
        setCurrPage(currPage + 1)
    }

    function handleLastPage(){
        setCurrPage(currPage - 1)
    }

    const [result, setResult] = useState<any>([]);
    const [filter, setFilter] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);


    useEffect(() => {
        if(!filter){
            GetData();
            setCurrPage(0)
            setTotalItems(0)
            setTotalPage(0)
        } else {
            GetDataByName(filter,currPage);
        }
    }, [filter, GetData, GetDataByName, currPage, totalItems])

    const classes = useStyles();
    const history = useHistory();

    return (
        <div className='ReadPage'>
            <div>
                <TextField  id="outlined-basic" 
                            label="Filter By Name" 
                            variant="outlined"
                            value = {filter}
                            onChange={handleChangeFilter}
                            className={classes.filter}
                />
            </div>

            {filter && totalItems === 0 ? (
                    <Alert severity="warning" className={classes.errMsg}>
                      <AlertTitle>Warning</AlertTitle>
                      No matching profile with this name — <strong>Enter another name!</strong>
                    </Alert>
                ) : (null) }

            <Grid container className={classes.mainView} alignItems="center" justifyContent="center" >
                
                <Grid>
                {currPage > 0 ? (      
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<NavigateBeforeIcon>Back</NavigateBeforeIcon>}
                        onClick={handleLastPage}
                        className={classes.button}
                    >
                        Back
                    </Button>
                    ) : (null)}
                </Grid>

                <Grid >
                    {result.map((object:any, i:number) => {
                        const id = object.id
                        return (
                            <Card className={classes.root} id={object.id} key={object.id}>
                                <CardContent className={classes.content}> 
                                    <Typography gutterBottom variant="h5" component="h2"> 
                                        {object.name}
                                    </Typography>
                                    <Typography variant="subtitle1" component="p">
                                        ID: {object.id}
                                    </Typography>
                                    <Typography color="textSecondary"> 
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
                </Grid>
                
                <Grid>
                    {currPage < totalPage-1 ? (
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<NavigateNextIcon>Next</NavigateNextIcon>}
                            onClick={handleNextPage}
                            className={classes.button}
                        >
                        Next
                        </Button>
                        ) : (null)}
                </Grid>
            </Grid >
        </div>

    );
  }
  
  export default Read;