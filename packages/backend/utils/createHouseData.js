import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import generateFakeAddress from './generateFakeAddress.js';

const cleanCoordinates = (coordinates) => {
    return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
};

const createHouseData = () => {
    const milesRadius = 3;

    const mileRadiusCollection = [1, 3, 5, 10, 15];
    let houseCollection = [];

    for (let i = 0; i < mileRadiusCollection.length; i++) {
        for (let j = 0; j < 20; j++) {
            const coordinates = cleanCoordinates(
                faker.address.nearbyGPSCoordinate([55.861331, -4.250493], milesRadius, false),
            );
            const rent = parseFloat(faker.finance.amount(400, 2000));
            const address = generateFakeAddress();
            const bedrooms = Math.floor(Math.random() * 4) + 1;
            const house = {
                id: uuidv4(),
                details: {
                    coordinates,
                    rent,
                    driving: null,
                    cycling: null,
                    walking: null,
                    train: null,
                    bus: null,
                    nearestTrainStation: null,
                    nearestBusStop: null,
                    bedrooms,
                    address,
                },
                alreadyFetched: false,
            };

            houseCollection.push(house);
        }
    }

    const fixedHouseCoordinates = [
        [55.774352, -4.065384],
        [55.868468, -4.40312],
        [55.845402, -4.457084],
        [55.897834, -4.229107],
    ];

    fixedHouseCoordinates.forEach((houseCoordinates) => {
        const rent = parseFloat(faker.finance.amount(400, 1500));
        const address = generateFakeAddress();
        const bedrooms = Math.floor(Math.random() * 4) + 1;
        const additionalHouse = {
            id: uuidv4(),

            details: {
                coordinates: houseCoordinates,
                driving: null,
                cycling: null,
                walking: null,
                train: null,
                bus: null,
                nearestTrainStation: null,
                nearestBusStop: null,
                rent,
                bedrooms,
                address,
            },
            alreadyFetched: false,
        };
        houseCollection.push(additionalHouse);
    });
    return houseCollection;
};

export default createHouseData;
