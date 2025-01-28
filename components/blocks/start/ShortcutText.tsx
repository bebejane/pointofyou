import s from "./ShortcutText.module.scss";
import cn from "classnames";
import { Image } from "react-datocms";
import { VideoPlayer } from "next-dato-utils/components";

type Props = {
	data: ShortcutTextRecord;
};

export default async function ShortcutText({ data: { id, text, textLink } }: Props) {
	return (
		<section
			id={id}
			className={s.container}
		></section>
	);
}
