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
                    {` ${details.driving.distance} miles / ${details.driving.duration} (HH:MM:SS)`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-bicycle" /> Cycling:
                    {` ${details.cycling.distance} miles / ${details.cycling.duration} (HH:MM:SS)`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-person-walking" /> Walking:
                    {` ${details.walking.distance} miles / ${details.walking.duration} (HH:MM:SS)`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-train-subway" /> Train:
                    {` ${details.train} (HH:MM:SS)`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-train-subway" /> Nearest Train Station:
                    {` ${details.nearestTrainStation.address}`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-bus" /> Bus:
                    {` ${details.bus} (HH:MM:SS)`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-bus" /> Nearest Bus Stop:
                    {` ${details.nearestBusStop.address}`}
                </p>
            </div>
        </Popup>
    );
};
