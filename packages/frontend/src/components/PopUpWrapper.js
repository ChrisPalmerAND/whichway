import React from 'react';
import { Popup } from 'react-leaflet';
export const PopUpWrapper = ({ details, setActiveProperty }) => {
    return (
        <Popup
            position={details.coordinates}
            eventHandlers={{
                popupclose: () => setActiveProperty(null),
            }}
        >
            <div>
                <p>Rent: {details.rent}</p>
                <p>
                    Cycling:
                    {` ${details.cycling.distance} metre / ${details.cycling.duration} seconds`}
                </p>
                <p>
                    driving:
                    {` ${details.driving.distance} metre / ${details.driving.duration} seconds`}
                </p>
                <p>
                    train:
                    {` ${details.train} seconds`}
                </p>
            </div>
        </Popup>
    );
};
