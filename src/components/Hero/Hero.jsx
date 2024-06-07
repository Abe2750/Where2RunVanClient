import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import AddressInput from '../AddressInput/AddressInput';



export default function Hero() {
    

    async function getPopularSegments(lat, lng) {
        const token = '3a5a494dfe741282650ca5562d4e7db8489133c7';
        const response = await axios.get(`https://www.strava.com/api/v3/segments/explore`, {
            params: {
                bounds: `${lat-0.1},${lng-0.1},${lat+0.1},${lng+0.1}`,
                activity_type: 'running',
                access_token: token
            }
        });
        return response.data;
    }
    const handleClick = async () => {
        const lat = 40.7128; // Placeholder latitude
        const lng = -74.0060; // Placeholder longitude
        try {
            const segments = await getPopularSegments(lat, lng);
            console.log(segments); // Do something with the segments data
        } catch (error) {
            console.error('Failed to fetch popular segments:', error);
        }
    };



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
              Where2RunVan
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
           Tired of running the same route? Where2RunVan helps you discover new running routes in Vancouver while exlporing the city.
          </Typography>
          
            <AddressInput/>
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