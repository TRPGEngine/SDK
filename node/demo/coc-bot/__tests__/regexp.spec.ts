import { scRE } from '../regexp';

describe('regexp', () => {
  describe('match scRE', () => {
    test.each([
      ['.sc1/1d6', ['1', '1d6']],
      ['.sc 1/1d6', ['1', '1d6']],
      ['.sc 1/1d6 ', ['1', '1d6']],
      ['.sc 1/1d6 Any', ['1', '1d6']],
      ['.sc1/1d6 ', ['1', '1d6']],
      ['.sc1/1d6 Any', ['1', '1d6']],
    ])('%p', (input: string, groups: string[]) => {
      const [_, ...matches] = input.match(scRE);

      expect(matches).toEqual(groups);
    });
  });
});
