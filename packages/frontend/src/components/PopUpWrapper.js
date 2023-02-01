import React from 'react';
import { Popup } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PopUpWrapper = ({ details, setActiveProperty }) => {
    return (
        <Popup
            position={details.coordinates}
            eventHandlers={{
                popupclose: () => setActiveProperty(null),
            }}
        >
            <div>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-house" /> Rent: £{details.rent} pcm
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-car-side" /> Driving:
                    {` ${details.driving.distance} metres / ${details.driving.duration} seconds`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-bicycle" /> Cycling:
                    {` ${details.cycling.distance} metres / ${details.cycling.duration} seconds`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-person-walking" /> Walking:
                    {` ${details.driving.distance} metres / ${details.driving.duration} seconds`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-train-subway" /> Train:
                    {` ${details.bus} metres`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-train-subway" /> Nearest Train Station:
                    {` ${details.nearestTrainStation.address} metres`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-bus" /> Bus:
                    {` ${details.train} metres`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-bus" /> Nearest Bus Stop:
                    {` ${details.nearestBusStop.address} metres`}
                </p>
            </div>
        </Popup>
    );
};
