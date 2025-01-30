import s from "./ShortcutImage.module.scss";
import cn from "classnames";
import { Image } from "react-datocms";
import Content from "@/components/common/Content";
import DatoLink from "@/components/nav/DatoLink";

type Props = {
	data: ShortcutImageRecord;
};

export default async function ShortcutImage({ data: { id, text, image, title, link } }: Props) {
	return (
		<section
			id={id}
			className={s.container}
		>
			<DatoLink link={link}>
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
						<span>{title}</span>
					</figcaption>
				</figure>
			</DatoLink>
		</section>
	);
}
