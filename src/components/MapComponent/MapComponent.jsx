import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import axios from 'axios';



  // Importing API key from .env file

const MapComponent = () => {
    const MapContainer = styled('div')({
        height: '400px',
        width: '100%',
    });
    const PORT = process.env.PORT || 8080;
    const baseUrl = `http://localhost:${PORT}`;
    
    const [apiKey,setApiKey] = useState('');
    const [isMapLoaded, setIsMapLoaded] = useState(false);



    useEffect(() => { 
        axios.get(`${baseUrl}/mapData`)
        .then((res) => {
            setApiKey(res.data.apiKey);
            setDefaultCenter(res.data.location);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    },
    []);




    const mapStyles = {
        height: '100%',
        width: '100%',
    };

    const [defaultCenter, setDefaultCenter ]= useState({ // Default center of the map Vancouver
        lat: 49.2827,
        lng: -123.1207
      });


    return (
        apiKey ? (
        <LoadScript googleMapsApiKey={apiKey}
                    onLoad={() => setIsMapLoaded(true)}
                    onError={() => console.log("Error getting map data.")}
        >
            {isMapLoaded? (<MapContainer>
                <GoogleMap
                    center={defaultCenter}
                    zoom={8}
                    options={{
                        disableDefaultUI: true,
                    }}
                    mapContainerStyle={mapStyles}
                >
                    <Marker position={defaultCenter} />
                </GoogleMap>
            </MapContainer>) : <div> Loading map ... </div>}
        </LoadScript> ) : <div> Loading map ... </div>
    );
};

export default MapComponent;
