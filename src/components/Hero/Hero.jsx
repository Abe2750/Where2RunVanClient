import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AddressInput from '../AddressInput/AddressInput';
import MapComponent from '../MapComponent/MapComponent';
import runningImage from "../../assets/Images/RunSign.jpg";
import { useNavigate } from 'react-router-dom';


export default function Hero() {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [apiKey, setApiKey] = useState('');
    const [stravaAPIKey, setStravaAPIKey] = useState('');
    const heroImage = runningImage;   
    const navigate = useNavigate();

    useEffect(() => {
        const PORT = process.env.PORT || 8080;
        const baseUrl = `http://localhost:${PORT}`;

        axios.get(`${baseUrl}/mapData`)
            .then((res) => {
                setApiKey(res.data.apiKey);
                setStravaAPIKey(res.data.stravaApiKey);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    async function getPopularSegments(lat, lng) {
        const token = stravaAPIKey;
        const response = await axios.get(`https://www.strava.com/api/v3/segments/explore`, {
            params: {
                bounds: `${lat - 0.1},${lng - 0.1},${lat + 0.1},${lng + 0.1}`,
                activity_type: 'running',
                access_token: token
            }
        });
        return response.data;
    }

    const handleClick = async () => {
        const lat = location.lat ? location.lat : 49.2827;
        const lng = location.lng ? location.lng : -123.1207;
        

        try {
            const segments = await getPopularSegments(lat, lng);
            
            console.log(segments); // Do something with the segments data
            navigate('/runroutes', { state: { segments: segments } });
        } catch (error) {
            console.error('Failed to fetch popular segments:', error);
            navigate('/runroutes', { state: { segments: [] } });
        }
        // go to "/runroutes"
        console.log(lat, lng)
    
        

    };

    async function handleAddressChange(address) {
        if (!address) {
            console.error('Invalid address:', address);
            return;
        }

        const { lat, lng } = await getLatLong(address);
        if (lat && lng) {
            setLocation({ lat, lng });
        } else {
            console.error('Failed to fetch lat long for address:', address);
        }
    }

    async function getLatLong(address) {
        if (!address) {
            console.error('Address is empty or invalid');
            return {};
        }

        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: address,
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
                }
            });

            if (response.data.results.length > 0) {
                const { lat, lng } = response.data.results[0].geometry.location;
                return { lat, lng };
            } else {
                console.error('No results found for address:', address);
                return {};
            }
        } catch (error) {
            console.error('Failed to fetch lat long for address:', address, 'Error:', error);
            return {};
        }
    }

    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: '100%',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >  
            {/* <img src={heroImage}  style={{ width: '100%', height: '400px' }} /> */}
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                        }}
                    >
                        Welcome to &nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                fontSize: 'clamp(3rem, 10vw, 4rem)',
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                            }}
                        >
                            Where2Run
                        </Typography>
                    </Typography>
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                    >
                        Tired of running the same route? Where2RunVan helps you discover new running routes in new place  while exploring the city.
                    </Typography>

                    <AddressInput onAddressChange={handleAddressChange} />
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleClick}
                        >
                            Find Routes
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
