import Link from 'next/link';
import config from '@/datocms.config';
import * as changeCase from 'change-case';

export type Props = {
	link: ExternalLinkRecord | InternalLinkRecord;
	className?: string;
	children?: React.ReactNode;
};

async function getInteranlRoute(link: InternalLinkRecord) {
	const apiKey = changeCase.kebabCase(link.link.__typename.replace('Record', ''));
	const route = await config.routes[apiKey]?.(link.link);
	return route?.[0];
}

export default async function DatoLink({ link, className, children }: Props) {
	if (!link) return <a className={className}>{children}</a>;

	const typeName = link.__typename;
	const slug = typeName === 'ExternalLinkRecord' ? link.url : await getInteranlRoute(link);
	const title = typeName === 'ExternalLinkRecord' ? link.title : link.link.title;

	if (!slug) return <a className={className}>{children}</a>;

	return link.__typename === 'ExternalLinkRecord' ? (
		<a href={slug} className={className}>
			{children ?? title}
		</a>
	) : (
		<Link href={slug} className={className}>
			{children ?? title}
		</Link>
	);
}
