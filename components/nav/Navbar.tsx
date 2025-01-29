"use client";

import s from "./Navbar.module.scss";
import cn from "classnames";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MenuItem } from "@/lib/menu";

export type NavbarProps = {
	menu: Menu;
};

export default function Navbar({ menu }: NavbarProps) {
	const pathname = usePathname();
	const [selected, setSelected] = useState<string | null>(null);
	const sub = menu.find(({ id }) => id === selected)?.sub;
	const contact = menu.find(({ id }) => id === "contact");

	return (
		<>
			<nav className={s.navbar}>
				<figure className={s.logo}>
					<Link href={"/"}>
						<img
							src='/images/logo.svg'
							alt='Logo'
						/>
					</Link>
				</figure>

				<ul className={s.menu}>
					{menu
						.filter(({ id }) => id !== "contact")
						.map(({ id, title, href, slug, sub }) => (
							<li
								key={id}
								className={cn(s.item, pathname.startsWith(slug) && s.active)}
								onMouseEnter={() => setSelected(id)}
							>
								{title}
							</li>
						))}
				</ul>
				<ul className={s.contact}>
					<li>
						<Link href={"/kontakt"}>{contact.title}</Link>
					</li>
					<li>
						<Link href={"/english"}>EN</Link>
					</li>
				</ul>
			</nav>
			<nav
				className={cn(s.sub, sub && s.open)}
				onMouseLeave={() => setSelected(null)}
			>
				<ul>
					{sub?.map(({ id, title, href, slug }) => (
						<li key={id}>
							<Link href={slug ?? href}>{title}</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
