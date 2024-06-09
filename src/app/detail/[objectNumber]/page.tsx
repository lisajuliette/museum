'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../../../contexts/LanguageContext';
import { fetchArtObject } from '../../../utils/api';
import { ArtObject } from '../../../types';
import DetailItem from './DetailItem';
import CrossHatchLoader from '../../../components/CrossHatchLoader';

const Detail = ({ params }: { params: { objectNumber: string } }) => {
	const { language } = useLanguage();
	const [artObject, setArtObject] = useState<ArtObject | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchArtObject(params.objectNumber, language);
				setArtObject(data);
			} catch (error) {
				console.error('Error fetching art object:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [language, params.objectNumber]);

	const renderDimensions = () =>
		artObject?.dimensions?.length
			? artObject.dimensions.map((d, index) => (
					<span key={index}>
						{d.value} {d.unit} ({d.type})
						{index < artObject.dimensions!.length - 1 ? ', ' : ''}
					</span>
			  ))
			: null;

	if (loading) {
		return <CrossHatchLoader />;
	}

	if (!artObject) {
		return <p>Error loading art object</p>;
	}

	return (
		<div className="container mx-auto px-4 py-10">
			<div className="flex flex-col md:flex-row">
				<article className="p-4 w-full md:w-1/3">
					<header>
						<h1 className="text-5xl font-bold mb-4">{artObject.title}</h1>
					</header>
					<section>
						<p className="mt-4">{artObject.description}</p>
					</section>
					<section className="mt-6">
						<h2 className="text-3xl font-semibold mb-2">Details</h2>
						<dl>
							<DetailItem
								title="Maker"
								value={artObject.principalOrFirstMaker}
							/>
							<DetailItem
								title="Date"
								value={artObject.dating?.presentingDate}
							/>
							<DetailItem
								title="Material"
								value={artObject.materials?.join(', ')}
							/>
							<DetailItem
								title="Techniques"
								value={artObject.techniques?.join(', ')}
							/>
							<DetailItem title="Dimensions" value={renderDimensions()} />
							<DetailItem
								title="Physical Medium"
								value={artObject.physicalMedium}
							/>
							<DetailItem title="Long Title" value={artObject.longTitle} />
							<DetailItem
								title="Collection"
								value={artObject.objectCollection?.join(', ')}
							/>
							<DetailItem
								title="Production Places"
								value={artObject.productionPlaces?.join(', ')}
							/>
						</dl>
					</section>
				</article>
				<figure className="w-full md:w-2/3 p-4">
					<Image
						src={artObject.webImage.url}
						alt={artObject.title}
						width={artObject.webImage.width}
						height={artObject.webImage.height}
						className="w-full h-auto rounded-lg shadow-md"
					/>
					<figcaption className="text-center mt-2">
						{artObject.title}
					</figcaption>
				</figure>
			</div>
		</div>
	);
};

export default Detail;
