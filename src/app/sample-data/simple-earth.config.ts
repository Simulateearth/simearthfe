export const simpleEarthConfig = {
        interval: 300,
        state: {
          currentStep: 0,
          population: 7500000000,
          dailyDeathRate: 0.999979787,
          dailyBirthRate: 1.000048,
          meteoriteProbability: 1000 /* 1 of x days */,
          meteoriteDeathRate: 0.5,
          meteoriteRisingProbabilityRate: 0.99
        },
        effects: [
          {
            title: 'death',
            change: 'population',
            factorReference: 'dailyDeathRate',
            probability: 1
          },
          {
            title: 'birth',
            change: 'population',
            factorReference: 'dailyBirthRate',
            probability: 1
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
            probability: 1
          }
        ]
      };