import s from "./ShortcutMovie.module.scss";
import cn from "classnames";
import { Image } from "react-datocms";
import { VideoPlayer } from "next-dato-utils/components";

type Props = {
	data: ShortcutMovieRecord;
};

export default async function ShortcutMovie({ data: { id, text, movie, textLink } }: Props) {
	return (
		<section
			id={id}
			className={s.container}
		></section>
	);
}
