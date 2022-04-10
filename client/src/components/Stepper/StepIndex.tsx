import {
	ConfirmationStep,
	FoodSelectionStep,
	EmailAddressStep,
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
		label: "We won't bug you too much",
		completed: false,
		component: EmailAddressStep,
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
