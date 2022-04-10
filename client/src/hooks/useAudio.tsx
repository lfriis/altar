import { useMemo, useEffect, useState } from 'react';

const useAudio = (url: string) => {
	const audio = useMemo(() => new Audio(url), []);
	const [playing, setPlaying] = useState(false);

	const toggle = () => setPlaying(!playing);

	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		playing ? audio.play() : audio.pause();
	}, [playing]);

	useEffect(() => {
		audio.addEventListener('ended', () => setPlaying(false));
		return () => {
			audio.removeEventListener('ended', () => setPlaying(false));
		};
	}, []);

	return [playing, toggle];
};

export default useAudio;
