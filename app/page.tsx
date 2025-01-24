import s from "./page.module.scss";
import Link from "next/link";
import { Image } from "react-datocms";
import { HomeDocument } from "@/graphql";
import { apiQuery } from "next-dato-utils/api";
import { DraftMode, VideoPlayer } from "next-dato-utils/components";

export default async function Home() {
	const { home, draftUrl } = await apiQuery<HomeQuery, HomeQueryVariables>(HomeDocument);

	return (
		<>
			<article className={s.page}>
				<h1>Point of You</h1>
				{home.movieStart && (
					<VideoPlayer
						className={s.video}
						autoPlay={false}
						data={home.movieStart}
					/>
				)}
			</article>
			<DraftMode url={draftUrl} />
		</>
	);
}
