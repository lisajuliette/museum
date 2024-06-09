import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ActionButtonProps {
	onClick: () => void;
	label: string;
	className?: string;
	icon?: 'search' | 'filter';
}

const ActionButton: React.FC<ActionButtonProps> = ({
	onClick,
	label,
	className = '',
	icon,
}) => {
	const renderIcon = () => {
		switch (icon) {
			case 'search':
				return faMagnifyingGlass;
			case 'filter':
				return faFilter;
			default:
				return undefined;
		}
	};

	const iconProp = renderIcon();

	return (
		<button
			onClick={onClick}
			className={`p-3 bg-gray-700 hover:bg-gray-800 text-white rounded ${className}`}
		>
			{iconProp && <FontAwesomeIcon icon={iconProp} className="mr-2" />}
			{label}
		</button>
	);
};

export default ActionButton;
