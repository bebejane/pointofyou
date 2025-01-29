import s from "./Article.module.scss";
import cn from "classnames";
import Link from "next/link";
import { Image } from "react-datocms";
import Content from "@/components/common/Content";

export type ArticleProps = {
	title: string;
	image?: FileField;
	intro?: any;
	content?: any;
	link?: {
		href: string;
		text: string;
	};
	className?: string;
	children?: React.ReactNode | React.ReactNode[];
};

export default function Article({
	title,
	image,
	intro,
	content,
	link,
	className,
	children,
}: ArticleProps) {
	return (
		<article className={cn(s.article, className)}>
			<header className={!image ? s.noImage : undefined}>
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
			{intro && (
				<Content
					content={intro}
					className={s.intro}
				/>
			)}
			{content && (
				<Content
					content={content}
					className={s.content}
				/>
			)}
			{children}
			{link && (
				<Link href={link.href}>
					<button>{link.text}</button>
				</Link>
			)}
		</article>
	);
}
