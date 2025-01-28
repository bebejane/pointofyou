import s from "./ShortcutProject.module.scss";
import cn from "classnames";
import { Image } from "react-datocms";
import { apiQuery } from "next-dato-utils/api";
import { AllProjectsDocument } from "@/graphql";
import Link from "@node_modules/next/link";
import Content from "../../common/Content";

type Props = {
	data: ShortcutProjectRecord;
};

export default async function ShortcutProject({ data: { id } }: Props) {
	const { allProjects } = await apiQuery<AllProjectsQuery, AllProjectsQueryVariables>(
		AllProjectsDocument,
		{
			variables: {
				first: 10,
			},
		}
	);

	return (
		<section
			id={id}
			className={s.container}
		>
			<div className={s.header}>
				<h2>Aktuella projekt</h2>

				<div className={s.nav}>
					<Link href='/projekt'>Visa alla</Link>
					<button disabled={true}>
						<img
							className={cn(s.arrow, s.back)}
							src='/images/arrow.svg'
							alt='arrow'
						/>
					</button>
					<button>
						<img
							className={cn(s.arrow, s.forward)}
							src='/images/arrow.svg'
							alt='arrow'
						/>
					</button>
				</div>
			</div>
			<ul className={s.projects}>
				{allProjects.map(({ id, title, image, slug }) => (
					<Link
						key={id}
						href={`/projekt/${slug}`}
					>
						<figure>
							<Image
								data={image.responsiveImage}
								className={s.image}
								imgClassName={s.picture}
								intersectionMargin={`0px 0px 100% 0px`}
							/>
							<figcaption>{title}</figcaption>
						</figure>
					</Link>
				))}
			</ul>
		</section>
	);
}
