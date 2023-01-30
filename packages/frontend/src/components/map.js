import axios from 'axios';
import { Icon } from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

export const houseIcon = new Icon({
    iconUrl: '/images/Logo.png',
    iconSize: [35, 35],
});

export const andDigitalIcon = new Icon({
    iconUrl: '/images/and.png',
    iconSize: [35, 35],
});
const Map = () => {
    // eslint-disable-next-line no-unused-vars
    const [mapLayers, setMapLayers] = useState([]);
    const [polygonPoints, setPolygonPoints] = useState([]);
    const [propertiesInScope, setPropertiesInScope] = useState([]);
    const AND_DIGITAL_COORDINATES = [55.86074, -4.25033];

    const getPropertiesWithinPolygons = async (polygonPoints) => {
        const propertiesWithinPolygons = await axios.post('http://localhost:8080/api/v1/property', {
            polygons: polygonPoints,
        });
        setPropertiesInScope(propertiesWithinPolygons.data);
    };

    useEffect(() => {
        if (polygonPoints.length) {
            getPropertiesWithinPolygons(polygonPoints);
        }

        //don't add propertiesLatLong will cause infinite loop
    }, [polygonPoints]);

    const createDraw = (e) => {
        setPropertiesInScope([]);
        const { layerType, layer } = e;
        if (layerType === 'polygon') {
            const { _leaflet_id: leafletId } = layer;
            //in case of multi poligon, we want a way to know which coordinate belongs to which polygon, hence we add an id.
            setMapLayers((layers) => [
                ...layers,
                { id: leafletId, latLngs: layer.getLatLngs()[0] },
            ]);

            //we create a polygon coordinate array as they are needed for turf to check which properties are inside or not.
            setPolygonPoints((layers) => {
                return [
                    ...layers,
                    {
                        id: leafletId,
                        coordinates: layer
                            .toGeoJSON()
                            .geometry.coordinates[0].map((latLng) => [latLng[1], latLng[0]]),
                    },
                ];
            });
        }
    };

    const editDraw = (e) => {
        const {
            layers: { _layers },
        } = e;
        setPropertiesInScope([]);
        Object.values(_layers).map(({ _leaflet_id, editing }) => {
            //we reset the edited coordinate of the selected polygon
            setMapLayers((layers) =>
                layers.map((l) => {
                    return l.id === _leaflet_id ? { ...l, latLngs: { ...editing.latlngs[0] } } : 1;
                })
            );

            setPolygonPoints((layers) =>
                layers.map((l) => {
                    //first and last coordinate need to be the same. toGeoJson()does that for us, but it's not available during editing
                    const coordinates = [
                        ...editing.latlngs[0][0].map((l) => [l.lat, l.lng]),
                        [editing.latlngs[0][0][0].lat, editing.latlngs[0][0][0].lng],
                    ];

                    return l.id === _leaflet_id ? { ...l, coordinates } : { ...l };
                })
            );
        });
    };

    const deleteDraw = (e) => {
        const {
            layers: { _layers },
        } = e;
        Object.values(_layers).map(({ _leaflet_id }) => {
            //remove the selected polygon through its id
            setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
            setPropertiesInScope((properties) =>
                properties.filter((property) => property.leafletId !== _leaflet_id)
            );
            setPolygonPoints((layers) => layers.filter((l) => l.id !== _leaflet_id));
        });
    };

    return (
        <div
            style={{
                width: '100vw',
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                border: 'black',
            }}
        >
            <MapContainer
                center={[55.860916, -4.251433]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ width: '100%', height: '100vh' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker key={'And_marker'} icon={andDigitalIcon} position={AND_DIGITAL_COORDINATES}>
                    <Popup>
                        <div>
                            <h2>Best place </h2>
                        </div>
                    </Popup>
                </Marker>
                {propertiesInScope.length &&
                    propertiesInScope.map(({ id, details }) => {
                        return (
                            <Marker key={id} position={details.coordinates} icon={houseIcon}>
                                <Popup>
                                    <div>
                                        <h2>{id}</h2>
                                        <p>Rent: {details.rent}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}

                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onEdited={editDraw}
                        onCreated={createDraw}
                        onDeleted={deleteDraw}
                        draw={{
                            polygon: true,
                            rectangle: false,
                            polyline: false,
                            circle: false,
                            circlemarker: false,
                            marker: false,
                        }}
                    />
                </FeatureGroup>
            </MapContainer>
        </div>
    );
};

export default Map;
