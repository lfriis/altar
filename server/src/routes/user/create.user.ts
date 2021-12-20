import { Request, Response, Router } from 'express';
const router = Router();

router.get('/create', (req: Request, res: Response) => {
	console.log('hit');
	return res.status(200).json({
		message: 'Created User Hit!',
	});
});

export default router;
