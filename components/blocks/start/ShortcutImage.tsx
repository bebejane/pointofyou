import s from "./ShortcutImage.module.scss";
import cn from "classnames";
import { Image } from "react-datocms";
import { VideoPlayer } from "next-dato-utils/components";

type Props = {
	data: ShortcutImageRecord;
};

export default async function ShortcutImage({ data: { id, text, image, title } }: Props) {
	return (
		<section
			id={id}
			className={s.container}
		>
			<figure>
				{image.responsiveImage && (
					<Image
						data={image.responsiveImage}
						className={s.image}
						imgClassName={s.picture}
						intersectionMargin={`0px 0px 100% 0px`}
					/>
				)}
				{image?.video && (
					<VideoPlayer
						data={image}
						className={cn(s.video, s.image)}
					/>
				)}
			</figure>
		</section>
	);
}
