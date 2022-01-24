/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface IProps extends NavLinkProps {
	children: ReactNode;
}

export default function NavbarLink({ children, ...rest }: IProps) {
	return (
		<NavLink
			className={(navData) =>
				navData.isActive
					? 'navbar__link navbar__link--active'
					: 'navbar__link'
			}
			{...rest}
		>
			{children}
		</NavLink>
	);
}
