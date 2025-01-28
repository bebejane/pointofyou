import s from "./ShortcutNews.module.scss";
import cn from "classnames";
import { Image } from "react-datocms";
import { VideoPlayer } from "next-dato-utils/components";

type Props = {
	data: ShortcutNewsRecord;
};

export default async function ShortcutNews({ data: { id } }: Props) {
	return (
		<section
			id={id}
			className={s.container}
		></section>
	);
}
