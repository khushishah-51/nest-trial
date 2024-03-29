import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class isAdmin implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.isAdmin) {
      // If session has isAdmin set to true, proceed to next middleware/route handler
      next();
    } else {
      // If not authenticated, send an error response
       res.status(403).send('Unauthorized');
    }
  }
}
