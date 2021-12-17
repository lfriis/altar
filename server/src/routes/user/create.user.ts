import { Request, Response, Router } from 'express';
const routes = Router();

routes.get('/create', (req: Request, res: Response) => {
	console.log('hit');
	return res.status(200).json({
		message: 'Created User Hit!',
	});
});

export default routes;
