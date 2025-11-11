// src/components/Leaves.tsx
import React, { useMemo } from 'react'
import leaf1 from './1.svg'
import leaf2 from './2.svg'
import leaf3 from './3.svg'
import styles from './Leaves.module.scss'

type LeavesProps = {
	count?: number
	speed?: [number, number] // діапазон тривалості падіння (сек)
	size?: [number, number] // діапазон розмірів (px)
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

export const Leaves: React.FC<LeavesProps> = ({
	// images,
	count = 44,
	speed = [24, 32],
	size = [6, 12],
}) => {
  const images = [leaf1, leaf2, leaf3]
	const leaves = useMemo(() => {
		return Array.from({ length: count }, (_, i) => {
			const img = images[i % images.length]
			return {
				img,
				left: Math.round(Math.random() * 100), // у відсотках ширини
				delay: rand(-8, 0), // негативна — щоб одразу були в кадрі
				dur: rand(speed[0], speed[1]),
				sway: rand(2.5, 5), // хитання в сторони
				spin: rand(6, 18), // обертання
				size: Math.round(rand(size[0], size[1])),
			}
		})
	}, [images, count, speed, size])

	return (
		<div className={styles.leaves} aria-hidden>
			{leaves.map((l, idx) => (
				<span
					key={idx}
					className={styles.leaf}
					style={
						{
							left: `${l.left}%`,
							animationDelay: `${l.delay}s`,
							animationDuration: `${l.dur}s`,
							// кастомні змінні для внутрішніх анімацій
							['--sway' as any]: `${l.sway}s`,
							['--spin' as any]: `${l.spin}s`,
						} as React.CSSProperties
					}
				>
					<i className={styles.leafSway}>
						<b
							className={styles.leafImg}
							style={{
								width: `${l.size}px`,
								height: `${l.size}px`,
								backgroundImage: `url(${l.img})`,
							}}
						/>
					</i>
				</span>
			))}
		</div>
	)
}

export default Leaves
