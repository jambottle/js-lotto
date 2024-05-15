describe('로또 구입 금액은', () => {
  test('최소 1,000원 이상 입력해야 한다.', () => {
    // given: 최소 구입 금액을 충족하지 않는 금액 준비
    const NOT_ENOUGH_AMOUNT = 500;

    // when: 최소 구입 금액을 충족하지 않는 금액으로 로또 구입 시도
    const orderLotto = () => new LottoOrder(NOT_ENOUGH_AMOUNT);

    // then: 로또를 정상적으로 구매하였는지 확인
    expect(orderLotto).toThrow(
      '로또 구입 금액은 최소 1,000원 이상 입력되어야 합니다.'
    );
  });
});
