import { Icon } from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import React, { useCallback, useEffect } from 'react';
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { AppContext } from '../context';
import {
    getPropertiesWithinPolygonsPoints,
    getSinglePropertyDetails,
} from '../service/propertyService';
import { PopUpWrapper } from './PopUpWrapper';
/* eslint-disable react/prop-types */
export const houseIcon = new Icon({
    iconUrl: '/images/Logo.png',
    iconSize: [35, 35],
});

export const andDigitalIcon = new Icon({
    iconUrl: '/images/and.png',
    iconSize: [35, 35],
});
export const Map = () => {
    const [state, dispatch] = React.useContext(AppContext);
    const { rent, mapLayers, polygonPoints, propertiesInScope, activeProperty } = state;
    const AND_DIGITAL_COORDINATES = [55.86074, -4.25033];
    const [minRent, maxRent] = rent;
    const getPropertiesWithinPolygons = useCallback(
        async (polygonPoints) => {
            const propertiesWithinPolygons = await getPropertiesWithinPolygonsPoints(polygonPoints);
            const propertiesWithinRentRange = propertiesWithinPolygons.data.filter(
                (property) => property.details.rent >= minRent && property.details.rent <= maxRent
            );
            dispatch({ type: 'setPropertiesInScope', value: propertiesWithinRentRange });
        },
        [dispatch, maxRent, minRent]
    );

    const getPropertyDetails = async (propertyId) => {
        const property = propertiesInScope.find((prop) => prop.id === propertyId);
        if (!property.alreadyFetched) {
            await getSinglePropertyDetails(propertyId).then(({ data }) => {
                const index = propertiesInScope.findIndex((property) => property.id === data.id);
                const newProp = propertiesInScope;
                newProp[index] = { ...data, alreadyFetched: true };
                dispatch({ type: 'setPropertiesInScope', value: newProp });
                dispatch({ type: 'setActiveProperty', value: propertiesInScope[index] });
            });
        } else {
            dispatch({ type: 'setActiveProperty', value: property });
        }
    };

    useEffect(() => {
        if (polygonPoints.length) {
            getPropertiesWithinPolygons(polygonPoints);
            console.log(`State pushed rent!!! ${state.rent}`);
        }
    }, [getPropertiesWithinPolygons, polygonPoints, state.rent]);

    const createDraw = (e) => {
        dispatch({ type: 'setPropertiesInScope', value: [] });

        const { layerType, layer } = e;
        if (layerType === 'polygon') {
            const { _leaflet_id: leafletId } = layer;

            //in case of multi poligon, we want a way to know which coordinate belongs to which polygon, hence we add an id.
            dispatch({
                type: 'setMapLayers',
                value: [...mapLayers, { id: leafletId, latLngs: layer.getLatLngs()[0] }],
            });

            //we create a polygon coordinate array as they are needed for turf to check which properties are inside or not.

            dispatch({
                type: 'setPolygonPoints',
                value: [
                    ...polygonPoints,
                    {
                        id: leafletId,
                        coordinates: layer
                            .toGeoJSON()
                            .geometry.coordinates[0].map((latLng) => [latLng[1], latLng[0]]),
                    },
                ],
            });
        }
    };

    const editDraw = (e) => {
        const {
            layers: { _layers },
        } = e;
        dispatch({ type: 'setPropertiesInScope', value: [] });
        Object.values(_layers).map(({ _leaflet_id, editing }) => {
            //we reset the edited coordinate of the selected polygon
            dispatch({
                type: 'setMapLayers',
                value: mapLayers.map((l) => {
                    return l.id === _leaflet_id ? { ...l, latLngs: { ...editing.latlngs[0] } } : 1;
                }),
            });
            dispatch({
                type: 'setPolygonPoints',
                value: polygonPoints.map((l) => {
                    //first and last coordinate need to be the same. toGeoJson()does that for us, but it's not available during editing
                    const coordinates = [
                        ...editing.latlngs[0][0].map((l) => [l.lat, l.lng]),
                        [editing.latlngs[0][0][0].lat, editing.latlngs[0][0][0].lng],
                    ];

                    return l.id === _leaflet_id ? { ...l, coordinates } : { ...l };
                }),
            });
        });
    };

    const deleteDraw = (e) => {
        const {
            layers: { _layers },
        } = e;
        Object.values(_layers).map(({ _leaflet_id }) => {
            //remove the selected polygon through its id
            dispatch({
                type: 'setMapLayers',
                value: mapLayers.filter((l) => l.id !== _leaflet_id),
            });
            dispatch({
                type: 'setPolygonPoints',
                value: polygonPoints.filter((l) => l.id !== _leaflet_id),
            });
            dispatch({
                type: 'setPropertiesInScope',
                value: propertiesInScope.filter((property) => property.leafletId !== _leaflet_id),
            });
        });
    };

    return (
        <div>
            <MapContainer
                center={AND_DIGITAL_COORDINATES}
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
                            <Marker
                                key={id}
                                position={details.coordinates}
                                icon={houseIcon}
                                eventHandlers={{
                                    click: async () => {
                                        await getPropertyDetails(id);
                                    },
                                }}
                            />
                        );
                    })}
                {!!activeProperty && <PopUpWrapper details={activeProperty.details} />}

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
