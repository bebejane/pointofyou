import { apiQuery } from 'next-dato-utils/api';
import { AllPressesDocument } from '@/graphql';
import s from './page.module.scss';
import Link from 'next/link';
import { Image } from 'react-datocms';
import Content from '@/components/common/Content';
import { DraftMode } from 'next-dato-utils/components';
import Article from '@/components/common/Article';
import { format } from 'date-fns';

export default async function PressPage() {
	const { allPresses, draftUrl } = await apiQuery<AllPressesQuery, AllPressesQueryVariables>(AllPressesDocument, { all: true });

	return (
		<>
			<Article title='Press' className={s.press}>
				<ul>
					{allPresses.map(({ id, title, slug, image, intro, _firstPublishedAt }) => (
						<li key={id}>
							<div>
								<span className='meta'>{format(new Date(_firstPublishedAt), 'MM/dd yyyy')}</span>
								<Link href={`/nyheter/press/${slug}`}>
									<h2>{title}</h2>
									<Content content={intro} />
								</Link>
							</div>
							<figure>{image && <Image data={image.responsiveImage} />}</figure>
						</li>
					))}
				</ul>
			</Article>
			<DraftMode url={draftUrl} />
		</>
	);
}
