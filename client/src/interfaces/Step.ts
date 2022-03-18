export interface Step {
	label: string;
	completed: boolean;
	component: () => JSX.Element;
}
