import { TRPGChatMsgPayload } from '@trpgengine/sdk-node';
import _ from 'lodash';

/**
 * 生成消息体
 */
export function generateMsgPayload(
  overwrite: Partial<TRPGChatMsgPayload> = {}
): TRPGChatMsgPayload {
  return {
    uuid: 'test',
    message: '',
    sender_uuid: 'sender',
    to_uuid: 'to',
    converse_uuid: 'converse',
    group_uuid: 'group',
    type: 'normal',
    is_public: true,
    is_group: true,
    date: '2020-10-10',
    data: {},

    ...overwrite,
  };
}

//#region copy from Server/packages/Dice/lib/utils.ts

/**
 * 在一定范围内取随机值
 * @param maxPoint 最大点数
 * @param minPoint 最小点数
 */
export function rollPoint(maxPoint: number, minPoint = 1): number {
  maxPoint = parseInt(String(maxPoint));
  minPoint = parseInt(String(minPoint));
  if (maxPoint <= 1) {
    maxPoint = 100;
  }
  if (maxPoint < minPoint) {
    maxPoint = minPoint + 1;
  }

  var range = maxPoint - minPoint + 1;
  var rand = Math.random();
  return minPoint + Math.floor(rand * range);
}

interface RollRes {
  str: string;
  value: number;
}
/**
 * 投骰
 * @param requestStr 投骰表达式 如1d100
 */
export function roll(requestStr: string): RollRes {
  const pattern = /(\d*)\s*d\s*(\d*)/gi;

  const originRequestStr = requestStr; // 记录一下原始的投骰表达式
  const realRequestStr = requestStr.replace(/[^\dd\+-\/\*\(\)]+/gi, ''); //去除无效或危险字符后的真实可用的表达式
  const express = realRequestStr.replace(pattern, function (tag, num, dice) {
    num = Number(num) || 1;
    dice = Number(dice) || 100;
    if (num > 100 || dice > 1000) {
      throw new Error(`投骰点数超限, 最大为100d1000`);
    }

    num = _.clamp(num, 1, 100); // 个数
    dice = _.clamp(dice, 1, 1000); // 面数
    const res = [];
    for (var i = 0; i < num; i++) {
      res.push(rollPoint(dice));
    }

    if (num > 1) {
      return '(' + res.join('+') + ')';
    } else {
      return res.join('+');
    }
  });

  if (_.isEmpty(realRequestStr) || _.isEmpty(express)) {
    throw new Error(`非法的投骰表达式: ${originRequestStr}`);
  }

  const result = eval(express);
  let str = '';
  if (express !== String(result)) {
    str = realRequestStr + '=' + express + '=' + result;
  } else {
    str = realRequestStr + '=' + result;
  }

  return {
    str,
    value: Number(result),
  };
}

//#endregion
