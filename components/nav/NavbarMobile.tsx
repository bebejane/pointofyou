"use client";

import s from "./NavbarMobile.module.scss";
import cn from "classnames";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MenuItem } from "@/lib/menu";
import Hamburger from "hamburger-react";

export type NavbarMobileProps = {
	menu: Menu;
};

export default function NavbarMobile({ menu }: NavbarMobileProps) {
	const pathname = usePathname();
	const [selected, setSelected] = useState<string | null>(null);
	const [open, setOpen] = useState(false);
	const sub = menu.find(({ id }) => id === selected)?.sub;

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	return (
		<>
			<div className={cn(s.topbar, open && s.open)}>
				<figure className={s.logo}>
					<Link href={"/"}>
						<img
							src={open ? "/images/logo-white.svg" : "/images/logo.svg"}
							alt='Logo'
						/>
					</Link>
				</figure>
				<div className={s.close}>
					<Hamburger
						toggled={open}
						color={open ? "white" : "black"}
						onToggle={(state) => setOpen(state)}
					/>
				</div>
			</div>
			<nav className={cn(s.navbar, open && s.open)}>
				<ul className={s.menu}>
					{menu.map(({ id, title, href, slug, sub }) => (
						<li
							key={id}
							className={cn(sub && s.dropdown, pathname.startsWith(slug) && s.active)}
							onClick={() => setSelected(selected === id ? null : id)}
						>
							{sub && (
								<>
									<span>{title}</span>
									{selected === id && (
										<ul>
											{sub.map(({ id, title, href, slug }) => (
												<li key={id}>
													<Link
														href={slug ?? href}
														onClick={() => setSelected(null)}
													>
														{title}
													</Link>
												</li>
											))}
										</ul>
									)}
								</>
							)}
							{!sub && <Link href={slug ?? href}>{title}</Link>}
						</li>
					))}
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
							<Link
								href={slug ?? href}
								onClick={() => setSelected(null)}
							>
								{title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
