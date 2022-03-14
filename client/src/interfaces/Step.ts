export interface Step {
	label: string;
	description: string;
	completed: boolean;
	component: () => JSX.Element;
}
