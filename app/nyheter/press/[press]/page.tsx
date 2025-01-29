import { apiQuery } from "next-dato-utils/api";
import { PressDocument } from "@/graphql";
import { notFound } from "@node_modules/next/navigation";
import Article from "@/components/common/Article";
import { DraftMode } from "next-dato-utils/components";

export type PressProps = {
	params: Promise<{ press: string }>;
};

export default async function PressPage({ params }: PressProps) {
	const { press: slug } = await params;
	const { press, draftUrl } = await apiQuery<PressQuery, PressQueryVariables>(PressDocument, {
		variables: {
			slug,
		},
	});

	if (!press) return notFound();

	const { title, intro, image } = press;

	return (
		<>
			<Article
				title={title}
				image={image as FileField}
				intro={intro}
				link={{
					href: "/nyheter/press",
					text: "Visa alla press nyheter",
				}}
			/>
			<DraftMode url={draftUrl} />
		</>
	);
}
