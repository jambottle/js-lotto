import { LOTTO_PRIZE } from '../src/constants/LottoGame.constants.js';
import Lotto from '../src/domain/Lotto.js';
import LottoGame from '../src/domain/LottoGame.js';

describe('로또 게임의', () => {
  describe('당첨 번호와 보너스 번호를 입력할 때,', () => {
    test('당첨 번호 6개와 보너스 번호 1개에는 1~45 사이의 정수만 부여할 수 있다.', () => {
      // given: 1~45 사이의 당첨 번호 6개와 보너스 번호 1개 준비
      const VALID_WINNING_NUMBERS = [1, 2, 3, 43, 44, 45];
      const VALID_BOUNS_NUMBER = 42;

      // when: 1~45 사이의 당첨 번호 6개와 보너스 번호 1개로 로또 게임 생성
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

    test('당첨 번호 6개에는 1~45 사이의 정수가 아닌 숫자를 하나라도 허용할 수 없다.', () => {
      // given: 1~45 사이의 정수가 아닌 숫자를 포함하고 있는 당첨 번호의 배열 준비
      const INVALID_WINNING_NUMBERS = [1, 2, 3, 43, 44, 46];
      const RANDOM_BOUNS_NUMBER = 45;

      // when: 1~45 사이의 정수가 아닌 숫자를 포함하고 있는 당첨 번호로 로또 게임 생성
      const createLottoGame = () =>
        new LottoGame(INVALID_WINNING_NUMBERS, RANDOM_BOUNS_NUMBER);

      // then: 로또 게임이 정상적으로 생성되었는지 확인
      expect(createLottoGame).toThrow(
        '로또 게임의 당첨 번호에는 1~45 사이의 정수만 부여할 수 있습니다.'
      );
    });

    test('보너스 번호에는 1~45 사이의 정수가 아닌 숫자를 허용할 수 없다.', () => {
      // given: 1~45 사이의 정수가 아닌 숫자에 해당하는 보너스 번호 준비
      const RANDOM_WINNING_NUMBERS = [1, 2, 3, 43, 44, 45];
      const INVALID_BOUNS_NUMBER = 46;

      // when: 1~45 사이의 정수가 아닌 숫자에 해당하는 보너스 번호로 로또 게임 생성
      const createLottoGame = () =>
        new LottoGame(RANDOM_WINNING_NUMBERS, INVALID_BOUNS_NUMBER);

      // then: 로또 게임이 정상적으로 생성되었는지 확인
      expect(createLottoGame).toThrow(
        '로또 게임의 보너스 번호에는 1~45 사이의 정수만 부여할 수 있습니다.'
      );
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

  describe('당첨 내역 및 수익률을 출력할 때,', () => {
    let lottoGame;

    beforeEach(() => {
      const RANDOM_WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
      const RANDOM_BONUS_NUMBER = 7;

      lottoGame = new LottoGame(RANDOM_WINNING_NUMBERS, RANDOM_BONUS_NUMBER);
    });

    test('당첨 번호가 6개 모두 일치하는 경우, 2,000,000,000원의 당첨금을 지급한다.', () => {
      // given: 당첨 번호가 6개 모두 일치하는 경우를 가정
      jest.spyOn(lottoGame, 'getPointByWinningNumbers').mockReturnValue(6);

      // when: 당첨금 계산
      const randomLotto = new Lotto();
      const randomLottoPrize = lottoGame.calculatePrize(randomLotto);

      // then: 당첨금 계산 결과가 2,000,000,000원인지 확인
      expect(LOTTO_PRIZE.FIRST).toBe(2000000000);
      expect(randomLottoPrize).toBe(LOTTO_PRIZE.FIRST);
    });

    test('당첨 번호 5개와 보너스 번호까지 일치하는 경우, 30,000,000원의 당첨금을 지급한다.', () => {
      // given: 당첨 번호 5개와 보너스 번호까지 일치하는 경우를 가정
      jest.spyOn(lottoGame, 'getPointByWinningNumbers').mockReturnValue(5);
      jest.spyOn(lottoGame, 'getIncludesBonusNumber').mockReturnValue(true);

      // when: 당첨금 계산
      const randomLotto = new Lotto();
      const randomLottoPrize = lottoGame.calculatePrize(randomLotto);

      // then: 당첨금 계산 결과가 30,000,000원인지 확인
      expect(LOTTO_PRIZE.SECOND).toBe(30000000);
      expect(randomLottoPrize).toBe(LOTTO_PRIZE.SECOND);
    });

    test('당첨 번호가 5개 일치하는 경우, 1,500,000원의 당첨금을 지급한다.', () => {
      // given: 당첨 번호가 5개 일치하는 경우를 가정
      jest.spyOn(lottoGame, 'getPointByWinningNumbers').mockReturnValue(5);
      jest.spyOn(lottoGame, 'getIncludesBonusNumber').mockReturnValue(false);

      // when: 당첨금 계산
      const randomLotto = new Lotto();
      const randomLottoPrize = lottoGame.calculatePrize(randomLotto);

      // then: 당첨금 계산 결과가 1,500,000원인지 확인
      expect(LOTTO_PRIZE.THIRD).toBe(1500000);
      expect(randomLottoPrize).toBe(LOTTO_PRIZE.THIRD);
    });

    test('당첨 번호가 4개 일치하는 경우, 50,000원의 당첨금을 지급한다.', () => {
      // given: 당첨 번호가 4개 일치하는 경우를 가정
      jest.spyOn(lottoGame, 'getPointByWinningNumbers').mockReturnValue(4);

      // when: 당첨금 계산
      const randomLotto = new Lotto();
      const randomLottoPrize = lottoGame.calculatePrize(randomLotto);

      // then: 당첨금 계산 결과가 50,000원인지 확인
      expect(LOTTO_PRIZE.FOURTH).toBe(50000);
      expect(randomLottoPrize).toBe(LOTTO_PRIZE.FOURTH);
    });

    test('당첨 번호가 3개 일치하는 경우, 5,000원의 당첨금을 지급한다.', () => {
      // given: 당첨 번호가 3개 일치하는 경우를 가정
      jest.spyOn(lottoGame, 'getPointByWinningNumbers').mockReturnValue(3);

      // when: 당첨금 계산
      const randomLotto = new Lotto();
      const randomLottoPrize = lottoGame.calculatePrize(randomLotto);

      // then: 당첨금 계산 결과가 5,000원인지 확인
      expect(LOTTO_PRIZE.FIFTH).toBe(5000);
      expect(randomLottoPrize).toBe(LOTTO_PRIZE.FIFTH);
    });

    test('당첨 번호가 2개 이하로 일치하는 경우, 당첨금을 지급하지 않는다.', () => {
      // given: 당첨 번호가 2개 이하로 일치하는 경우를 가정
      jest.spyOn(lottoGame, 'getPointByWinningNumbers').mockReturnValue(2);

      // when: 당첨금 계산
      const randomLotto = new Lotto();
      const randomLottoPrize = lottoGame.calculatePrize(randomLotto);

      // then: 당첨금 계산 결과가 0원인지 확인
      expect(LOTTO_PRIZE.NONE).toBe(0);
      expect(randomLottoPrize).toBe(LOTTO_PRIZE.NONE);
    });
  });
});
