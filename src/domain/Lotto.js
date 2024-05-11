export default class Lotto {
  static PRICE = 1000;
  static NUMBER_LENGTH = 6;

  #numbers;

  constructor(numbers) {
    if (numbers.length !== Lotto.NUMBER_LENGTH) {
      throw new Error('로또 1장은 6개의 번호로 구성되어야 합니다.');
    }
    if (new Set(numbers).size !== Lotto.NUMBER_LENGTH) {
      throw new Error('로또 번호끼리는 서로 중복될 수 없습니다.');
    }
    if (!numbers.every(number => Lotto.isNumberValid(number))) {
      throw new Error('로또 번호에는 1~45 사이의 정수만 부여할 수 있습니다.');
    }
    this.#numbers = numbers;
  }

  static isNumberValid(number) {
    if (!Number.isInteger(number)) return false;
    return 1 <= number && number <= 45;
  }

  get numbers() {
    return this.#numbers;
  }

  // 동등 비교 method
  static isEqual(lotto1, lotto2) {
    if (!(lotto1 instanceof Lotto) || !(lotto2 instanceof Lotto)) {
      throw new Error('Lotto 인스턴스끼리만 비교할 수 있습니다.');
    }
    return lotto1.numbers.every(number => lotto2.numbers.includes(number));
  }
}
