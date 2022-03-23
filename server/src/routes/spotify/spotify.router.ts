/**
 * ? Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
import { SpotifyService } from '../../utils';

export const spotifyRouter = express.Router();
export default spotifyRouter;

/**
 * ? Controller Definitions
 */
spotifyRouter.post('/', async (req: Request, res: Response) => {
	const { spotifySearchTerm } = req.body;

	try {
		const spotifyToken = await SpotifyService.authenticate();
		const searchResults = await SpotifyService.search(
			spotifyToken,
			spotifySearchTerm
		);

		return res.status(200).json({
			message: 'Successful Spotify Authentication',
			searchResults,
		});
	} catch (e) {
		return res.status(401).json({ e });
	}
});
