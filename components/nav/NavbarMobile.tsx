"use client";

import s from "./NavbarMobile.module.scss";
import cn from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MenuItem } from "@/lib/menu";
import Hamburger from "hamburger-react";

export type NavbarMobileProps = {
	menu: Menu;
};

export default function NavbarMobile({ menu }: NavbarMobileProps) {
	const path = usePathname();
	const qs = useSearchParams();
	const pathname = `${path}${qs.size > 0 ? `?${qs.toString()}` : ""}`;
	const selectedSubFromPathname = menu
		.map(({ sub }) => sub)
		.flat()
		.find(({ slug }) => pathname === slug)?.id;
	const defaultSelected =
		menu.find(({ sub }) => sub?.find(({ id }) => id === selectedSubFromPathname))?.id ?? null;
	const [selected, setSelected] = useState<string | null>(defaultSelected ?? null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
		setSelected(defaultSelected ?? null);
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
										<ul onClick={(e) => e.stopPropagation()}>
											{sub.map(({ id, title, href, slug }) => (
												<li
													key={id}
													className={cn(pathname.startsWith(slug) && s.active)}
												>
													<Link href={slug ?? href}>{title}</Link>
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
		</>
	);
}
