import Lotto from '../src/domain/Lotto.js';

describe('로또 가격은', () => {
  test('1장당 1,000원이다.', () => {
    // then: 로또 가격이 1,000원지 확인
    expect(Lotto.PRICE).toBe(1000);
  });
});

describe('로또 번호는', () => {
  test('1장당 6개의 숫자로 구성된다.', () => {
    // then: 로또 번호가 6개인지 확인
    expect(Lotto.NUMBER_LENGTH).toBe(6);
  });
});
