import React, { useMemo } from 'react'
import snowflake1 from './1.svg'
import snowflake2 from './2.svg'
import snowflake3 from './3.svg'
import snowflake4 from './4.svg'
import snowflake5 from './5.svg'
import snowflake6 from './6.svg'
import styles from './Snow.module.scss'

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
	const images = [
		snowflake1,
		snowflake2,
		snowflake3,
		snowflake4,
		snowflake5,
		snowflake6,
	]
	const flakes = useMemo(() => {
		return Array.from({ length: count }).map((_, i) => {
			const left = Math.random() * 100 // %
			const delay = -rnd(0, speed[1]) // негативна — щоб було «розсіяно» з першого кадру
			const s = rnd(size[0], size[1]) // px
			const dur = rnd(speed[0], speed[1]) // s
			const sway = rnd(drift[0], drift[1]) // px
			const spin = Math.random() < 0.6 ? rnd(-40, 40) : rnd(-140, 140) // deg
			const op = rnd(opacity[0], opacity[1])
			const bl = rnd(blur[0], blur[1])
			const img = images[i % images.length]
			return { left, delay, s, dur, sway, spin, op, bl, img }
		})
	}, [count, images, size, speed, drift, opacity, blur])

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
							'--img': `url("${f.img}")`,
						} as React.CSSProperties
					}
				>
					<span className={styles.drop}>
						<span className={styles.img} />
					</span>
				</span>
			))}
		</div>
	)
}
