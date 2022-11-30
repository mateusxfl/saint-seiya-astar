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
      new House(21, 37, ariesDiff, 'Aries'),
      new House(17, 31, taurusDiff, 'Taurus'),
      new House(33, 31, geminiDiff, 'Gemini'),
      new House(26, 24, cancerDiff, 'Cancer'),
      new House(9, 24, leoDiff, 'Leo'),
      new House(9, 17, virgoDiff, 'Virgo'),
      new House(29, 17, libraDiff, 'Libra'),
      new House(37, 13, scorpiusDiff, 'Scorpius'),
      new House(27, 9, sagittariusDiff, 'Sagittarius'),
      new House(14, 9, capricornusDiff, 'Capricornus'),
      new House(13, 4, aquariusDiff, 'Aquarius'),
      new House(30, 4, piscesDiff, 'Pisces'),
    ];

    this.houses = houses;
  }

  public getHouses() {
    return this.houses;
  }
}

export default Sanctuary;
