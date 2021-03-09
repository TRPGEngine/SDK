import _get from 'lodash/get';
import _sum from 'lodash/sum';

/**
 * 用于查找并计算COC7模板中技能对于
 * 根据专攻名找技能
 *
 * skillSubName 可以为空
 */
export function calSkillSumWithSubName(
  actorData: object,
  skillName: string,
  skillSubName?: string
): number {
  const result = Object.entries(actorData)
    // 过滤出所有技能数据
    .filter(([key]) => key.startsWith('skill-'))
    .find(([key, value]) => {
      if (key.includes(skillName)) {
        if (typeof skillSubName === 'string') {
          return _get(value, ['专攻']) === skillSubName;
        } else {
          return true;
        }
      }

      return false;
    });

  return _sum([0, _get(result, [1, '基础']), _get(result, [1, 'addedPoint'])]);
}
