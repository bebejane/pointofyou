"use client";

import s from "./FilterBar.module.scss";
import cn from "classnames";
import { useOptimistic } from "react";
import Link from "next/link";

type Props = {
	value: string;
	href: string;
	options: {
		id: string;
		label: string;
	}[];
};

export default function FilterBar({ options, href, value }: Props) {
	return (
		<nav className={cn(s.filter, s.show)}>
			<div className={s.show}>Visa:</div>
			<ul>
				{options.map(({ id, label }, idx) => (
					<li key={idx}>
						<Link href={`${href}?filter=${id}`}>
							<button data-selected={value === id}>{label}</button>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
