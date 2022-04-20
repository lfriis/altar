import {
	ConfirmationStep,
	FoodSelectionStep,
	SongRequestStep,
	SummaryStep,
} from './Steps';
import { Step } from '../../interfaces';

const steps: Step[] = [
	{
		label: 'We hope to see you there',
		completed: false,
		component: ConfirmationStep,
	},
	{
		label: "What's on the menu?",
		completed: false,
		component: FoodSelectionStep,
	},
	{
		label: 'Give us a beat',
		completed: false,
		component: SongRequestStep,
	},
	{
		label: "Can't wait to see you",
		completed: false,
		component: SummaryStep,
	},
];

export default steps;
