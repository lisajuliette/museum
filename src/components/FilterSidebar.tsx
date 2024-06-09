import React from 'react';
import Collapsible from './Collapsible';
import ActionButton from './ActionButton';
import FilterTitle from './FilterTitle';
import FilterItem from './FilterItem';

interface FilterSidebarProps {
	facets: any;
	filters: any;
	onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	applyFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
	facets,
	filters,
	onFilterChange,
	applyFilters,
}) => {
	const renderOptions = (facetName: string) => {
		if (!facets[facetName]) return null;

		return facets[facetName].facets
			.filter((facet: any) => facet.value > 0)
			.map((facet: any) => {
				const isColorFilter = facetName === 'normalized32Colors.hex';
				return (
					<FilterItem
						key={facet.key}
						isColorFilter={isColorFilter}
						facet={facet}
						facetName={facetName}
						filters={filters}
						onFilterChange={onFilterChange}
					/>
				);
			});
	};

	const isFacetSelected = (facetName: string) => {
		return filters[facetName] && filters[facetName].length > 0;
	};

	return (
		<>
			<h2 className="font-bold mb-2 text-lg">Filters</h2>
			<Collapsible
				title={
					<FilterTitle
						title="Material"
						isSelected={isFacetSelected('material')}
					/>
				}
			>
				{renderOptions('material')}
			</Collapsible>
			<Collapsible
				title={
					<FilterTitle
						title="Technique"
						isSelected={isFacetSelected('technique')}
					/>
				}
			>
				{renderOptions('technique')}
			</Collapsible>
			<Collapsible
				title={
					<FilterTitle title="Place" isSelected={isFacetSelected('place')} />
				}
			>
				{renderOptions('place')}
			</Collapsible>
			<Collapsible
				title={
					<FilterTitle
						title="Period"
						isSelected={isFacetSelected('dating.period')}
					/>
				}
			>
				{renderOptions('dating.period')}
			</Collapsible>
			<Collapsible
				title={
					<FilterTitle title="Type" isSelected={isFacetSelected('type')} />
				}
			>
				{renderOptions('type')}
			</Collapsible>
			<Collapsible
				title={
					<FilterTitle
						title="Color"
						isSelected={isFacetSelected('normalized32Colors.hex')}
					/>
				}
			>
				{renderOptions('normalized32Colors.hex')}
			</Collapsible>
			<ActionButton
				onClick={applyFilters}
				label="Apply Filters"
				icon="filter"
			/>
		</>
	);
};

export default FilterSidebar;
