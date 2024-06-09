import React from 'react';

interface FilterTitleProps {
	title: string;
	onClick?: () => void;
	isSelected?: boolean;
}

const FilterTitle: React.FC<FilterTitleProps> = ({
	title,
	onClick,
	isSelected,
}) => {
	return (
		<h3
			className={`text-md capitalize cursor-pointer ${
				isSelected ? 'font-semibold' : ''
			}`}
			onClick={onClick}
		>
			{title}
		</h3>
	);
};

export default FilterTitle;
