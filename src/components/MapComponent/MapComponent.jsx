import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';
import { styled } from '@mui/system';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';

const libraries = ["places", "marker"];

const MapComponent = () => {
    const MapContainer = styled('div')({
        height: '400px',
        width: '100%',
    });

    const PORT = process.env.PORT || 8080;
    const baseUrl = `http://localhost:${PORT}`;

    const [apiKey, setApiKey] = useState('');
    const [isMapLoaded, setIsMapLoaded] = useState(false);
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

                const path = decodePolyline(data.points);
                console.log('Decoded polyline path:', path);
                setPolylinePath(path);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [baseUrl,data.points]);

    useEffect(() => {
        console.log('Updated polylinePath:', polylinePath);
        if (isMapLoaded && mapRef.current) {
            const bounds = new window.google.maps.LatLngBounds();
            polylinePath.forEach((point) => {
                bounds.extend(point);
            });
            mapRef.current.fitBounds(bounds);
        }
    }, [isMapLoaded, polylinePath]);

    useEffect(() => {
        if (apiKey) {
            const loader = new Loader({
                apiKey: apiKey,
                version: "weekly",
                libraries,
            });

            loader.load().then(() => {
                setIsMapLoaded(true);
            }).catch((err) => {
                console.error('Error loading Google Maps API:', err);
            });
        }
    }, [apiKey]);

    const mapStyles = {
        height: '100%',
        width: '100%',
    };

    const defaultCenter = polylinePath.length > 0 ? polylinePath[0] : { lat: 37.8331119, lng: -122.4834356 };

    return (
        <div>
            {isMapLoaded ? (
                <MapContainer id="map">
                    <GoogleMap
                        center={defaultCenter}
                        zoom={12}
                        options={{
                            disableDefaultUI: false,
                            mapId: "59da33484abe8f95", 
                        }}
                        mapContainerStyle={mapStyles}
                        onLoad={map => (mapRef.current = map)}
                    >
                        <Polyline
                            path={polylinePath}
                            options={{
                                strokeColor: "#ff0000",
                                strokeOpacity: 1.0,
                                strokeWeight: 2,
                                geodesic: true,
                            }}
                        />
                        {polylinePath.length > 0 && (
                            <Marker position={polylinePath[0]} />
                        )}
                    </GoogleMap>
                    {polylinePath.length > 0 && (<div>Distance: {data.distance} meters</div>)}
                </MapContainer>
            ) : (
                <div>Loading map ...</div>
            )}
        </div>
    );
};

export default MapComponent;
