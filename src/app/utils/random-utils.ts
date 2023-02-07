import ArrayUtils from './array-utils';

export default class RandomUtils {
  arrayUtils: any;

  constructor() {
    this.arrayUtils = new ArrayUtils();
  }

  shuffle(array: any) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  /**
   * @param {number} min
   * @param {number} max
   * @returns a random number between min (included) and max (excluded)
   */
  getRandomInteger(min: any, max: any) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getRandomIndex(array: any) {
    return this.getRandomInteger(0, array.length);
  }

  getRandomElement(array: any) {
    return array[this.getRandomIndex(array)];
  }

  getRandomElements(array: any, numberOfElements: any) {
    let indexes = this.arrayUtils.getIndexesFromSize(array.length);

    this.shuffle(indexes);

    let selected = indexes.filter((e: any, i: any) => i < numberOfElements);

    return selected.map((el: any) => array[el]);
  }

  getRandomLevel(
    lines: any,
    columns: any,
    hole: number = 6,
    wumpu: number = 3,
    gold: number = 3
  ) {
    let positions = this.arrayUtils.getIndexes(lines, columns);

    positions = this.arrayUtils.removeByValues(positions, [[0, 0]]);
    positions = this.arrayUtils.removeByValues(positions, [[0, 1]]);
    positions = this.arrayUtils.removeByValues(positions, [[1, 0]]);
    positions = this.arrayUtils.removeByValues(positions, [[1, 1]]);

    let holes = this.getRandomElements(positions, hole);
    positions = this.arrayUtils.removeByValues(positions, holes);

    let wumpus = this.getRandomElements(positions, wumpu);
    positions = this.arrayUtils.removeByValues(positions, wumpus);

    let golds = this.getRandomElements(positions, gold);
    positions = this.arrayUtils.removeByValues(positions, golds);

    return { holes, wumpus, golds };
  }
}
