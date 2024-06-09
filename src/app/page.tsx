'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import translations from '../../public/translations.json';

const SearchAndDisplay = dynamic(
	() => import('../components/SearchAndDisplay'),
	{
		ssr: false,
	}
);

const Home: React.FC = () => {
	const [language, setLanguage] = useState<string>('en');

	return (
		<div className="container mx-auto px-4">
			<Header
				language={language}
				setLanguage={setLanguage}
				translations={translations}
			/>
			<main>
				<SearchAndDisplay language={language} />
			</main>
		</div>
	);
};

export default Home;
