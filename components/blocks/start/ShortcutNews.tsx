import s from "./ShortcutNews.module.scss";
import cn from "classnames";
import { apiQuery } from "next-dato-utils/api";
import { AllNewsDocument } from "@/graphql";
import Link from "@node_modules/next/link";
import Content from "@/components/common/Content";

type Props = {
	data: ShortcutNewsRecord;
};

export default async function ShortcutNews({ data: { id } }: Props) {
	const { allNews } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(AllNewsDocument, {
		variables: {
			first: 3,
		},
	});
	return null;
	return (
		<section
			id={id}
			className={s.container}
		>
			<div className={s.header}>
				<h2>Nyheter</h2>
				<Link href='/nyheter/aktuellt'>Visa alla</Link>
			</div>
			<ul className={s.news}>
				{allNews.map(({ id, title, slug, intro }) => (
					<Link
						key={id}
						href={`/nyheter/aktuellt/${slug}`}
					>
						<h3>{title}</h3>
						<Content content={intro} />
					</Link>
				))}
			</ul>
		</section>
	);
}
