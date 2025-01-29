import { apiQuery } from "next-dato-utils/api";
import { AllProjectsDocument } from "@/graphql";
import s from "./page.module.scss";
import cn from "classnames";
import Link from "next/link";
import { Image } from "react-datocms";
import Content from "@/components/common/Content";
import FilterBar from "@/components/common/FilterBar";
import { parseAsString } from "nuqs/server";

const filterParser = parseAsString.withDefault("all");

export default async function Page({ searchParams }) {
	const filter = filterParser.parseServerSide((await searchParams).filter);
	const { allProjects } = await apiQuery<AllProjectsQuery, AllProjectsQueryVariables>(
		AllProjectsDocument
	);

	const projects = allProjects.filter(
		({ active }) =>
			filter === "all" || (filter === "active" && active) || (filter === "finished" && !active)
	);

	return (
		<article className={s.projects}>
			<header>
				<h1>Projekt</h1>
				<div className={s.filter}>
					<FilterBar
						href='/projekt'
						value={filter}
						options={[
							{ id: "all", label: "Alla" },
							{ id: "active", label: "Pågående" },
							{ id: "finished", label: "Avslutade" },
						]}
					/>
				</div>
			</header>
			<ul>
				{projects.map(({ id, title, slug, image, intro, active }) => (
					<li key={id}>
						<Link href={`/projekt/${slug}`}>
							<figure>
								<Image
									data={image.responsiveImage}
									pictureClassName={s.picture}
								/>
								<figcaption>
									<h2>{title}</h2>
									<Content
										content={intro}
										className={s.intro}
									/>
								</figcaption>
							</figure>
						</Link>
					</li>
				))}
			</ul>
		</article>
	);
}
