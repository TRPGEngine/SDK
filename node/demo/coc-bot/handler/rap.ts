/**
 * 奖励骰
 */

import {
  isValidString,
  isValidNumber,
  TRPGChatMsgPayload,
  TRPGClient,
} from '@trpgengine/sdk-node';
import _ from 'lodash';
import { rabpRE } from '../regexp';
import { calSkillSumWithSubName, parseRollCount } from '../utils';

export async function handleRAP(
  client: TRPGClient,
  payload: TRPGChatMsgPayload
) {
  const groupUUID = payload.group_uuid;
  const message = payload.message;

  try {
    console.log(`[${groupUUID}] 检测到rab命令: ${message}`);

    // 解析消息
    const groups = message.match(rabpRE);
    const count = parseRollCount(_.get(groups, [1])) || 1;
    const skillName = _.get(groups, [2]);
    const skillSubName = _.get(groups, [3]);
    const forceRAValue = Number(_.get(groups, [4]));

    if (!isValidString(skillName)) {
      // 如果有一项不是一个合法字符串
      client.sendReplyGroupMessage(
        payload,
        `输入不合法, 格式应为 /rap [技能名]( [专长]) (属性值), 请重新检查输入: ${message}`
      );
      return;
    }

    console.log('正在获取用户角色信息...');
    const actorDetail = await client.getPlayerSelectedGroupActorInfo(
      payload.group_uuid,
      payload.sender_uuid
    );

    const actorData = _.get(actorDetail, 'actor_info');

    let raNum: number;
    if (isValidNumber(forceRAValue)) {
      raNum = forceRAValue;
    } else {
      raNum = calSkillSumWithSubName(actorData, skillName, skillSubName);
      if (raNum === 0) {
        client.sendReplyGroupMessage(
          payload,
          `没有获取到正确的技能值, 请检查技能是否存在: ${skillName}-${skillSubName}`
        );
        console.log('ra判定失败:', actorDetail);
        return;
      }
    }

    console.log(`正在投骰...次数是 ${count}`);
    const bonusResultList = [];
    for (let i = 0; i < count; i++) {
      const diceRes = await client.groupRoll(groupUUID, '1d10');
      bonusResultList.push(diceRes.dice_result);
    }

    console.log(`惩罚投骰结果是: ${bonusResultList}`);

    const bonusPoint = Math.max(...bonusResultList);
    console.log(`选取惩罚点数: ${bonusPoint}`);

    const diceRes = await client.groupRoll(groupUUID, '1d100');
    console.log('判定结果:', diceRes.dice_expression);

    /**
     * 最终投骰结果
     */
    let finallyRollValue = (diceRes.dice_result % 10) + bonusPoint * 10;
    finallyRollValue = Math.max(diceRes.dice_result, finallyRollValue);
    console.log('综合结果:', finallyRollValue);
    let isSuccess = true;
    if (finallyRollValue <= raNum) {
      // 判定成功
      isSuccess = true;
    } else {
      // 判定失败
      isSuccess = false;
    }

    client.sendReplyGroupMessage(
      payload,
      `P${count}=${diceRes.dice_result}[惩罚骰: ${bonusResultList.join(
        ' '
      )}]=${finallyRollValue}/${raNum}, 判定${isSuccess ? '成功' : '失败'}`
    );
  } catch (err) {
    client.sendReplyGroupMessage(payload, '机器人处理异常, 请查看控制台');
    console.error('操作异常', err);
  }
}
