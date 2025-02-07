"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import s from "./Bubbles.module.scss";
import cn from "classnames";
import { IoPlaySharp, IoPauseSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";

export type BubblesProps = {};

const bubbleSize = 42;
const bubbleScale = 2;
const bubbleSizeScaled = bubbleSize * bubbleScale;

export default function Bubbles({ }: BubblesProps) {
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

	useEffect(() => {
		if (!dimensions) return;

		const { items } = generatePositions(1000, dimensions, bubbleSize * bubbleScale);

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
			{bubbles.map((b, i) => (
				<Bubble
					key={b.id}
					index={i}
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
	index,
}: {
	id: string;
	file: FileField;
	text: string;
	position: { left: number; top: number };
	index: number;
}) {
	const audio = useRef<HTMLAudioElement>(null);
	const [hover, setHover] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const isOdd = index % 2 === 1;

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
			onClick={handleClick}
			style={
				{
					"--size": bubbleSizeScaled,
					"--scale": bubbleScale,
					width: bubbleSizeScaled,
					height: bubbleSizeScaled,
					left: position.left,
					top: position.top,
				} as any
			}
		>
			<svg
				className={s.image}
				width={bubbleSizeScaled}
				height={bubbleSizeScaled}
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => !playing && setHover(false)}
				transform={isOdd ? "rotate(90)" : undefined}
			>
				<path
					d='M25.8056 33.1282L25.518 33.035L25.2461 33.1673C22.9833 34.2691 20.4579 34.9021 17.7668 34.9021C8.32833 34.9021 0.75 27.3021 0.75 17.8261C0.75 8.35002 8.32833 0.75 17.7668 0.75C27.2052 0.75 34.7835 8.35002 34.7835 17.8261C34.7835 22.5833 32.8883 26.8502 29.7986 29.9336L29.5271 30.2046L29.5879 30.5833L30.2264 34.5608L25.8056 33.1282Z'
					stroke='#FFFCE4'
					stroke-width='1.5'
					transform-origin='center'
					vector-effect='non-scaling-stroke'
					transform={
						hover
							? `scale(${bubbleScale}) translate(${bubbleSize / 2} ${bubbleSize / 2})`
							: `scale(1) translate(${bubbleSize / 2} ${bubbleSize / 2})`
					}
				/>
			</svg>

			<div className={cn(s.icon, hover && s.show)}>
				{!playing ? <IoPlaySharp size={bubbleSize} /> : <IoPauseSharp size={bubbleSize} />}
			</div>
			<div className={s.text}>{text}</div>
			<audio
				ref={audio}
				src={file.url}
				controls={false}
				autoPlay={false}
			/>
		</div>
	);
}

const generatePositions = (
	totalRetries = 0,
	dimensions: { width: number; height: number } = { width: 0, height: 0 },
	size = bubbleSize
) => {
	const elements = Array.prototype.slice.call(
		document.querySelectorAll<HTMLDivElement>(`[id^='audio-bubble-']`),
		0
	);
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

	const isOverlapping = (area: { top: number; left: number; width: number; height: number }) => {
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
				left: randX,
				top: randY,
				width: el.getBoundingClientRect().width,
				height: el.getBoundingClientRect().height,
			};
		} while (isOverlapping(area) && ++retries < maxRetries);

		if (retries >= maxRetries && totalRetries < 10)
			return generatePositions(++totalRetries, dimensions, size);

		page = Math.floor((i + 1) / symbolsPerPage);

		positions.items.push(area);
		positions.totalHeight =
			positions.totalHeight < area.top + size ? area.top + size : positions.totalHeight;
	}
	if (totalRetries >= 10) console.log("failed to randomly position");
	return positions;
};

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
