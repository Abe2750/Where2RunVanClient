import React, { useState, useEffect } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import TextField from '@mui/material/TextField';

const libraries = ["places"]; // Libraries required for the Autocomplete component

function AddressInput({ onAddressChange }) {
    const [autocomplete, setAutocomplete] = useState(null); // State variable to store the Autocomplete object
    const [address, setAddress] = useState(""); // State variable to store the address
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const PORT = process.env.PORT || 8080;
        const baseUrl = `http://localhost:${PORT}`;

        axios.get(`${baseUrl}/mapData`)
            .then((res) => {
                setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete);
    }

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            setAddress(autocomplete.getPlace().formatted_address);
            if (onAddressChange) {
                onAddressChange(autocomplete.getPlace().formatted_address);
            }
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
                        fullWidth={true}
                        inputProps={{
                            autoComplete: 'off',
                            'aria-label': 'Where would you like to run',
                        }}
                    />
                </Autocomplete>
            </LoadScript>
        ) : <div>Loading...</div>
    );
}

export default AddressInput;
