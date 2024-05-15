export default class Lotto {
  static PRICE = 1000;
  static NUMBER_LENGTH = 6;

  #numbers;

  constructor() {
    // 1) 임의의 로또 번호를 생성
    const numbers = this.generateRandomNumbers();

    // 2) 유효성 검사를 통과하면, #numbers에 할당
    this.#validateNumbers(numbers);
    this.#numbers = numbers;
  }

  // 번호 생성 method
  generateRandomNumbers() {
    const randomNumbers = [];

    while (randomNumbers.length < Lotto.NUMBER_LENGTH) {
      const number = Math.floor(Math.random() * 45) + 1;
      if (!randomNumbers.includes(number)) {
        randomNumbers.push(number);
      }
    }

    return randomNumbers;
  }

  // 유효성 검사 method
  #validateNumbers(numbers) {
    if (!Array.isArray(numbers)) {
      throw new Error('로또 번호는 배열 타입으로 입력되어야 합니다.');
    }
    if (numbers.length !== Lotto.NUMBER_LENGTH) {
      throw new Error('로또 번호는 6개의 숫자로 구성되어야 합니다.');
    }
    if (new Set(numbers).size !== Lotto.NUMBER_LENGTH) {
      throw new Error('로또 번호끼리는 서로 중복될 수 없습니다.');
    }
    if (!numbers.every(number => this.#isNumberValid(number))) {
      throw new Error('로또 번호에는 1~45 사이의 정수만 부여할 수 있습니다.');
    }
  }

  #isNumberValid(number) {
    if (!Number.isInteger(number)) {
      return false;
    }
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
