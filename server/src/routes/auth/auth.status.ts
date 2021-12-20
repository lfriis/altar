import { Request, Response, Router } from 'express';
const router = Router();

router.post('/status', (req: Request, res: Response) => {
	console.log(req.body);

	return res.status(200).json({
		authenticated: true,
		message: 'Status check hit!',
	});
});

export default router;
