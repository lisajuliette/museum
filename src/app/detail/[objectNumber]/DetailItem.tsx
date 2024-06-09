import React from 'react';

interface DetailItemProps {
	title: string;
	value: string | JSX.Element | JSX.Element[] | null | undefined;
}

const DetailItem: React.FC<DetailItemProps> = ({ title, value }) => {
	return (
		<div className="mb-2">
			<dt className="font-semibold">{title}:</dt>
			<dd>{value || 'Not available'}</dd>
		</div>
	);
};

export default DetailItem;
