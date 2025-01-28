import s from "./ButtonBlock.module.scss";
import cn from "classnames";
import Link from "next/link";

type Props = {
	data: ButtonRecord;
};

export default async function ButtonBlock({ data: { text, url } }: Props) {
	return (
		<p className={s.wrapper}>
			<Link
				href={url}
				className={s.button}
			>
				<button className={s.button}>{text}</button>
			</Link>
		</p>
	);
}
