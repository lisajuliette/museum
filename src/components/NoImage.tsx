import React from 'react';

const NoImage: React.FC = () => {
	return (
		<div
			className="flex items-center justify-center w-full bg-gray-700 rounded-lg"
			style={{ aspectRatio: '1 / 1' }}
		>
			<p className="text-gray-300">No Image</p>
		</div>
	);
};

export default NoImage;
