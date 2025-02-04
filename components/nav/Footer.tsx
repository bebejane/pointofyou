import { Menu } from "@/lib/menu";
import s from "./Footer.module.scss";
import Link from "next/link";
import Bubbles from "@/components/common/Bubbles";
import { SupportDocument } from "../../graphql";
import { apiQuery } from "next-dato-utils/api";
import SupportBubble from "./SupportBubble";

export default async function Footer({ menu }: { menu: Menu }) {
	const { support } = await apiQuery<SupportQuery, SupportQueryVariables>(SupportDocument);

	return (
		<>
			<footer className={s.footer}>
				<nav>
					<h2>Point of You</h2>
					<ul>
						{menu.map(({ id, title, sub }) => (
							<li key={id}>
								<div>{title}</div>
								{sub && (
									<ul>
										{sub.map(({ id, title, slug, href }) => (
											<li key={id}>
												<Link href={slug ?? href}>{title}</Link>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ul>
				</nav>
				<SupportBubble support={support} />
				<div className={s.copyright}>
					<span className={s.text}>
						Copyright Point of You 2024. Läs vår policy hur vi hanterar Cookies & GDPR.
					</span>
					<span className={s.about}>
						Ett projekt av Institutet för Framtidsstudier. &nbsp;
						<figure>
							<img
								src='/images/framtidsstudier.svg'
								alt='framtidsstudier'
							/>
						</figure>
					</span>
				</div>
			</footer>
			<Bubbles />
		</>
	);
}
