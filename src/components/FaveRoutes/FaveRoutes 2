import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

// Sample data
const routesList = [
  {
    "id": 21774536,
    "resource_state": 2,
    "name": "Grouse Grinnd Proper",
    "climb_category": 4,
    "climb_category_desc": "1",
    "avg_grade": 26,
    "start_latlng": [
      49.371232,
      -123.098321
    ],
    "end_latlng": [
      49.378868,
      -123.083382
    ],
    "elev_difference": 792.8,
    "distance": 3046.9,
    "points": "eyilHpsinVFg@?MGCYg@Kg@AKJq@c@sAAK@OJW@IN_@@IFKDSZSV_@Fi@Ha@NWFCBMPSGKEDCAC@EGE?Uc@GYKQKAAHA?OW?ISs@C[@OE_@FOECOMOMGYAM]IAGOSQISGLCIGEi@[w@@E_@k@Ki@BSC?GKEAEa@BOEK@S[uAWj@BGBBEE@IC@UMK?GIGWOUC?Ia@KEABCGGCSNEGKA]WEAFV?ZC?CCILIGAKCa@EWa@YMFQ`@ANKJERCDIF@@[GGBEEIHAG@@AA?@EKGGGa@IHGAI?IUIEIIGDIVEBAq@Qm@KO?EGEMt@EHCAAEAWFe@EAIQKIWm@MmAQGGBMAAC@@@UBCG?C@WKAGBUCGIBGEGKABCQEFIKIYAMA@EAIK?IBEIOBSE?@SQMCOICIUQSGg@C@CGKECGCa@CEC??SJk@FMJi@DGDYCWI?EBALDQs@FAC@FGAA@EW@[AQEG@EGDCGEBSEOBAED[?GEG?UIE?GBKAKDE@OEa@BOCU?BECB?AADE@MF]EBEKCm@OH@]FAHSK?WJE?@AGSD?GK?[@ENGLWU_@DOFMKXGAAMIDOKMN_@XUa@EYMYe@@OD_@U",
    "starred": true,
    "elevation_profile": "https://d3o5xota0a1fcr.cloudfront.net"
  },
  {
    "id": 2453857,
    "resource_state": 2,
    "name": "Stanley Park Seawall - BMO",
    "climb_category": 0,
    "climb_category_desc": "NC",
    "avg_grade": 0.1,
    "start_latlng": [
      49.296059,
      -123.1529314
    ],
    "end_latlng": [
      49.2969473,
      -123.1338719
    ],
    "elev_difference": 51.5,
    "distance": 7625.9,
    "points": "ic{kHzhtnVi@RgAz@wAx@]V_@^]b@Yj@Mj@E`@PhB\\lBJt@FbAAv@Iv@Yt@cAvA}@x@aBLiAXc@Dc@Hi@C[E[N[H]Kc@Fe@NYR{@v@a@FSMuAgFIw@Sq@U_@a@[k@QuBe@c@Gy@EeDGqAUwAAm@GwALe@O{Bi@m@IqAMs@?e@Da@Xe@Je@De@@]UGs@Lc@Bo@?k@Qy@Y[e@e@cAk@_@e@aAuBe@qBSk@SU_@Mg@AwA@e@IY[kB}CWq@m@kBeAkCQo@G{@Ay@w@_GYsAWuBIsCMs@Um@Kq@_@iDO}@Gu@EoBGi@c@uBGu@K{CBu@X[`@G`@QV_@Rk@Fi@PaARq@Xg@^_@^YhAc@rAs@d@_@dDcE~B_CbAoAd@]b@QdAWXO~AgAb@U|@[bBWb@Aj@JT?Rc@RkAZmA|@eChBuEd@s@fBiB^Yh@Ul@]jFuD\\]Zi@Pc@j@kCRgBTyCHqBCaBGu@A{@@u@Vs@`@g@vA_Bv@cAxA_CVi@r@wBNq@bCsI\\iBZeDLwC@uAGaAKo@oAoBaAu@]]Ua@Ma@Mo@CYPU`@]j@Wd@?`@@xBl@d@Bh@J\\LxAz@f@\\V^Lf@@x@Et@AzB@t@HxA@l@Gj@m@pASl@Kn@@p@DXh@xArArBZr@Bt@Ir@Ml@[xDCt@?xAb@fCNf@Nd@z@`BZ`@Z\\|@n@b@Rt@j@b@n@Hr@El@Mp@i@dA_@b@o@j@}@h@qAdAY`@Ol@Ex@Dx@Lf@tAhD`@l@\\r@@r@Y`BGn@?nB",
    "starred": true,
    "elevation_profile": "https://d3o5xota0a1fcr.cloudfront.net"
  },
  {
    "id": 7410017,
    "resource_state": 2,
    "name": "Burrard Bridge",
    "climb_category": 0,
    "climb_category_desc": "NC",
    "avg_grade": 1.1,
    "start_latlng": [
      49.273277,
      -123.143638
    ],
    "end_latlng": [
      49.276629,
      -123.133419
    ],
    "elev_difference": 17.2,
    "distance": 832.6,
    "points": "}tvkHvnrnV}@uDcDoO{DgQOa@E][oA_@sAU_AIo@g@wB{@kD[eAMo@",
    "starred": true,
    "elevation_profile": "https://d3o5xota0a1fcr.cloudfront.net"
  },
  {
    "id": 1480643,
    "resource_state": 2,
    "name": "Trout Lake 1.3km Loop",
    "climb_category": 0,
    "climb_category_desc": "NC",
    "avg_grade": 0,
    "start_latlng": [
        49.256667941184254,
        -123.06404637172946
    ],
    "end_latlng": [
        49.25667623180824,
        -123.06406350782703
    ],
    "elev_difference": 5,
    "distance": 1267.1,
    "points": "cmskHh}bnVxAZj@Bd@Of@]PUx@gBLMREv@d@R?TCRIXq@Js@J[r@eBN_AJ]Jq@NuAAa@S_AKMUCo@[QGSC}A?SC}@AsARo@ASDWHi@ZaA?UBi@Pq@v@MPSl@[n@cAjCIfA?r@GfAN|@PPT@RCZB`@^TLnAf@VF",
    "starred": false,
    "elevation_profile": "https://d3o5xota0a1fcr.cloudfront.net/v6/charts/PM4L33ASUUYNES5KIXXIA3DYZTUHX4RXALAZTS4QW46ZBWGW7BIWG552XNJJCAH3X5KNFGO4NQ46WCSCNMEJSFPZ",
    "local_legend_enabled": true
},
{
  "id": 10404092,
  "resource_state": 2,
  "name": "Mahon Park Lap",
  "climb_category": 0,
  "climb_category_desc": "NC",
  "avg_grade": -0.1,
  "start_latlng": [
      49.323847,
      -123.083193
  ],
  "end_latlng": [
      49.323813,
      -123.083295
  ],
  "elev_difference": 4.2,
  "distance": 441.7,
  "points": "_q`lH~tfnVQDLBJCF@b@YNYHEFMBq@Co@a@aAUOc@GQIOAi@A[FYRKN]dACl@@VF`@\\r@\\NXDXEd@@LCL@",
  "starred": true,
  "elevation_profile": "https://d3o5xota0a1fcr.cloudfront.net/v6/charts/YTD23JRNBCT476ERDWA3K5O2IQAOSJLZKGM2RXR6DRKWYTQXNYUKBDTQYZRC3TSOFATA44KE5UY5B46NF2VLWEA=",
  "local_legend_enabled": true
}

  // Add 3  more routes here all stared
   
];

