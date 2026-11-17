import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import { SeasonContext } from '../../context/season'
import { WorkComponents, getCurrentComponent } from '../../functions/components';
import { getCurrentClassNames } from '../../styles/functions';
import style from './Work.module.scss';

type Props = {};

export const Work: React.FC<Props> = () => {
  const season = useContext(SeasonContext)

  const buttons = Object.values(WorkComponents);
  const [button, setButton] = useState<WorkComponents>(WorkComponents.portfolio);

  return (
		<main
			className={classNames(
				'container',
				getCurrentClassNames(style, 'work', season)
			)}
		>
			<div className={style['button-bar']}>
				{buttons.map((btn, i) => (
					<button
						key={i}
						type='button'
						className={classNames({
							[style.button]: true,
							[style['button--active']]: button === btn,
						})}
						onClick={() => setButton(btn)}
					>
						{btn}
					</button>
				))}
			</div>

			<div className={style['viewport']}>
				{getCurrentComponent(button)}
			</div>
		</main>
	)
};
