import House from './House';

class Sanctuary {
  private houses: House[];

  constructor(housesDifficulty: number[]) {
    const [
      ariesDiff = 50,
      taurusDiff = 55,
      geminiDiff = 60,
      cancerDiff = 70,
      leoDiff = 75,
      virgoDiff = 80,
      libraDiff = 85,
      scorpiusDiff = 90,
      sagittariusDiff = 95,
      capricornusDiff = 100,
      aquariusDiff = 110,
      piscesDiff = 120,
    ] = housesDifficulty;

    const houses = [
      new House(37, 21, ariesDiff, 'Aries'),
      new House(31, 17, taurusDiff, 'Taurus'),
      new House(31, 33, geminiDiff, 'Gemini'),
      new House(24, 26, cancerDiff, 'Cancer'),
      new House(24, 9, leoDiff, 'Leo'),
      new House(17, 9, virgoDiff, 'Virgo'),
      new House(17, 29, libraDiff, 'Libra'),
      new House(13, 37, scorpiusDiff, 'Scorpius'),
      new House(9, 27, sagittariusDiff, 'Sagittarius'),
      new House(9, 14, capricornusDiff, 'Capricornus'),
      new House(4, 13, aquariusDiff, 'Aquarius'),
      new House(4, 30, piscesDiff, 'Pisces'),
    ];

    this.houses = houses;
  }

  public getHouses() {
    return this.houses;
  }
}

export default Sanctuary;
