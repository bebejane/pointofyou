import s from "./page.module.scss";
import { HomeDocument } from "@/graphql";
import { apiQuery } from "next-dato-utils/api";
import { DraftMode, VideoPlayer } from "next-dato-utils/components";
import { Block } from "@/components/blocks";
import * as StartBlocks from "@/components/blocks/start";

export default async function Home() {
	const { home, draftUrl } = await apiQuery<HomeQuery, HomeQueryVariables>(HomeDocument);

	return (
		<>
			<article className={s.page}>
				<section className={s.header}>
					<h1>Point of You</h1>
					{home?.movieStart && (
						<VideoPlayer
							className={s.video}
							autoPlay={false}
							data={home.movieStart}
						/>
					)}
				</section>
				{home?.content.map((section, i) => (
					<Block
						key={i}
						data={section}
						components={StartBlocks}
					/>
				))}
			</article>
			<DraftMode url={draftUrl} />
		</>
	);
}
