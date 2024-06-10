import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Polyline } from '@react-google-maps/api';
import { styled } from '@mui/system';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';

const libraries = ["places"]; // Libraries required for the Autocomplete component

const MapComponent = () => {
    const MapContainer = styled('div')({
        height: '400px',
        width: '100%',
    });

    const PORT = process.env.PORT || 8080;
    const baseUrl = `http://localhost:${PORT}`;

    const [apiKey, setApiKey] = useState('');
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [stravaAPIKey, setStravaAPIKey] = useState('');
    const [polylinePath, setPolylinePath] = useState([]);
    const mapRef = useRef(null);

    const data = {
        "id": 229781,
        "resource_state": 2,
        "name": "Hawk Hill",
        "climb_category": 1,
        "climb_category_desc": "4",
        "avg_grade": 5.7,
        "start_latlng": [37.8331119, -122.4834356],
        "end_latlng": [37.8280722, -122.4981393],
        "elev_difference": 152.8,
        "distance": 2684.8,
        "points": "}g|eFnpqjVl@En@Md@HbAd@d@^h@Xx@VbARjBDh@OPQf@w@d@k@XKXDFPH\\EbGT`AV`@v@|@NTNb@?XOb@cAxAWLuE@eAFMBoAv@eBt@q@b@}@tAeAt@i@dAC`AFZj@dB?~@[h@MbAVn@b@b@\\d@Eh@Qb@_@d@eB|@c@h@WfBK|AMpA?VF\\\\t@f@t@h@j@|@b@hCb@b@XTd@Bl@GtA?jAL`ALp@Tr@RXd@Rx@Pn@^Zh@Tx@Zf@`@FTCzDy@f@Yx@m@n@Op@VJr@",
        "starred": false
    };

    const decodePolyline = (encoded) => {
        let points = encoded;
        let latlngs = [];
        let index = 0;
        let lat = 0;
        let lng = 0;

        while (index < points.length) {
            let b;
            let shift = 0;
            let result = 0;
            do {
                b = points.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = points.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            latlngs.push({ lat: lat / 1e5, lng: lng / 1e5 });
        }
        return latlngs;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/mapData`);
                setApiKey(res.data.apiKey);
                setStravaAPIKey(res.data.stravaApiKey);
                setPolylinePath(decodePolyline(data.points));
                console.log(res.data);

                const loader = new Loader({
                    apiKey: res.data.apiKey,
                    version: "weekly",
                    libraries,
                });

                loader.load().then(() => {
                    setIsMapLoaded(true);
                }).catch((err) => {
                    console.error('Error loading Google Maps API:', err);
                });
            } catch (err) {
                console.log(err);
                // Handle error fetching map data
            }
        };
        fetchData();
    }, [baseUrl]);

    const mapStyles = {
        height: '100%',
        width: '100%',
    };

    const [defaultCenter, setDefaultCenter] = useState({
        lat: 49.2827,
        lng: -123.1207
    });

    useEffect(() => {
        if (isMapLoaded && mapRef.current) {
            const { AdvancedMarkerElement } =  require('@react-google-maps/api');

            new AdvancedMarkerElement({
                position: defaultCenter,
                map: mapRef.current,
            });
        }
    }, [isMapLoaded, defaultCenter]);

    return (
        <div>
            {isMapLoaded ? (
                <MapContainer id="map">
                    <GoogleMap
                        center={defaultCenter}
                        zoom={8}
                        options={{
                            disableDefaultUI: false,
                        }}
                        mapContainerStyle={mapStyles}
                        onLoad={map => (mapRef.current = map)}
                    >
                        <Polyline
                            path={polylinePath}
                            options={{
                                strokeColor: "#ff2527",
                                strokeOpacity: 0.75,
                                strokeWeight: 2,
                            }}
                        />
                    </GoogleMap>
                </MapContainer>
            ) : (
                <div>Loading map ...</div>
            )}
        </div>
    );
};

export default MapComponent;
