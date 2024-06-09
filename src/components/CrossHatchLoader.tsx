import React from 'react';
import { motion } from 'framer-motion';

const CrossHatchLoader: React.FC = () => {
	const lineVariants = {
		hidden: { pathLength: 0, opacity: 0 },
		visible: {
			pathLength: 1,
			opacity: 1,
			transition: {
				duration: 1,
				ease: 'easeInOut',
				repeat: Infinity,
				repeatType: 'loop' as const,
			},
		},
	};

	return (
		<div className="flex justify-center items-center h-full">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 200 200"
				width="200"
				height="200"
			>
				<motion.line
					x1="10"
					y1="10"
					x2="190"
					y2="190"
					stroke="#000"
					strokeWidth="2"
					variants={lineVariants}
					initial="hidden"
					animate="visible"
				/>
				<motion.line
					x1="190"
					y1="10"
					x2="10"
					y2="190"
					stroke="#000"
					strokeWidth="2"
					variants={lineVariants}
					initial="hidden"
					animate="visible"
				/>
				<motion.line
					x1="10"
					y1="60"
					x2="140"
					y2="190"
					stroke="#000"
					strokeWidth="2"
					variants={lineVariants}
					initial="hidden"
					animate="visible"
				/>
				<motion.line
					x1="60"
					y1="10"
					x2="190"
					y2="140"
					stroke="#000"
					strokeWidth="2"
					variants={lineVariants}
					initial="hidden"
					animate="visible"
				/>
				<motion.line
					x1="10"
					y1="140"
					x2="140"
					y2="10"
					stroke="#000"
					strokeWidth="2"
					variants={lineVariants}
					initial="hidden"
					animate="visible"
				/>
				<motion.line
					x1="60"
					y1="190"
					x2="190"
					y2="60"
					stroke="#000"
					strokeWidth="2"
					variants={lineVariants}
					initial="hidden"
					animate="visible"
				/>
			</svg>
		</div>
	);
};

export default CrossHatchLoader;
