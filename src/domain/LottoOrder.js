import Lotto from './Lotto.js';

export default class LottoOrder {
  // 최소 구입 수량, 최소 구입 금액
  static MIN_QUANTITY = 1;
  static MIN_AMOUNT = Lotto.PRICE * LottoOrder.MIN_QUANTITY;

  #amount;

  constructor(amount) {
    if (amount < LottoOrder.MIN_AMOUNT) {
      throw new Error('로또 구입 금액은 최소 1,000원 이상 입력되어야 합니다.');
    }
    this.#amount = amount;
  }
}
