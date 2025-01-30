import s from "./page.module.scss";
import cn from "classnames";
import { apiQuery } from "next-dato-utils/api";
import { AllResearchesDocument } from "@/graphql";
import Link from "next/link";
import { Image } from "react-datocms";
import Content from "@/components/common/Content";
import FilterBar from "@/components/common/FilterBar";
import { parseAsString } from "nuqs/server";
import { DraftMode } from "next-dato-utils/components";
import Article from "../../components/common/Article";
import { format } from "date-fns";

const filterParser = parseAsString.withDefault("all");

export default async function ResearchsPage({ searchParams }) {
	const filter = filterParser.parseServerSide((await searchParams).filter);
	const { allResearches, allResearchCategories, draftUrl } = await apiQuery<
		AllResearchesQuery,
		AllResearchesQueryVariables
	>(AllResearchesDocument, {
		all: true,
	});

	const researchs = allResearches.filter(
		({ category }) => filter === "all" || category?.slug === filter
	);

	return (
		<>
			<Article
				title='Forskning'
				className={s.research}
			>
				<hr />
				<FilterBar
					href='/forskning'
					value={filter}
					options={[{ id: "all", label: "Alla" }].concat(
						allResearchCategories.map(({ slug, title }) => ({ id: slug, label: title }))
					)}
				/>
				{researchs.length === 0 && <p className={s.empty}>Det finns inga fartiklar ännu.</p>}
				<ul>
					{researchs.map(({ id, title, file, url, slug, text, _firstPublishedAt }) => (
						<li key={id}>
							<span>{format(new Date(_firstPublishedAt), "MM/dd yyyy")}</span>
							<h2>{title}</h2>
							<Content
								content={text}
								className={s.intro}
							/>
							{url && <Link href={url}>Läs mer</Link>}
							{file && (
								<a
									href={file.url}
									download
								>
									Ladda ner
								</a>
							)}
						</li>
					))}
				</ul>
			</Article>
			<DraftMode url={draftUrl} />
		</>
	);
}
