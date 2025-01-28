import s from "./ShortcutProject.module.scss";
import cn from "classnames";
import { Image } from "react-datocms";
import { VideoPlayer } from "next-dato-utils/components";

type Props = {
	data: ShortcutProjectRecord;
};

export default async function ShortcutProject({ data: { id } }: Props) {
	return (
		<section
			id={id}
			className={s.container}
		></section>
	);
}
