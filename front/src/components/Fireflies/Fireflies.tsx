import React, { useMemo, useEffect, useState } from 'react'
import classNames from 'classnames'
import style from './Fireflies.module.scss'

type Props = {
	count?: number
	active?: boolean
}

export const Fireflies: React.FC<Props> = ({ count = 44, active = true }) => {
	const flies = useMemo(() => {
		return Array.from({ length: count }, (_, i) => ({
			id: i,
			x: Math.random() * 100, // left: %
			y: Math.random() * 100, // top: %
			delay: Math.random() * 4, // s
			blink: 3.5 + Math.random() * 2.5, // 3.5–6s (мерехтіння)
			drift: 10 + Math.random() * 6, // 10–16s (повільний дрейф)
			alpha: 0.85 + Math.random() * 0.25, // пікова яскравість
		}))
	}, [count])

	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		const id = requestAnimationFrame(() => setMounted(true))
		return () => cancelAnimationFrame(id)
	}, [])

	return (
		<div
			className={classNames(
				style.fireflies,
				mounted && (active ? style['fireflies--on'] : undefined)
			)}
			aria-hidden='true'
		>
			{flies.map(f => (
				<span
					key={f.id}
					className={style.fly}
					style={{
						left: `${f.x}%`,
						top: `${f.y}%`,
						['--delay' as any]: `${f.delay}s`,
						['--blink' as any]: `${f.blink}s`,
						['--drift' as any]: `${f.drift}s`,
						['--alpha' as any]: `${f.alpha}`,
					}}
				/>
			))}
		</div>
	)
}
