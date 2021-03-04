import { calSkillSumWithSubName } from '../utils';

describe('calSkillSumWithSubName', () => {
  const testActorData: any = {
    CR: 0,
    SAN: 50,
    _name: '测试人物卡',
    乔装: 5,
    会计: null,
    估价: 5,
    体型: 55,
    体质: 45,
    侦查: 25,
    催眠: null,
    力量: 65,
    医学: null,
    历史: null,
    取悦: 15,
    外貌: 60,
    妙手: 10,
    导航: 10,
    幸运: 45,
    急救: null,
    恐吓: 15,
    意志: 45,
    投掷: 20,
    攀爬: 20,
    敏捷: 50,
    教育: 60,
    时代: '现代',
    智力: 85,
    母语: 60,
    法律: null,
    游泳: 20,
    潜水: 1,
    潜行: 20,
    炮术: 1,
    爆破: 1,
    聆听: 20,
    话术: 5,
    说服: 10,
    读唇: 1,
    跳跃: 20,
    追踪: 10,
    锁匠: 1,
    闪避: 25,
    骑术: 5,
    武器1: { 武器信息: null },
    武器2: { 武器信息: null },
    武器3: { 武器信息: null },
    武器4: { 武器信息: null },
    武器5: { 武器信息: null },
    CurrFund: {
      range: [-100, 1],
      desc: '身无分文',
      cash: '10',
      other: '0',
      level: '10',
    },
    人类学: 1,
    博物学: null,
    心理学: 10,
    电子学: null,
    神秘学: null,
    考古学: null,
    信用评级: 0,
    动物驯养: 5,
    机械维修: 10,
    汽车驾驶: 20,
    电气维修: 10,
    精神分析: null,
    精神状态: '神志清醒',
    身体状态: '健康',
    克苏鲁神话: null,
    图书馆使用: 20,
    当前生命值: 10,
    最大生命值: 10,
    计算机使用: 5,
    'skill-信用评级': { 基础: 0, addedPoint: 0 },
    'skill-取悦': { 基础: 15, addedPoint: 0 },
    'skill-话术': { 基础: 5, addedPoint: 0 },
    'skill-恐吓': { 基础: 15, addedPoint: 0 },
    'skill-说服': { 基础: 10, addedPoint: 0 },
    'skill-心理学': { 基础: 10, addedPoint: 0 },
    'skill-母语': { 基础: 60, addedPoint: 0 },
    'skill-外语': { 基础: 1, addedPoint: 0 },
    'skill-估价': { 基础: 5, addedPoint: 0 },
    'skill-乔装': { 基础: 5, addedPoint: 0 },
    'skill-潜行': { 基础: 20, addedPoint: 0 },
    'skill-追踪': { 基础: 10, addedPoint: 0 },
    'skill-侦查': { 基础: 25, addedPoint: 0 },
    'skill-聆听': { 基础: 20, addedPoint: 0 },
    'skill-读唇': { 基础: 1, addedPoint: 0 },
    'skill-人类学': { 基础: 1, addedPoint: 0 },
    'skill-图书馆使用': { 基础: 20, addedPoint: 0 },
    'skill-生存': { 基础: 10, addedPoint: 0 },
    'skill-生存2': { 基础: 10, addedPoint: 0 },
    'skill-生存3': { 基础: 10, addedPoint: 0 },
    'skill-攀爬': { 基础: 20, addedPoint: 0 },
    'skill-跳跃': { 基础: 20, addedPoint: 0 },
    'skill-骑术': { 基础: 5, addedPoint: 0 },
    'skill-游泳': { 基础: 20, addedPoint: 0 },
    'skill-潜水': { 基础: 1, addedPoint: 0 },
    'skill-艺术与手艺': { 基础: 5, addedPoint: 0 },
    'skill-艺术与手艺2': { 基础: 5, addedPoint: 0 },
    'skill-艺术与手艺3': { 基础: 5, addedPoint: 0 },
    'skill-妙手': { 基础: 10, addedPoint: 0 },
    'skill-锁匠': { 基础: 1, addedPoint: 0 },
    'skill-电气维修': { 基础: 10, addedPoint: 0 },
    'skill-机械维修': { 基础: 10, addedPoint: 0 },
    'skill-导航': { 基础: 10, addedPoint: 0 },
    'skill-汽车驾驶': { 基础: 20, addedPoint: 0 },
    'skill-驾驶': { 基础: 1, addedPoint: 0 },
    'skill-驾驶2': { 基础: 1, addedPoint: 0 },
    'skill-驾驶3': { 基础: 1, addedPoint: 0 },
    'skill-动物驯养': { 基础: 5, addedPoint: 0 },
    'skill-计算机使用': { 基础: 5, addedPoint: 0 },
    'skill-格斗': { 基础: 25, addedPoint: 10, 专攻: '斗殴', 成长: 10 },
    'skill-格斗2': { 基础: 0, addedPoint: 0 },
    'skill-格斗3': { 基础: 0, addedPoint: 0 },
    'skill-射击': { 基础: 0, addedPoint: 0 },
    'skill-射击2': { 基础: 0, addedPoint: 0 },
    'skill-射击3': { 基础: 0, addedPoint: 0 },
    'skill-闪避': { 基础: 25, addedPoint: 0 },
    'skill-投掷': { 基础: 20, addedPoint: 0 },
    'skill-爆破': { 基础: 1, addedPoint: 0 },
    'skill-炮术': { 基础: '1', addedPoint: 0 },
  };

  test.each([
    ['格斗', '斗殴', 35],
    ['格斗', '拳法', 0],
    ['测试名', '子项', 0],
    ['取悦', null, 15],
  ])('%s:%s => %d', (name: string, subName: string, sum: number) => {
    expect(calSkillSumWithSubName(testActorData, name, subName)).toBe(sum);
  });
});
