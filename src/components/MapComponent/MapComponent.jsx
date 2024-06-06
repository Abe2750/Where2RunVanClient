import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { styled } from '@mui/system';

const MapContainer = styled('div')({
    height: '400px',
    width: '100%',
});

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Importing API key from .env file

const MapComponent = () => {
    const mapStyles = {
        height: '100%',
        width: '100%',
    };

    const defaultCenter = { // Default center of the map Vancouver
        lat: 49.2827,
        lng: -123.1207
      };

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <MapContainer>
                <GoogleMap
                    center={defaultCenter}
                    zoom={10}
                    options={{
                        disableDefaultUI: true,
                    }}
                    mapContainerStyle={mapStyles}
                >
                    <Marker position={defaultCenter} />
                </GoogleMap>
            </MapContainer>
        </LoadScript>
    );
};

export default MapComponent;
