import { rabpRE, raRE, scRE } from '../regexp';

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

  describe('match rabpRE', () => {
    test.each([
      ['/rab5# 斗殴 格斗 50', ['5#', '斗殴', '格斗', ' 50']],
      ['/rab5# 斗殴 格斗', ['5#', '斗殴', '格斗', '']],
      ['/rab5# 取悦', ['5#', '取悦', undefined, '']],
      ['/rab 取悦 50', [undefined, '取悦', undefined, '50']],
      ['/rab 取悦', [undefined, '取悦', undefined, '']],
      // ['/rab 50', [undefined, '', undefined, '50']], // 暂不支持
    ])('%p', (input: string, groups: string[]) => {
      const [_, ...matches] = input.match(rabpRE);

      expect(matches).toEqual(groups);
    });
  });
});
