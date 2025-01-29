import s from "./page.module.scss";
import { apiQuery } from "next-dato-utils/api";
import { ContactDocument } from "@/graphql";
import cn from "classnames";
import Link from "next/link";
import { Image } from "react-datocms";
import Content from "@/components/common/Content";
import { DraftMode } from "next-dato-utils/components";
import { notFound } from "@node_modules/next/navigation";
import Article from "../../components/common/Article";

export default async function ContactPage({ searchParams }) {
	const { contact, draftUrl } = await apiQuery<ContactQuery, ContactQueryVariables>(
		ContactDocument
	);

	if (!contact) return notFound();
	const { title, contentWrapper } = contact;

	return (
		<>
			<Article
				title={title}
				content={contentWrapper.content}
			/>
			<DraftMode url={draftUrl} />
		</>
	);
}
