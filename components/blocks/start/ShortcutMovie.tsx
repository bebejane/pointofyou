import s from "./ShortcutMovie.module.scss";
import cn from "classnames";
import { Image, isSeoLinkTag } from "react-datocms";
import { VideoPlayer } from "next-dato-utils/components";
import Content from "../../common/Content";
import Link from "next/link";

type Props = {
	data: ShortcutMovieRecord;
};

export default async function ShortcutMovie({ data: { id, text, movie, textLink } }: Props) {
	return (
		<section
			id={id}
			className={s.container}
		>
			<Link href='/'>
				<VideoPlayer
					data={movie}
					className={s.video}
				/>
				<div className={s.content}>
					<Content
						content={text}
						className={s.text}
					/>
					<span>{textLink}</span>
				</div>
			</Link>
		</section>
	);
}
