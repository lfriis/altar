import express, { Application, Request, Response, NextFunction } from 'express';

const server: Application = express();

server.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send('Whooop its working');
});

server.listen(5111, () => console.log('Server running'));
