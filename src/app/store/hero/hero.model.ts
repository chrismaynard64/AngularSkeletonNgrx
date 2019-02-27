export interface Hero {
  id: number;
  name: string;
  description: string;
}

// for testing

export const generateHero = (idOverride?: number): Hero => ({
  id: idOverride || (Math.floor(Math.random() * 100) + 1),
  name: 'Test name',
  description: 'Test description'
});

export const generateHeroArray = (count = 10): Hero[] =>
  // Overwrite random id generation to prevent duplicate IDs:
  Array.apply(null, Array(count)).map((value, index) => generateHero(index + 1));

export const generateHeroMap = (
  HeroArray: Array<Hero> = generateHeroArray()
): { ids: Array<number>, entities: any } => ({
  entities: HeroArray.reduce(
    (HeroMap, Hero) => ({ ...HeroMap, [Hero.id]: Hero }),
    {}
  ),
  ids: HeroArray.map(Hero => Hero.id)
});

