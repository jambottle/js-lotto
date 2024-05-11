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

  test('1~45 사이의 정수만 부여할 수 있다.', () => {
    // given: 1~45 사이의 정수 6개로 이루어진 배열 준비
    const VALID_NUMBERS = [1, 2, 3, 43, 44, 45];

    // when: 1~45 사이의 정수 6개를 번호로 갖는 로또 발행 시도
    const lotto = new Lotto(VALID_NUMBERS);
    const lottoNumbers = lotto.numbers;

    // then: 로또가 정상적으로 발행되었는지 확인
    expect(lottoNumbers.length).toBe(Lotto.NUMBER_LENGTH);
  });

  test('1~45 사이의 정수가 아닌 숫자를 하나라도 허용할 수 없다.', () => {
    // given: 1~45 사이의 정수가 아닌 숫자를 포함한 배열 준비
    const INVALID_NUMBERS = [1, 2, 3, 43, 44, 46];

    // when: 1~45 사이의 정수가 아닌 숫자를 포함한 로또 발행 시도
    const createLotto = () => new Lotto(INVALID_NUMBERS);

    // then: 로또가 정상적으로 발행되었는지 확인
    expect(createLotto).toThrow(
      '로또 번호에는 1~45 사이의 정수만 부여할 수 있습니다.'
    );
  });
});
