import React from 'react';
import { Popup } from 'react-leaflet';

/* eslint-disable react/prop-types */
export const PopupWrapper = ({ id, details }) => {
    return (
        <Popup>
            <div>
                <h2>{id}</h2>
                <p>Rent: £{details.rent} pcm</p>
                <p>Miles from work: {details.milesFromWork}</p>
                <p>Time to drive: {details.timeToDrive}</p>
                <p>Time to cycle: {details.timeToCycle}</p>
                <p>Time to walk: {details.timeToWalk}</p>
                <p>Nearest train station: {details.nearestTrainStation}</p>
                <p>Nearest bus stop: {details.nearestBusStop}</p>
                <p>Average rent: {details.averageRent}</p>
            </div>
        </Popup>
    );
};
