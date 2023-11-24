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


const seasonVariables = {
  winter: {
    color: '#cb0058',
    bgColor: '#051223',
  },
  spring: {
    color: '',
    bgColor: '',
  },
  summer: {
    color: '',
    bgColor: '',
  },
  autumn: {
    color: '',
    bgColor: '',
  },
}

export const setMetaThemeColor = (season: Season) => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', seasonVariables[season].color);
    }
}