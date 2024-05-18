import LottoGame from '../src/domain/LottoGame';

describe('로또 게임의', () => {
  describe('당첨 번호와 보너스 번호를 입력할 때,', () => {
    test('당첨 번호 6개와 보너스 번호 1개가 중복되지 않으면, 게임을 시작할 수 있다.', () => {
      // given: 중복되지 않는 당첨 번호 6개와 보너스 번호 1개 준비
      const VALID_WINNING_NUMBERS = [1, 2, 3, 43, 44, 45];
      const VALID_BOUNS_NUMBER = 42;

      // when: 중복되지 않는 당첨 번호 6개와 보너스 번호 1개로 로또 게임 생성
      const lottoGame = new LottoGame(
        VALID_WINNING_NUMBERS,
        VALID_BOUNS_NUMBER
      );

      // then: 로또 게임이 정상적으로 생성되었는지 확인
      expect(LottoGame.WINNING_NUMBER_LENGTH).toBe(6);
      expect(lottoGame.winningNumbers.length).toBe(
        LottoGame.WINNING_NUMBER_LENGTH
      );

      // and: 로또 게임의 당첨번호와 보너스 번호가 정상적으로 할당되었는지 확인
      expect(lottoGame.winningNumbers).toEqual(VALID_WINNING_NUMBERS);
      expect(lottoGame.bonusNumber).toBe(VALID_BOUNS_NUMBER);
    });

    test('당첨 번호 6개에 중복된 번호가 포함되어 있으면, 게임을 시작할 수 없다.', () => {
      // given: 중복된 번호를 포함하고 있는 당첨 번호의 배열 준비
      const DUPLICATED_WINNING_NUMBERS = [1, 2, 3, 43, 44, 44];
      const RANDOM_BOUNS_NUMBER = 45;

      // when: 중복된 번호를 포함하고 있는 당첨 번호로 로또 게임 생성
      const createLottoGame = () =>
        new LottoGame(DUPLICATED_WINNING_NUMBERS, RANDOM_BOUNS_NUMBER);

      // then: 로또 게임이 정상적으로 생성되었는지 확인
      expect(createLottoGame).toThrow(
        '로또 게임의 당첨 번호끼리는 서로 중복될 수 없습니다.'
      );
    });

    test('보너스 번호가 당첨 번호 중 1개와 중복된다면, 게임을 시작할 수 없다.', () => {
      // given: 당첨 번호 중 1개와 중복되는 보너스 번호 준비
      const RANDOM_WINNING_NUMBERS = [1, 2, 3, 43, 44, 45];
      const DUPLICATED_BOUNS_NUMBER = 45;

      // when: 당첨 번호 중 1개와 중복되는 보너스 번호로 로또 게임 생성
      const createLottoGame = () =>
        new LottoGame(RANDOM_WINNING_NUMBERS, DUPLICATED_BOUNS_NUMBER);

      // then: 로또 게임이 정상적으로 생성되었는지 확인
      expect(createLottoGame).toThrow(
        '로또 게임의 보너스 번호는 당첨 번호와 중복될 수 없습니다.'
      );
    });
  });
});
