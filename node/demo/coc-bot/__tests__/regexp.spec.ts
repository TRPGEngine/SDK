import { raRE, scRE } from '../regexp';

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

  describe('match raRE', () => {
    test.each([
      ['/ra格斗 斗殴', ['格斗', '斗殴']],
      ['/ra 格斗 斗殴', ['格斗', '斗殴']],
      ['/ra格斗-斗殴', ['格斗', '斗殴']],
      ['/ra 格斗-斗殴', ['格斗', '斗殴']],
      ['/ra格斗:斗殴', ['格斗', '斗殴']],
      ['/ra 格斗:斗殴', ['格斗', '斗殴']],
      ['/ra 格斗:斗殴 Any', ['格斗', '斗殴']],
      ['/ra 取悦', ['取悦', undefined]],
      ['/ra取悦', ['取悦', undefined]],
      ['/ra取悦  Any', ['取悦', undefined]],
    ])('%p', (input: string, groups: string[]) => {
      const [_, ...matches] = input.match(raRE);

      expect(matches).toEqual(groups);
    });
  });
});
