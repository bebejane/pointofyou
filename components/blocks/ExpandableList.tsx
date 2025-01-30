"use client";

import s from "./ExpandableList.module.scss";
import cn from "classnames";
import { useState } from "react";
import Content from "../common/Content";

export type ExpandableListProps = {
	data: ExpandableListRecord;
};
export default function ExpandableList({ data }: ExpandableListProps) {
	const [open, setOpen] = useState<{ [id: string]: boolean }>({});

	function toggle(id: string) {
		setOpen((state) => ({ ...state, [id]: state[id] ? false : true }));
	}

	console.log(data.items);
	return (
		<ul className={s.list}>
			{data.items?.map((item) => (
				<li
					key={item.id}
					onClick={() => toggle(item.id)}
				>
					<div className={s.item}>
						<div className={s.title}>{item.title}</div>
						<div className={s.icon}>+</div>
					</div>

					<Content
						content={item.text}
						className={cn(s.text, open[item.id] && s.open)}
					/>
				</li>
			))}
		</ul>
	);
}
