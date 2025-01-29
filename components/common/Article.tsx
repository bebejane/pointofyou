import s from "./Article.module.scss";
import cn from "classnames";
import Link from "next/link";
import { Image } from "react-datocms";
import Content from "@/components/common/Content";

export type ArticleProps = {
	title: string;
	image?: FileField;
	intro: any;
	content: any;
	link?: {
		href: string;
		text: string;
	};
};

export default function Article({ title, image, intro, content, link }: ArticleProps) {
	return (
		<article className={s.article}>
			<header>
				<h1>{title}</h1>
				{image && (
					<figure>
						<Image
							data={image.responsiveImage}
							className={s.image}
							pictureClassName={s.picture}
						/>
					</figure>
				)}
			</header>
			<Content
				content={intro}
				className={s.intro}
			/>
			<Content
				content={content}
				className={s.content}
			/>
			{link && (
				<Link href={link.href}>
					<button>{link.text}</button>
				</Link>
			)}
		</article>
	);
}
