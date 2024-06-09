'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'nl';

interface LanguageContextProps {
	language: Language;
	setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
	undefined
);

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return context;
};

interface LanguageProviderProps {
	children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
	children,
}) => {
	const [language, setLanguage] = useState<Language>('en');

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};
