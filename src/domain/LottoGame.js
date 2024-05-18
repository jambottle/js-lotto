export default class LottoGame {
  static WINNING_NUMBER_LENGTH = 6;

  // 당첨 번호, 보너스 번호
  #winningNumbers = [];
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#validateWinningNumbers(winningNumbers);
    this.#validateBonusNumber(winningNumbers, bonusNumber);

    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  // 유효성 검사 method - 당첨 번호
  #validateWinningNumbers(winningNumbers) {
    if (!Array.isArray(winningNumbers)) {
      throw new Error(
        '로또 게임의 당첨 번호는 배열 타입으로 입력되어야 합니다.'
      );
    }
    if (winningNumbers.length !== LottoGame.WINNING_NUMBER_LENGTH) {
      throw new Error(
        '로또 게임의 당첨 번호는 6개의 숫자로 구성되어야 합니다.'
      );
    }
    if (new Set(winningNumbers).size !== LottoGame.WINNING_NUMBER_LENGTH) {
      throw new Error('로또 게임의 당첨 번호끼리는 서로 중복될 수 없습니다.');
    }
  }

  // 유효성 검사 method - 보너스 번호
  #validateBonusNumber(winningNumbers, bonusNumber) {
    if (!Number.isInteger(bonusNumber)) {
      throw new Error(
        '로또 게임의 보너스 번호는 정수 타입으로 입력되어야 합니다.'
      );
    }
    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(
        '로또 게임의 보너스 번호는 당첨 번호와 중복될 수 없습니다.'
      );
    }
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}
