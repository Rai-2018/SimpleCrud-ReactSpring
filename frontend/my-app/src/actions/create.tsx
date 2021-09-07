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



function Create() {
    const classes = useStyles();
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function CreateProfile(e:any){
        e.preventDefault()
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
                (response:Response) => {
                    if (response.ok){
                        return response
                    }
                    throw response.statusText
                }
            )
            .then(()=>{window.location.href='/'})
            .catch(error=>{console.log(error)})
    }

    function handleChangeName(e:any){
        var inputName = e.target.value;
        setName(inputName)
    }

    function handleChangeAge(e:any){
        var age = e.target.value;
        if(age < 0 || age > 150){
            setAge('')
        } else {
            setAge(age)
        }
    }

    function handleChangeDesecription(e:any){
        var description = e.target.value;
        setDescription(description)
    }

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
                        value={name}
                        required
                        onChange={handleChangeName}
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
                        onChange={handleChangeAge}
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
                        value={description}
                        onChange={handleChangeDesecription}
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