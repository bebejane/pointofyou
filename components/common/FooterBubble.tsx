"use client";

import { useState } from "react";
import s from "./FooterBubble.module.scss";
import Link from "next/link";
import Modal from "./Modal";

export type FooterBubbleProps = {
	support: SupportQuery["support"];
};

export default function FooterBubble({ support }: FooterBubbleProps) {
	const [showPopup, setShowPopup] = useState(false);
	if (!support) return null;
	return (
		<>
			<div className={s.bubble}>
				<div
					className={s.wrap}
					onClick={() => setShowPopup(true)}
				>
					<div className={s.text}>
						<span>{support.title}</span>
					</div>
					<img
						src='/images/bubble.svg'
						alt='bubble'
					/>
				</div>
			</div>
			{showPopup && (
				<Modal>
					<div className={s.popup}>
						<div className={s.box}>
							hej
							<button onClick={() => setShowPopup(false)}>Close</button>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}
