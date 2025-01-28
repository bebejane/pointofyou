import s from "./ShortcutText.module.scss";
import cn from "classnames";
import { Image } from "react-datocms";
import { VideoPlayer } from "next-dato-utils/components";
import Content from "../../common/Content";
import Link from "@node_modules/next/link";

type Props = {
	data: ShortcutTextRecord;
};

export default async function ShortcutText({ data: { id, text, textLink } }: Props) {
	return (
		<section
			id={id}
			className={s.container}
		>
			<Content content={text} />
			<Link href='/'>{textLink}</Link>
		</section>
	);
}
