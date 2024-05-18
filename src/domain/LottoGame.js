import Lotto from './Lotto.js';
import { LOTTO_PRIZE } from '../constants/LottoGame.constants.js';

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
    if (!winningNumbers.every(number => Lotto.isNumberValid(number))) {
      throw new Error(
        '로또 게임의 당첨 번호에는 1~45 사이의 정수만 부여할 수 있습니다.'
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
    if (!Lotto.isNumberValid(bonusNumber)) {
      throw new Error(
        '로또 게임의 보너스 번호에는 1~45 사이의 정수만 부여할 수 있습니다.'
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

  // 당첨금 계산 method
  calculatePrize(lotto) {
    const point = this.getPointByWinningNumbers(lotto);

    if (point === 6) {
      return LOTTO_PRIZE.FIRST;
    }
    if (point === 5) {
      const includesBonusNumber = this.getIncludesBonusNumber(lotto);
      return includesBonusNumber ? LOTTO_PRIZE.SECOND : LOTTO_PRIZE.THIRD;
    }
    if (point === 4) {
      return LOTTO_PRIZE.FOURTH;
    }
    if (point === 3) {
      return LOTTO_PRIZE.FIFTH;
    }
    return LOTTO_PRIZE.NONE;
  }

  // 당첨 번호 일치 개수 확인 method
  getPointByWinningNumbers(lotto) {
    const lottoNumbers = lotto.numbers;
    return this.#winningNumbers.filter(e => lottoNumbers.includes(e)).length;
  }

  // 보너스 번호 일치 여부 확인 method
  getIncludesBonusNumber(lotto) {
    const lottoNumbers = lotto.numbers;
    return lottoNumbers.includes(this.#bonusNumber);
  }
}
