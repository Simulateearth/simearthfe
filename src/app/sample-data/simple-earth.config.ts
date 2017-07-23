export const simpleEarthConfig = {
  interval: 300,
  state: {
    currentStep: 0,
    date: new Date(),
    population: 7500000000,
    dailyDeathRate: 0.999979787,
    dailyBirthRate: 1.000048,
    meteoriteProbability: 1000 /* 1 of x days */,
    meteoriteDeathRate: 0.5,
    meteoriteRisingProbabilityRate: 0.99,
    forestSurface: 39991000,
    deforestationRate: 0.999997649,
    dailyTotalBirths: 0
  },
  effects: [
    {
      title: 'daily total Births',
      change: 'dailyTotalBirths',
      expression: 'population * (1 - dailyBirthRate) * -1'
    },
    {
      title: 'death',
      change: 'population',
      factorReference: 'dailyDeathRate',
    },
    {
      title: 'birth',
      change: 'population',
      factorReference: 'dailyBirthRate',
    },
    {
      title: 'meteorite',
      change: 'population',
      factorReference: 'meteoriteDeathRate',
      probabilityReference: 'meteoriteProbability'
    },
    {
      title: 'more meteorites',
      change: 'meteoriteProbability',
      factorReference: 'meteoriteRisingProbabilityRate',
    },
    {
      title: 'deforestation',
      change: 'forestSurface',
      factorReference: 'deforestationRate',
    }
  ]
};
