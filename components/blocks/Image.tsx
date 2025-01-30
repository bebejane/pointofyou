import React from "react";
import ImageGallery from "./ImageGallery";

export type ImageBlockProps = {
	id: string;
	data: ImageRecord;
	onClick: Function;
	editable?: any;
};

export default function Image({ id, data: { image: images } }: ImageBlockProps) {
	if (!images || !images.length) return null;

	return (
		<ImageGallery
			id={id}
			images={images}
		/>
	);
}
