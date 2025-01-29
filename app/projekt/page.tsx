import { apiQuery } from "next-dato-utils/api";
import { AllProjectsDocument } from "../../graphql";
import s from "./page.module.scss";
import cn from "classnames";
import Link from "next/link";
import { Image } from "react-datocms";
import Content from "../../components/common/Content";

export default async function Page() {
	const { allProjects } = await apiQuery<AllProjectsQuery, AllProjectsQueryVariables>(
		AllProjectsDocument
	);

	return (
		<article className={s.project}>
			<header>
				<h1>Projekt</h1>
				<div className={s.filter}>
					<div>Visa:</div>
					<button data-selected={true}>Alla</button>
					<button>Pågående</button>
					<button>Avslutade</button>
				</div>
			</header>
			<ul>
				{allProjects.map(({ id, title, slug, image, intro }) => (
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
