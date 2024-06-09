import { Filters } from '../types';
import React from 'react';

interface FilterTagsProps {
	filters: Filters;
	onRemove: (name: keyof Filters, value: string) => void;
}

const FilterTags: React.FC<FilterTagsProps> = ({ filters, onRemove }) => {
	return (
		<div className="mb-4 flex flex-wrap">
			{Object.entries(filters).map(([key, values]) =>
				(values as string[]).map((value) => (
					<div
						key={`${key}-${value}`}
						className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 m-1 text-sm flex items-center"
					>
						<span>{`${key}: ${value}`}</span>
						<button
							className="ml-2 text-gray-500 hover:text-gray-700"
							onClick={() => onRemove(key as keyof Filters, value)}
						>
							&times;
						</button>
					</div>
				))
			)}
		</div>
	);
};

export default FilterTags;
