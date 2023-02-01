import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const createHouseData = () => {
    const milesRadius = 3;

    let rent;
    let coordinates;

    const cleanCoordinates = (coordinates) => {
        return [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
    };

    const mileRadiusCollection = [1, 3, 5, 10, 15];
    let houseCollection = [];

    for (let i = 0; i < mileRadiusCollection.length; i++) {
        for (let j = 0; j < 20; j++) {
            let house = {
                details: {
                    driving: null,
                    cycling: null,
                    walking: null,
                    train: null,
                    bus: null,
                    nearestTrainStation: [],
                    nearestBusStop: [],
                },
            };
            house['id'] = uuidv4();
            coordinates = cleanCoordinates(
                faker.address.nearbyGPSCoordinate([55.861331, -4.250493], milesRadius, false),
            );
            rent = parseFloat(faker.finance.amount(400, 1500));

            house['details']['coordinates'] = coordinates;
            house['details']['rent'] = rent;
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
        let additionalHouse = {
            id: uuidv4(),
            details: {
                coordinates: houseCoordinates,
                driving: null,
                cycling: null,
                walking: null,
                train: null,
                bus: null,
                nearestTrainStation: [],
                nearestBusStop: [],
                rent: parseFloat(faker.finance.amount(400, 1500)),
            },
        };
        houseCollection.push(additionalHouse);
    });
    return houseCollection;
};

export default createHouseData;
