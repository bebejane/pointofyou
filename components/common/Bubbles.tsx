"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import s from "./Bubbles.module.scss";
import cn from "classnames";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { useAudioStore } from "@/lib/audio-store";
import { usePathname } from "next/navigation";

export type BubblesProps = {};

const mockBubbles: any[] = [
	{
		id: "audio-bubble-1",
		file: {
			url: "https://www.datocms-assets.com/150385/1737726329-05-zum-wohl.mp3",
		} as FileField,
		text: "Bubbles",
		position: {
			left: 0,
			top: 0,
		},
	},
	{
		id: "audio-bubble-2",
		file: {
			url: "https://www.datocms-assets.com/150385/1737726329-05-zum-wohl.mp3",
		} as FileField,
		text: "Bubbles 2",
		position: {
			left: 0,
			top: 0,
		},
	},
	{
		id: "audio-bubble-3",
		file: {
			url: "https://www.datocms-assets.com/150385/1737726329-05-zum-wohl.mp3",
		} as FileField,
		text: "Bubbles 3",
		position: {
			left: 0,
			top: 0,
		},
	},
	{
		id: "audio-bubble-4",
		file: {
			url: "https://www.datocms-assets.com/150385/1737726329-05-zum-wohl.mp3",
		} as FileField,
		text: "Bubbles 4",
		position: {
			left: 0,
			top: 0,
		},
	},
	{
		id: "audio-bubble-5",
		file: {
			url: "https://www.datocms-assets.com/150385/1737726329-05-zum-wohl.mp3",
		} as FileField,
		text: "Bubbles 5",
		position: {
			left: 0,
			top: 0,
		},
	},
];

export default function Bubbles({}: BubblesProps) {
	const pathname = usePathname();
	const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
	const [bubbles, setBubbles] = useState(mockBubbles);

	useEffect(() => {
		const handleResize = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useLayoutEffect(() => {
		if (!dimensions) return;

		const { items } = generatePositions(10, dimensions, 30);

		setBubbles(
			bubbles.map((b, i) => ({
				...b,
				position: {
					left: items.find(({ id }) => id === b.id).left,
					top: items.find(({ id }) => id === b.id).top,
				},
			}))
		);
	}, [dimensions, pathname]);

	return (
		<section className={s.bubbles}>
			{bubbles.map((b) => (
				<Bubble
					key={b.id}
					{...b}
				/>
			))}
		</section>
	);
}

function Bubble({
	id,
	file,
	text,
	position,
}: {
	id: string;
	file: FileField;
	text: string;
	position: { left: number; top: number };
}) {
	const audio = useRef<HTMLAudioElement>(null);
	const [hover, setHover] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [loaded, setLoaded] = useState(false);

	function handleClick() {
		if (!audio.current) return;
		const allSounds = document.querySelectorAll<HTMLDivElement>(
			`[id^='audio-bubble-']:not([id='${id}'])`
		);
		allSounds.forEach((el) => {
			const a = el.querySelector<HTMLAudioElement>("audio");
			a.pause();
		});

		audio.current.paused ? audio.current.play() : audio.current.pause();
	}

	useEffect(() => {
		if (!audio.current) return;
		const a = audio.current;
		const handlePlaying = () => setPlaying(true);
		const handleEnded = () => {
			setPlaying(false);
			setHover(false);
		};
		const handlePause = () => {
			setPlaying(false);
			setHover(false);
		};

		a.addEventListener("ended", handleEnded);
		a.addEventListener("playing", handlePlaying);
		a.addEventListener("pause", handlePause);
		return () => {
			a.removeEventListener("ended", handleEnded);
			a.removeEventListener("playing", handlePlaying);
			a.removeEventListener("pause", handlePause);
		};
	}, [hover]);

	return (
		<div
			id={id}
			className={cn(s.bubble, hover && s.hover)}
			style={{ left: position.left, top: position.top }}
		>
			<img
				className={s.image}
				src='/images/bubble-small.svg'
				alt='bubble'
				onClick={handleClick}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => !playing && setHover(false)}
			/>
			<div className={s.text}>{text}</div>
			{!playing ? (
				<IoPlaySharp className={cn(s.icon, hover && s.show)} />
			) : (
				<IoPauseSharp className={cn(s.icon, hover && s.show)} />
			)}
			<audio
				ref={audio}
				src={file.url}
				controls={false}
				autoPlay={false}
			/>
		</div>
	);
}

const nodesToArray = (elements) => {
	elements = Array.isArray(elements) || elements instanceof NodeList ? elements : [elements];
	return Array.prototype.slice.call(elements, 0);
};

const generatePositions = (
	totalRetries = 0,
	dimensions: { width: number; height: number } = { width: 0, height: 0 },
	size = 30
) => {
	const targets = document.querySelectorAll(`[id^='audio-bubble-']`);
	const elements = nodesToArray(targets);
	const maxRetries = 10000;
	const symbolsPerPage = Math.floor(
		(Math.floor(dimensions.height / size) * Math.floor(dimensions.width / size)) / 2
	);
	const totalPages = Math.ceil(elements.length / symbolsPerPage);
	const maxCols = Math.floor(dimensions.width / size);
	const maxRows = symbolsPerPage / maxCols;
	const overflowSpace =
		(maxRows - (elements.length - symbolsPerPage * (totalPages - 1)) / maxCols) * size;
	const positions = { dimensions, items: [], totalHeight: 0 };
	const minX = 0;
	const maxX = dimensions.width - size * 2;
	const minY = 0;
	const maxY = dimensions.height - size * 2;

	const isOverlapping = (area) => {
		for (let i = 0; i < positions.items.length; i++) {
			const checkArea = positions.items[i];
			const rect1VerticalReach = area.top + area.height;
			const rect1HorizontalReach = area.left + area.width;
			const rect2VerticalReach = checkArea.top + checkArea.height;
			const rect2HorizontalReach = checkArea.left + checkArea.width;

			if (
				checkArea.top < rect1VerticalReach &&
				area.top < rect2VerticalReach &&
				checkArea.left < rect1HorizontalReach &&
				area.left < rect2HorizontalReach
			)
				return true;
			else continue;
		}
		return false;
	};

	for (let i = 0, page = 0; i < elements.length; i++) {
		const el = elements[i];
		let randX = 0;
		let randY = 0;
		let retries = 0;
		let pageMargin = page * dimensions.height;

		let area;

		do {
			randX = Math.round(minX + (maxX - minX) * (Math.random() % 1));
			randY = Math.round(
				minY +
					pageMargin +
					(maxY +
						pageMargin -
						(page + 1 === totalPages ? overflowSpace : 0) -
						(minY + pageMargin)) *
						Math.random()
			);
			area = {
				id: el.id,
				eventId: parseInt(el.getAttribute("eventid")),
				left: randX,
				top: randY,
				width: el.height,
				height: el.width,
			};
		} while (isOverlapping(area) && ++retries < maxRetries);

		if (retries >= maxRetries && totalRetries < 10) return generatePositions(++totalRetries);

		page = Math.floor((i + 1) / symbolsPerPage);

		positions.items.push(area);
		positions.totalHeight =
			positions.totalHeight < area.top + size ? area.top + size : positions.totalHeight;
	}
	if (totalRetries >= 10) console.log("failed to randomly position");
	return positions;
};
