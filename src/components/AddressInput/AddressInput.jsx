import React, { useState,useEffect } from 'react'; // Importing useState from react
import { LoadScript,Autocomplete } from '@react-google-maps/api';
import axios from 'axios'; // Importing axios
import TextField from '@mui/material/TextField';

const libraries = ["places"]; // Libraries required for the Autocomplete component


function AddressInput(){
    const [autocomplete, setAutocomplete] = useState(null); // State variable to store the Autocomplete object
    const [address, setAddress] = useState(""); // State variable to store the address

    const PORT = process.env.PORT || 8080;
    const baseUrl = `http://localhost:${PORT}`;
    
    const [apiKey,setApiKey] = useState('');
    



    useEffect(() => { 
        axios.get(`${baseUrl}/mapData`)
        .then((res) => {
            setApiKey(res.data.apiKey);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    },
    [baseUrl]);
   
    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete);
    }

    const onPlaceChanged = () => {
        if(autocomplete !== null){
            setAddress(autocomplete.getPlace().formatted_address);
            console.log(autocomplete.getPlace());
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    return (
        apiKey ? (
        <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="medium"
              variant="outlined"
              aria-label="Where would you like to run"
              placeholder="Where would you like to run "
              
              fullWidth = {true}
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Where would you like to run',
              }}
            />
            {/* <input type="text" placeholder="Enter your address" /> */}
            </Autocomplete>
        </LoadScript>) : <div>Loading 123...</div>
    );
}
export default AddressInput;