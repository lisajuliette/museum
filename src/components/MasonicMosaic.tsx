import React from 'react';
import '@juggle/resize-observer';
import { Masonry } from 'masonic';
import Image from 'next/image';
import Link from 'next/link';
import { ArtObject } from '../types';
import BrushStroke from './BrushStroke';
import NoImage from './NoImage';

interface MasonicMosaicProps {
	artObjects: ArtObject[];
}

const MasonicMosaic: React.FC<MasonicMosaicProps> = ({ artObjects }) => {
	const Artwork = ({
		data,
		width,
		index,
	}: {
		data: ArtObject;
		width: number;
		index: number;
	}) => {
		if (!data) {
			return null;
		}

		return (
			<div
				className="masonry-item rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
				style={{ width }}
			>
				<Link href={`/detail/${data.objectNumber}`}>
					{data.webImage ? (
						<Image
							src={data.webImage.url}
							alt={data.title}
							width={data.webImage.width}
							height={data.webImage.height}
							className="w-full h-auto rounded-t-lg"
							priority
						/>
					) : (
						<NoImage />
					)}

					<div className="p-4 absolute bottom-0 w-full">
						<div
							className="relative"
							style={{ left: '-50px', bottom: '-25px' }}
						>
							<BrushStroke fill="#314a44" mixBlendMode="multiply" />
						</div>
						<div className="absolute bottom-0 w-full left-0 z-10 p-4">
							<p className="text-sm font-semibold text-gray-100">
								{data.title}
							</p>
							<p className="text-xs text-gray-200">
								by {data.principalOrFirstMaker}
							</p>
						</div>
					</div>
				</Link>
			</div>
		);
	};

	return (
		<Masonry<ArtObject>
			items={artObjects}
			columnGutter={16}
			columnWidth={300}
			overscanBy={5}
			render={({ data, width, index }) => (
				<Artwork data={data} width={width} index={index} />
			)}
		/>
	);
};

export default MasonicMosaic;
