// simple footer

import { Menu } from "../../lib/menu";
import s from "./Footer.module.scss";
import Link from "next/link";

export default function Footer({ menu }: { menu: Menu }) {
	return (
		<footer className={s.footer}>
			<nav>
				<h3>Point of You</h3>
				<ul>
					{menu.map(({ id, title, sub }) => (
						<li key={id}>
							<Link href={`#${id}`}>{title}</Link>
							{sub && (
								<ul>
									{sub.map(({ id, title, slug }) => (
										<li key={id}>
											<Link href={`#${slug}`}>{title}</Link>
										</li>
									))}
								</ul>
							)}
						</li>
					))}
				</ul>
			</nav>
			<div className={s.bubble}>
				<div className={s.wrap}>
					<div className={s.text}>
						<span>Vill du delta i vårt projekt?</span>
						<Link href='/kontakt'>Kontakta oss</Link>
					</div>
					<img
						src='/images/bubble.svg'
						alt='bubble'
					/>
				</div>
			</div>
			<div className={s.copyright}>
				<span className={s.text}>
					Copyright Point of You 2024. Läs vår policy hur vi hanterar Cookies & GDPR.
				</span>
				<span className={s.about}>
					Ett projekt av Institutet för Framtidsstudier. &nbsp;
					<img
						src='/images/framtidsstudier.svg'
						alt='framtidsstudier'
					/>
				</span>
			</div>
		</footer>
	);
}
