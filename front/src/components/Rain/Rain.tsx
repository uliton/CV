import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import style from './Rain.module.scss'

type Props = {
	count?: number // скільки крапель
	tilt?: number // кут нахилу
	onMs?: number // тривалість дощу
	offMs?: number // тривалість паузи
}

export const Rain: React.FC<Props> = ({
	count = 50,
	tilt = -4,
	onMs = 15000,
	offMs = 30000,
}) => {
	// генеруємо краплі один раз
	const drops = useMemo(() => {
		const step = 100 / count
		return Array.from({ length: count }, (_, i) => {
			const jitter = Math.random() * step * 0.6
			return {
				id: i,
				left: i * step + jitter, // vw
				delay: Math.random() * 2, // s
				duration: 2 + Math.random(), // 2–3s
				scale: 0.8 + Math.random() * 0.5,
			}
		})
	}, [count])

	const [active, setActive] = useState(true) // дощ
	const [showSun, setShowSun] = useState(false) // промені

	useEffect(() => {
		let tRainOff: any
		let tRainOn: any
		let tSunStart: any
		let tSunStop: any
		let stopped = false

		const loop = () => {
			// 1) вмикаємо дощ
			setActive(true)
			setShowSun(false)

			// 2) за 2–3с до кінця дощу вмикаємо сонце
			const sunLead = 2000 + Math.random() * 1000 // 2–3с
			const sunStartAt = Math.max(onMs - sunLead, 0)

			tSunStart = setTimeout(() => {
				setShowSun(true)
			}, sunStartAt)

			// 3) вимикаємо дощ
			tRainOff = setTimeout(() => {
				setActive(false)

				// 4) сонце ще світить майже всю паузу, але на 5–7с менше
				const sunTail = 5000 + Math.random() * 2000 // 5–7с
				const sunTotalShow = offMs - sunTail
				if (sunTotalShow > 0) {
					tSunStop = setTimeout(() => {
						setShowSun(false)
					}, sunTotalShow)
				} else {
					// якщо offMs дуже малий — одразу ховаємо
					setShowSun(false)
				}

				// 5) через offMs — новий цикл
				tRainOn = setTimeout(() => {
					if (!stopped) loop()
				}, offMs)
			}, onMs)
		}

		loop()

		return () => {
			stopped = true
			clearTimeout(tRainOff)
			clearTimeout(tRainOn)
			clearTimeout(tSunStart)
			clearTimeout(tSunStop)
		}
	}, [onMs, offMs])

	return (
		<>
			{/* Дощ */}
			<div
				className={classNames(style.rain, !active && style['rain--off'])}
				aria-hidden='true'
			>
				{drops.map(d => (
					<span
						key={d.id}
						className={style.drop}
						style={{
							left: `${d.left}vw`,
							transform: `rotate(${tilt}deg) scale(${d.scale})`,
							['--delay' as any]: `${d.delay}s`,
							['--duration' as any]: `${d.duration}s`,
						}}
					>
						<i />
					</span>
				))}
			</div>

			{/* Сонячні промені */}
			<div
				className={classNames(style.sun, showSun && style['sun--show'])}
				aria-hidden='true'
			>
				<i className={style.rays} />
			</div>
		</>
	)
}
