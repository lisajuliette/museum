import { ArtObject, Facets, Filters } from '../types';

const apiKey = 'fAjcXlu4';
const principalMaker = 'Rembrandt+van+Rijn';

export const fetchFacets = async (language: string): Promise<Facets> => {
	const url = `https://www.rijksmuseum.nl/api/${language}/collection?key=${apiKey}&principalMaker=${principalMaker}&format=json`;
	const response = await fetch(url);
	const data = await response.json();
	const relevantFacets = data.facets.reduce((acc: Facets, facet: any) => {
		acc[facet.name] = facet;
		return acc;
	}, {});
	return relevantFacets;
};

export const fetchArtObject = async (
	objectNumber: string,
	language: string
): Promise<ArtObject> => {
	const url = `https://www.rijksmuseum.nl/api/${language}/collection/${objectNumber}?key=${apiKey}&principalMaker=${principalMaker}&format=json`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			const responseText = await response.text();
			console.error(
				'Failed to fetch data:',
				response.status,
				response.statusText,
				responseText
			);
			throw new Error(
				`Failed to fetch data: ${response.status} ${response.statusText}`
			);
		}

		const data = await response.json();
		return data.artObject;
	} catch (error) {
		if (error instanceof Error) {
			console.error('Fetch or parse error:', error.message);
			throw new Error(`Error fetching or parsing data: ${error.message}`);
		} else {
			console.error('Unexpected error', error);
			throw new Error('An unexpected error occurred');
		}
	}
};

export const fetchArtObjects = async (
	query: string,
	language: string,
	filters: Filters
): Promise<ArtObject[]> => {
	let filterParams = '';

	Object.keys(filters).forEach((key) => {
		const filterKey = key as keyof Filters;
		if (filters[filterKey].length > 0) {
			filters[filterKey].forEach((filter: string) => {
				filterParams += `&f.${key}=${encodeURIComponent(filter)}`;
			});
		}
	});

	const apiUrl = `https://www.rijksmuseum.nl/api/${language}/collection?key=${apiKey}&principalMaker=${principalMaker}&q=${encodeURIComponent(
		query
	)}${filterParams}`;

	const response = await fetch(apiUrl);

	if (!response.ok) {
		throw new Error('Failed to fetch art objects');
	}

	const data = await response.json();
	return data.artObjects;
};
