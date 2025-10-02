"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurants = void 0;
const getRestaurants = (req, res) => {
    const sampleData = [
        { id: 1, name: 'Pizza Place', cuisine: 'Italian' },
        { id: 2, name: 'Sushi Bar', cuisine: 'Japanese' }
    ];
    res.json(sampleData);
};
exports.getRestaurants = getRestaurants;
