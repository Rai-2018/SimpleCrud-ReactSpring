import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField, Typography} from '@material-ui/core';
import React, { useState, useEffect } from 'react';

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



function Update(props:any) {
    const classes = useStyles();
    const id = props.match.params.id
    const [name, setName] = useState<string>();
    const [age, setAge] = useState<string>();
    const [description, setDescription] = useState<string>("");
    const [ready, setReady] = useState(false);

    function UpdateProfile(e:any,id:string){
      e.preventDefault()
      const data = {'name':name, 'age':age, 'description':description}
      const apiUrl = 'http://localhost:8080/update/'+id;
      console.log(e, id)
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

    function GetUser(id:string){
      const apiUrl = 'http://localhost:8080/update/'+id;
      fetch(
        apiUrl
      ).then(response => {
        if(response.ok){
          return response.json()
        }
      }).then( data => {
        setName(data.name)
        setAge(data.age)
        if(data.description){
          setDescription(data.description)
        }
        setReady(true)
      }).catch( error => console.log(error))
    }

    useEffect(() => {
      GetUser(id)
    },[id]);

    return (
        <div className='UpdatePage'>
          {
            ready  ?  (
              <div>
              <Typography className={classes.header}>Update Profile</Typography>
                <form className={classes.root} onSubmit={e=>{UpdateProfile(e,id)}}>
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
                            name="age"
                            value={age}
                            required
                            onChange = {handleChangeAge}
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
                            value={description}
                            multiline
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
            ) 
            : 
            (
              null
            )
          }
            
        </div>
    );
}

export default Update;