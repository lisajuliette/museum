import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface CollapsibleProps {
	title: React.ReactNode;
	children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="pb-3 pt-3 border-t">
			<div
				className="flex items-center cursor-pointer mb-2"
				onClick={toggleOpen}
			>
				<FontAwesomeIcon
					icon={faChevronRight}
					className="mr-2"
					style={{
						transform: `rotate(${isOpen ? 90 : 0}deg)`,
						transition: 'transform 0.3s',
					}}
				/>
				{title}
			</div>
			<motion.div
				initial={{ height: 0, opacity: 0 }}
				animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
				transition={{ duration: 0.3 }}
				style={{ overflow: 'hidden' }}
			>
				<div className="ml-4">{children}</div>
			</motion.div>
		</div>
	);
};

export default Collapsible;
