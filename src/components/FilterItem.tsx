import React from 'react';

interface FilterItemProps {
	isColorFilter: boolean;
	facet: any;
	facetName: string;
	filters: any;
	onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
	isColorFilter,
	facet,
	facetName,
	filters,
	onFilterChange,
}) => {
	const interpretPeriod = (period: number): string => {
		if (period > 0) {
			return `${period}th century`;
		} else {
			return `${Math.abs(period)}th century BCE`;
		}
	};

	return (
		<div
			key={facet.key}
			className={`mb-2 ${isColorFilter ? 'inline-flex' : 'block'} items-center`}
		>
			<label className="inline-flex items-center cursor-pointer text-sm font-light capitalize">
				<input
					type="checkbox"
					className="hidden-checkbox"
					name={facetName}
					value={facet.key}
					checked={filters[facetName]?.includes(facet.key) || false}
					onChange={onFilterChange}
				/>
				{isColorFilter ? (
					<div
						className={`color-swatch ${
							filters[facetName]?.includes(facet.key) ? 'selected' : ''
						}`}
						style={{ backgroundColor: facet.key }}
					/>
				) : (
					<span
						className={`ml-2 ${
							filters[facetName]?.includes(facet.key) ? 'selected-filter' : ''
						}`}
					>
						{facetName === 'dating.period'
							? interpretPeriod(facet.key)
							: facet.key}
					</span>
				)}
			</label>
		</div>
	);
};

export default FilterItem;
