import { Request, Response } from 'express';

// Handler for 404 Not Found error
export const notFoundHandler = (_request: Request, response: Response): void => {
  const message = 'Resource not found';

  response.status(404).send(message);
};
