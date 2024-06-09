import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
	language: string;
	setLanguage: (newLanguage: string) => void;
	translations: {
		[key: string]: {
			title: string;
			description: string;
		};
	};
}

const Header: React.FC<HeaderProps> = ({
	language,
	setLanguage,
	translations,
}) => {
	const { title, description } = translations[language];

	return (
		<header className="text-left py-10 flex justify-between items-start">
			<div>
				<h1 className="text-5xl font-bold mb-4">{title}</h1>
				<p className="text-lg text-gray-600">{description}</p>
			</div>
			<LanguageSwitcher language={language} setLanguage={setLanguage} />
		</header>
	);
};

export default Header;
