import Lotto from './Lotto.js';

export default class LottoOrder {
  // 최소 구입 수량, 최소 구입 금액
  static MIN_QUANTITY = 1;
  static MIN_AMOUNT = Lotto.PRICE * LottoOrder.MIN_QUANTITY;

  #amount;

  constructor(amount) {
    // 유효성 검사를 통과하면, #amount에 할당
    this.#validateAmount(amount);
    this.#amount = amount;
  }

  // 유효성 검사 method
  #validateAmount(amount) {
    if (!Number.isInteger(amount)) {
      throw new Error('로또 구입 금액은 정수 타입으로 입력되어야 합니다.');
    }
    if (amount < LottoOrder.MIN_AMOUNT) {
      throw new Error('로또 구입 금액은 최소 1,000원 이상 입력되어야 합니다.');
    }
    if (amount % Lotto.PRICE !== 0) {
      throw new Error('로또 구입 금액은 1,000원 단위로 입력되어야 합니다.');
    }
  }
}