// Decode the polyline
function decodePolyline(encoded) {
  const points = [];
  let index = 0, len = encoded.length;
  let lat = 0, lng = 0;

  while (index < len) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return points;
}

export default function FaveRoutes() {
  const [starredRoutes, setStarredRoutes] = useState(() =>
    routesList.map(route => route.starred)
  );

  const toggleStar = index => {
    const updatedStarredRoutes = [...starredRoutes];
    updatedStarredRoutes[index] = !updatedStarredRoutes[index];
    setStarredRoutes(updatedStarredRoutes);
  };

  return (
    <Container
      id="routes"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      {/* Routes section title and description */}
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Routes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore our featured routes. Discover the elevation, distance, and path of each route. Join us for an adventure!
        </Typography>
      </Box>

      {/* Route cards */}
      <Grid container spacing={2}>
        {routesList && routesList.length > 0 ? (
          routesList.map((route, index) => (
            starredRoutes[index] && (
            <Grid key={index} item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  p: 1,
                }}
              >
                <CardContent>
                  {/* Route content */}
                  <Typography variant="h6" color="text.primary">
                    { `${route.name}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Climb Category: ${route.climb_category_desc}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Average Grade: ${route.avg_grade}%`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Elevation Difference: ${route.elev_difference}m`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Distance: ${route.distance}m`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Starred: ${starredRoutes[index] ? "Yes" : "No"}`}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color={starredRoutes[index] ? "primary" : "secondary"}
                    onClick={() => toggleStar(index)}
                    sx={{ mt: 2 }}
                  >
                    {starredRoutes[index] ? "Unstar" : "Star"}
                  </Button>
                </CardContent>
                {/* Route map */}
                <Box sx={{ height: '200px', width: '100%' }}>
                  <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                      mapContainerStyle={{ height: '100%', width: '100%' }}
                      center={{
                        lat: route.start_latlng[0],
                        lng: route.start_latlng[1],
                      }}
                      zoom={15}
                    >
                      <Polyline
                        path={decodePolyline(route.points)}
                        options={{
                          strokeColor: "#ff0000",
                          strokeOpacity: 1.0,
                          strokeWeight: 2,
                          geodesic: true,
                        }}
                      />
                    </GoogleMap>
                  </LoadScript>
                </Box>
              </Card>
            </Grid>)
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No routes available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}


