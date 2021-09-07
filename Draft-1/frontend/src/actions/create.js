import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField, Typography} from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '45ch',
        },
        '& .MuiButtonBase-root':{
            margin: theme.spacing(1),
        }
    },
    header:{
        margin: theme.spacing(1),
    }
    }));

function CreateProfile(e){
    e.preventDefault()
    const name = e.target.name.value
    const age = e.target.age.value
    const description = e.target.description.value
    const data = {'name':name, 'age':age, 'description':description}
    const apiUrl = 'http://localhost:8080/create';

    fetch(apiUrl, {
        method:'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }),
        body: JSON.stringify(data)
    })
        .then(
            response => {
                if (response.ok){
                    return response
                }
                throw response
            }
        )
        .then(window.location.href='/')
        .catch(error=>{console.log(error)})
}

function Create() {
    const classes = useStyles();
    const [age, setAge] = useState('');

    return (
        <div className='CreatePage'>
            <Typography className={classes.header}>Create Profile</Typography>
            <form className={classes.root} onSubmit={CreateProfile}>
                <div>
                    <TextField
                        label="Name"
                        type="string"
                        variant="outlined"
                        size='small'
                        name="name"
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /> 
                </div>

                <div>
                    <TextField
                        label="Age"
                        type="number"
                        variant="outlined"
                        size='small'
                        name='age'
                        required
                        value = {age}
                        onChange = {e => {
                            e.target.value < 0 || e.target.value > 121 || !e.target.validity.valid
                            ? (setAge(''))
                            : setAge(e.target.value)
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
 
                <div>
                    <TextField
                        label="Description"
                        type="string"
                        variant="outlined"
                        size='small'
                        name="description"
                        multiline
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                
                <div>
                    <Button       
                        variant="contained"              
                        size='small' 
                        type='submit'
                        color='primary'> 
                        Submit 
                    </Button>

                    <Button       
                        variant="contained"              
                        size='small' 
                        color='primary'
                        onClick={()=>{window.location.href='/'}}> 
                        Cancel 
                    </Button>

                </div>
 
            </form>
        </div>
    );
}

export default Create;