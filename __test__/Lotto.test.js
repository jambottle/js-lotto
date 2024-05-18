import Lotto from '../src/domain/Lotto.js';

describe('로또 가격은', () => {
  test('1장당 1,000원이다.', () => {
    // then: 로또 가격이 1,000원지 확인
    expect(Lotto.PRICE).toBe(1000);
  });
});

describe('로또 번호는', () => {
  test('1장당 6개의 번호로 구성되며, 1~45 사이의 정수만 부여할 수 있다.', () => {
    // given: 1~45 사이의 정수 6개로 이루어진 배열 준비
    const VALID_NUMBERS = [1, 2, 3, 43, 44, 45];

    jest
      .spyOn(Lotto.prototype, 'generateRandomNumbers')
      .mockReturnValue(VALID_NUMBERS);

    // when: 1~45 사이의 정수 6개를 번호로 갖는 로또 발행 시도
    const lotto = new Lotto();
    const lottoNumbers = lotto.numbers;

    // then: 로또가 정상적으로 발행되었는지 확인
    expect(Lotto.NUMBER_LENGTH).toBe(6);
    expect(lottoNumbers.length).toBe(Lotto.NUMBER_LENGTH);

    // and: 로또 번호가 정상적으로 할당되었는지 확인
    expect(lottoNumbers).toEqual(VALID_NUMBERS);
  });

  test('1~45 사이의 정수가 아닌 숫자를 하나라도 허용할 수 없다.', () => {
    // given: 1~45 사이의 정수가 아닌 숫자를 포함한 배열 준비
    const INVALID_NUMBERS = [1, 2, 3, 43, 44, 46];

    jest
      .spyOn(Lotto.prototype, 'generateRandomNumbers')
      .mockReturnValue(INVALID_NUMBERS);

    // when: 1~45 사이의 정수가 아닌 숫자를 포함한 로또 발행 시도
    const createLotto = () => new Lotto();

    // then: 로또가 정상적으로 발행되었는지 확인
    expect(createLotto).toThrow(
      '로또 번호에는 1~45 사이의 정수만 부여할 수 있습니다.'
    );
  });

  test('1장당 6개의 숫자로 구성되지 않으면, 로또를 발행할 수 없다.', () => {
    // given: 6개의 번호를 충족하지 않는 배열 준비
    const NOT_ENOUGH_NUMBERS = [1, 2, 3];

    jest
      .spyOn(Lotto.prototype, 'generateRandomNumbers')
      .mockReturnValue(NOT_ENOUGH_NUMBERS);

    // when: 6개의 번호를 충족하지 않는 로또 발행 시도
    const createLotto = () => new Lotto();

    // then: 로또가 정상적으로 발행되었는지 확인
    expect(createLotto).toThrow('로또 번호는 6개의 숫자로 구성되어야 합니다.');
  });

  test('중복된 번호가 포함되어 있으면, 로또를 발행할 수 없다.', () => {
    // given: 중복된 번호를 포함하고 있는 배열 준비
    const DUPLICATED_NUMBERS = [1, 2, 3, 43, 44, 44];

    jest
      .spyOn(Lotto.prototype, 'generateRandomNumbers')
      .mockReturnValue(DUPLICATED_NUMBERS);

    // when: 중복된 번호를 포함하고 있는 로또 발행 시도
    const createLotto = () => new Lotto();

    // then: 로또가 정상적으로 발행되었는지 확인
    expect(createLotto).toThrow('로또 번호끼리는 서로 중복될 수 없습니다.');
  });
});
