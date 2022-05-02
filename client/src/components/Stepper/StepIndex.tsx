import {
	ConfirmationStep,
	FoodSelectionStep,
	SongRequestStep,
	SummaryStep,
} from './Steps';
import { Step } from '../../interfaces';

const steps: Step[] = [
	{
		label: "We've saved a seat for you",
		completed: false,
		component: ConfirmationStep,
	},
	{
		label: "What's on the menu?",
		completed: false,
		component: FoodSelectionStep,
	},
	{
		label: 'Give us a tune!',
		completed: false,
		component: SongRequestStep,
	},
	{
		label: "We can't wait to celebrate with you!",
		completed: false,
		component: SummaryStep,
	},
];

export default steps;
