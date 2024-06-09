export interface ArtObject {
	id: string;
	objectNumber: string;
	title: string;
	principalOrFirstMaker: string;
	webImage: {
		url: string;
		width: number;
		height: number;
	};
	description?: string;
	materials?: string[];
	techniques?: string[];
	dimensions?: { unit: string; type: string; value: string }[];
	physicalMedium?: string;
	longTitle?: string;
	productionPlaces: string[];
	dating?: {
		presentingDate: string;
	};
	objectCollection?: string[];
	colors?: {
		percentage: number;
		hex: string;
	}[];
}

export interface FilterFacet {
	key: string;
	value: number;
}

export interface Facet {
	name: string;
	facets: FilterFacet[];
	otherTerms: number;
	prettyName: number;
}

export interface Facets {
	[key: string]: Facet;
}

export interface Filters {
	material: string[];
	technique: string[];
	'dating.period': string[];
	place: string[];
	type: string[];
	'normalized32Colors.hex': string[];
}
