import { Request, Response } from 'express';

export const getRestaurants = (req: Request, res: Response) => {
  const sampleData = [
    { id: 1, name: 'Pizza Place', cuisine: 'Italian' },
    { id: 2, name: 'Sushi Bar', cuisine: 'Japanese' }
  ];
  res.json(sampleData);
};
