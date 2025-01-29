import { apiQuery } from "next-dato-utils/api";
import { AllNewsDocument } from "@/graphql";
import s from "./page.module.scss";
import cn from "classnames";
import Link from "next/link";
import { Image } from "react-datocms";
import Content from "@/components/common/Content";
import FilterBar from "@/components/common/FilterBar";
import { parseAsString } from "nuqs/server";
import { DraftMode } from "next-dato-utils/components";
import Article from "@/components/common/Article";
import { format } from "date-fns";

export default async function NewsPage({ searchParams }) {
	const { allNews, draftUrl } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(
		AllNewsDocument,
		{ all: true }
	);

	return (
		<>
			<Article
				title='Aktuellt'
				className={s.news}
			>
				<hr />
				<ul>
					{allNews.map(({ id, title, slug, intro, _firstPublishedAt }) => (
						<li key={id}>
							<span>{format(new Date(_firstPublishedAt), "MM/dd yyyy")}</span>
							<Link href={`/nyheter/aktuellt/${slug}`}>
								<h2>{title}</h2>
								<Content content={intro} />
							</Link>
						</li>
					))}
				</ul>
			</Article>
			<DraftMode url={draftUrl} />
		</>
	);
}
