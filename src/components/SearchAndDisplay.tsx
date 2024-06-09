import React, { useState, useEffect, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { Subject } from 'rxjs';
import { fetchArtObjects, fetchFacets } from '../utils/api';
import FilterSidebar from './FilterSidebar';
import ActionButton from './ActionButton';
import { ArtObject, Facets, Filters } from '../types';
import CrossHatchLoader from './CrossHatchLoader';
import { motion } from 'framer-motion';
import FilterTags from './FilterTags';
import dynamic from 'next/dynamic';

interface SearchAndDisplayProps {
	language: string;
}

const MasonicMosaic = dynamic(() => import('./MasonicMosaic'), {
	ssr: false,
});

const SearchAndDisplay: React.FC<SearchAndDisplayProps> = ({ language }) => {
	const [artObjects, setArtObjects] = useState<ArtObject[]>([]);
	const [facets, setFacets] = useState<Facets>({});
	const [filters, setFilters] = useState<Filters>({
		material: [],
		technique: [],
		'dating.period': [],
		type: [],
		place: [],
		'normalized32Colors.hex': [],
	});
	const [pendingFilters, setPendingFilters] = useState<Filters>(filters);
	const [loading, setLoading] = useState(false);
	const [noResults, setNoResults] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
	const searchSubject = useMemo(() => new Subject<string>(), []);

	const debouncedFetch = useMemo(
		() =>
			debounce(async (query: string, lang: string, filt: Filters) => {
				setLoading(true);
				const results = await fetchArtObjects(query, lang, filt);
				setArtObjects(results);
				setNoResults(results.length === 0);
				setLoading(false);
			}, 500),
		[]
	);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const handleSearch = () => {
		setLoading(true);
		debouncedFetch(searchQuery, language, { ...filters });
	};

	const handleFilterChange = useCallback(
		(name: keyof Filters, value: string) => {
			const updatedFilters = { ...pendingFilters };
			if (!updatedFilters[name].includes(value)) {
				updatedFilters[name] = [...updatedFilters[name], value];
			} else {
				updatedFilters[name] = updatedFilters[name].filter(
					(item) => item !== value
				);
			}
			setPendingFilters(updatedFilters);
		},
		[pendingFilters]
	);

	const applyFilters = () => {
		setFilters(pendingFilters);
		debouncedFetch(searchQuery, language, pendingFilters);
		setIsFilterPanelOpen(false);
	};

	const handleRemoveFilter = (name: keyof Filters, value: string) => {
		const updatedFilters = { ...filters };
		updatedFilters[name] = updatedFilters[name].filter(
			(item) => item !== value
		);
		setFilters(updatedFilters);
		debouncedFetch(searchQuery, language, updatedFilters);
	};

	useEffect(() => {
		const subscription = searchSubject.subscribe((query) => {
			debouncedFetch(query, language, { ...filters });
		});
		return () => subscription.unsubscribe();
	}, [language, filters, debouncedFetch, searchSubject]);

	useEffect(() => {
		const fetchAndSetFacets = async () => {
			const response = await fetchFacets(language);
			setFacets(response);
		};
		fetchAndSetFacets();
	}, [language]);

	return (
		<div className="flex flex-col">
			<div className="flex flex-grow">
				<div className="hidden md:block w-1/4 p-4">
					<FilterSidebar
						facets={facets}
						filters={pendingFilters}
						onFilterChange={(e) =>
							handleFilterChange(e.target.name as keyof Filters, e.target.value)
						}
						applyFilters={applyFilters}
					/>
				</div>
				<motion.div
					className="fixed top-0 left-0 h-full w-4/5 bg-white z-50 md:hidden shadow-lg"
					initial={{ x: '-100%' }}
					animate={{ x: isFilterPanelOpen ? '0%' : '-100%' }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
				>
					<div className="p-4">
						<FilterSidebar
							facets={facets}
							filters={pendingFilters}
							onFilterChange={(e) =>
								handleFilterChange(
									e.target.name as keyof Filters,
									e.target.value
								)
							}
							applyFilters={applyFilters}
						/>
					</div>
				</motion.div>
				<div className="w-full md:w-3/4 p-4">
					<div className="flex mb-4">
						<input
							type="text"
							placeholder="Search artworks..."
							className="p-2 border rounded mr-2 flex-grow"
							onChange={handleSearchChange}
						/>
						<ActionButton onClick={handleSearch} label="Search" icon="search" />
					</div>
					<div className="mb-4">
						<FilterTags filters={filters} onRemove={handleRemoveFilter} />
					</div>
					{loading ? (
						<CrossHatchLoader />
					) : noResults ? (
						<p>No results found.</p>
					) : (
						<MasonicMosaic artObjects={artObjects} />
					)}
				</div>
				<button
					className="fixed bottom-4 left-4 p-2 bg-gray-700 hover:bg-gray-800 text-white rounded md:hidden z-50"
					onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
				>
					{isFilterPanelOpen ? 'Close Filters' : 'Open Filters'}
				</button>
			</div>
		</div>
	);
};

export default SearchAndDisplay;
