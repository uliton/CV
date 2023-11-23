export enum Season {
  winter = 'winter',
  spring = 'spring',
  summer = 'summer',
  autumn = 'autumn',
}

type Module = {
  [key: string]: string;
}

export const getCurrentClassNames = (
  module: Module,
  className: string,
  season: string,
) => ({
  [module[className]]: true,
  [module[`${className}--winter`]]: season === Season.winter,
  [module[`${className}--spring`]]: season === Season.spring,
  [module[`${className}--summer`]]: season === Season.summer,
  [module[`${className}--autumn`]]: season === Season.autumn,
});
 