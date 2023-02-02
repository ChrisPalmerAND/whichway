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
                    <b>
                        <FontAwesomeIcon icon="fa-solid fa-house" /> {details.address.streetName},{' '}
                        {details.address.city}, {details.address.postCode}
                    </b>
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-bed" /> Number of bedrooms:{' '}
                    {details.bedrooms}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-pound-sign" /> Rent: £{details.rent} pcm
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-car-side" /> Driving:
                    {` ${details.driving.distance} miles / ${details.driving.duration} (hours and minutes)`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-bicycle" /> Cycling:
                    {` ${details.cycling.distance} miles / ${details.cycling.duration} (hours and minutes)`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-person-walking" /> Walking:
                    {` ${details.walking.distance} miles / ${details.walking.duration} (hours and minutes)`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-train-subway" /> Train:
                    {` ${details.train} (hours and minutes)`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-train-subway" /> Nearest Train Station:
                    {` ${details.nearestTrainStation.address}, ${details.nearestTrainStation.postcode} `}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-bus" /> Bus:
                    {` ${details.bus} (hours and minutes)`}
                </p>
                <p>
                    <FontAwesomeIcon icon="fa-solid fa-bus" /> Nearest Bus Stop:
                    {` ${details.nearestBusStop.address}, ${details.nearestBusStop.postcode}`}
                </p>
            </div>
        </Popup>
    );
};
