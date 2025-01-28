import s from "./ImageBlock.module.scss";
import cn from "classnames";
import Link from "next/link";
import { Image } from "react-datocms";

type Props = {
	data: ImageRecord;
};

export default async function ImageBlock({ data: { id, image } }: Props) {
	return (
		<figure className={s.figure}>
			{image.format !== "svg" ? (
				<Image
					data={image.responsiveImage}
					pictureClassName={s.picture}
				/>
			) : (
				<img
					src={image.url}
					alt={image.alt}
					className={s.picture}
				/>
			)}
		</figure>
	);
}
