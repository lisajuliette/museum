import React from 'react';

interface LanguageSwitcherProps {
	language: string;
	setLanguage: (newLanguage: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
	language,
	setLanguage,
}) => {
	const toggleLanguage = () => {
		const newLanguage = language === 'en' ? 'nl' : 'en';
		setLanguage(newLanguage);
	};

	return (
		<button
			onClick={toggleLanguage}
			className="text-gray-500 hover:text-gray-700 hover:underline focus:outline-none mt-4"
		>
			{language === 'en' ? 'Nederlands' : 'English'}
		</button>
	);
};

export default LanguageSwitcher;
