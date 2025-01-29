import s from "./ShortcutImage.module.scss";
import cn from "classnames";
import { Image } from "react-datocms";
import { VideoPlayer } from "next-dato-utils/components";
import Content from "@/components/common/Content";
import Link from "@node_modules/next/link";

type Props = {
	data: ShortcutImageRecord;
};

export default async function ShortcutImage({ data: { id, text, image, title } }: Props) {
	return (
		<section
			id={id}
			className={s.container}
		>
			<Link href={"/"}>
				<figure>
					{image.responsiveImage && (
						<Image
							data={image.responsiveImage}
							className={s.image}
							imgClassName={s.picture}
							intersectionMargin={`0px 0px 100% 0px`}
						/>
					)}
					<figcaption>
						<Content content={text} />
						<span>Läs mer</span>
					</figcaption>
				</figure>
			</Link>
		</section>
	);
}
