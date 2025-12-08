import React, { useMemo } from 'react'
import styles from './Snow.module.scss'
import SnowFlake1 from './SnowFlake1'
import SnowFlake2 from './SnowFlake2'
import SnowFlake3 from './SnowFlake3'
import SnowFlake4 from './SnowFlake4'
import SnowFlake5 from './SnowFlake5'
import SnowFlake6 from './SnowFlake6'

type Range = [number, number]

type Props = {
	count?: number // кількість сніжинок
	size?: Range // px
	speed?: Range // s
	drift?: Range // px (амплітуда хитання)
	opacity?: Range // 0..1
	blur?: Range // px
}

const rnd = (min: number, max: number) => Math.random() * (max - min) + min

export default function Snowfall({
	count = 70,
	size = [6, 10],
	speed = [8, 24],
	drift = [20, 60],
	opacity = [0.6, 1],
	blur = [0, 2.5],
}: Props) {
	const flakesComponents = useMemo(
		() => [
			SnowFlake1,
			SnowFlake2,
			SnowFlake3,
			SnowFlake4,
			SnowFlake5,
			SnowFlake6,
		],
		[]
	)

	const flakes = useMemo(() => {
		return Array.from({ length: count }).map((_, i) => {
			const Component = flakesComponents[i % flakesComponents.length]

			return {
				left: Math.random() * 100,
				delay: -rnd(0, speed[1]),
				s: rnd(size[0], size[1]),
				dur: rnd(speed[0], speed[1]),
				sway: rnd(drift[0], drift[1]),
				spin: Math.random() < 0.6 ? rnd(-40, 40) : rnd(-140, 140),
				op: rnd(opacity[0], opacity[1]),
				bl: rnd(blur[0], blur[1]),
				Component,
			}
		})
	}, [count, flakesComponents, size, speed, drift, opacity, blur])

	return (
		<div className={styles.snow} aria-hidden='true'>
			{flakes.map((f, i) => (
				<span
					key={i}
					className={styles.flake}
					style={
						{
							'--x': `${f.left}%`,
							'--size': `${f.s}px`,
							'--duration': `${f.dur}s`,
							'--delay': `${f.delay}s`,
							'--sway': `${f.sway}px`,
							'--spin': `${f.spin}deg`,
							'--opacity': f.op,
							'--blur': `${f.bl}px`,
						} as React.CSSProperties
					}
				>
					<span className={styles.drop}>
						<span className={styles.img}>
							<f.Component />
						</span>
					</span>
				</span>
			))}
		</div>
	)
}
