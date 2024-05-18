import Lotto from '../src/domain/Lotto.js';
import LottoOrder from '../src/domain/LottoOrder.js';

describe('로또 구입 금액을', () => {
  test('최소 1,000원 이상 입력하지 않으면, 금액에 해당하는 만큼 로또를 주문할 수 없다.', () => {
    // given: 최소 구입 금액을 충족하지 않는 금액 준비
    const NOT_ENOUGH_AMOUNT = 500;

    // when: 최소 구입 금액을 충족하지 않는 금액으로 로또 구입 시도
    const orderLotto = () => new LottoOrder(NOT_ENOUGH_AMOUNT);

    // then: 로또를 정상적으로 구매하였는지 확인
    expect(orderLotto).toThrow(
      '로또 구입 금액은 최소 1,000원 이상 입력되어야 합니다.'
    );
  });

  test('1,000원 단위로 입력하지 않으면, 금액에 해당하는 만큼 로또를 주문할 수 없다.', () => {
    // given: 1,000원 단위에 해당하지 않는 금액 준비
    const NOT_EXACT_AMOUNT = 1100;

    // when: 1,000원 단위에 해당하지 않는 금액으로 로또 구입 시도
    const orderLotto = () => new LottoOrder(NOT_EXACT_AMOUNT);

    // then: 로또를 정상적으로 구매하였는지 확인
    expect(orderLotto).toThrow(
      '로또 구입 금액은 1,000원 단위로 입력되어야 합니다.'
    );
  });

  test('1,000원 단위로 입력하면, 금액에 해당하는 만큼 로또를 발행해야 한다.', () => {
    // given: 1,000원 단위에 딱 맞는 금액 준비
    const RANDOM_QUANTITY = 4;
    const EXACT_AMOUNT = Lotto.PRICE * RANDOM_QUANTITY;

    // when: 1,000원 단위에 딱 맞는 금액으로 로또 구입 시도
    const order = new LottoOrder(EXACT_AMOUNT);
    const orderedLottos = order.lottos;

    // then: 금액에 해당하는 만큼 로또가 정상적으로 발행되었는지 확인
    expect(orderedLottos.length).toBe(RANDOM_QUANTITY);
    expect(orderedLottos.every(lotto => lotto instanceof Lotto)).toBe(true);
  });
});
