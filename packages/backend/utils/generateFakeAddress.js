import { faker } from '@faker-js/faker';

const generateSubstring = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const firstLetter = alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
    const secondLetter = alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase();
    return `${firstLetter}${secondLetter}`;
};

const generatePostCodeNumbers = () => {
    const postCodeDoubleNumbers =
        Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
    return [postCodeDoubleNumbers, Math.floor(Math.random() * 10)];
};

const generateFakeAddress = () => {
    const streetName = faker.address.street();
    const city = 'Glasgow';
    const postcodeSubString = generateSubstring();
    const postCodeNumbers = generatePostCodeNumbers();
    const postCode = `G${postCodeNumbers[0]} ${postCodeNumbers[1]}${postcodeSubString}`;
    const fullAddress = { streetName, city, postCode };
    return fullAddress;
};

export default generateFakeAddress;
