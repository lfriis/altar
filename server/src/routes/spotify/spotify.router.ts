/**
 * ? Required External Modules and Interfaces
 */
import express, { NextFunction, Request, Response } from 'express';
import { SpotifyService } from '../../utils';

export const spotifyRouter = express.Router();
export default spotifyRouter;

/**
 * ? Controller Definitions
 */
spotifyRouter.post(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		const { spotifySearchTerm, spotifyOffset } = req.body;

		console.log(spotifyOffset);

		try {
			const spotifyToken = await SpotifyService.authenticate();
			const searchResults = await SpotifyService.search(
				spotifyToken,
				spotifySearchTerm,
				spotifyOffset
			);

			return res.status(200).json({
				message: 'Successful Spotify Authentication',
				searchResults,
			});
		} catch (e) {
			return next(e);
		}
	}
);
