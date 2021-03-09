import {
  isValidString,
  TRPGChatMsgPayload,
  TRPGClient,
} from '@trpgengine/sdk-node';
import _ from 'lodash';
import { raRE } from '../regexp';
import { calSkillSumWithSubName } from '../utils';

export async function handleRA(
  client: TRPGClient,
  payload: TRPGChatMsgPayload
) {
  const groupUUID = payload.group_uuid;
  const message = payload.message;

  try {
    console.log(`[${groupUUID}] 检测到ra命令: ${message}`);

    // 解析消息
    const groups = message.match(raRE);
    const skillName = _.get(groups, [1]);
    const skillSubName = _.get(groups, [2]);

    if (!isValidString(skillName)) {
      // 如果有一项不是一个合法字符串
      client.sendReplyGroupMessage(
        payload,
        `输入不合法, 格式应为 /ra [技能名]( [专长]), 请重新检查输入: ${message}`
      );
      return;
    }

    console.log('正在获取用户角色信息...');
    const actorDetail = await client.getPlayerSelectedGroupActorInfo(
      payload.group_uuid,
      payload.sender_uuid
    );

    const actorData = _.get(actorDetail, 'actor_info');
    const raNum = calSkillSumWithSubName(actorData, skillName, skillSubName);
    if (raNum === 0) {
      client.sendReplyGroupMessage(
        payload,
        `没有获取到正确的技能值, 请检查技能是否存在: ${skillName}-${skillSubName}`
      );
      console.log('ra判定失败:', actorDetail);
      return;
    }

    console.log('正在投骰...');

    const diceRes = await client.groupRoll(groupUUID, '1d100');
    console.log('判定结果:', diceRes.dice_expression);
    let isSuccess = true;
    if (diceRes.dice_result <= raNum) {
      // 判定成功
      isSuccess = true;
    } else {
      // 判定失败
      isSuccess = false;
    }

    client.sendReplyGroupMessage(
      payload,
      `${isSuccess ? '判定成功' : '判定失败'}, 技能值: ${raNum}, 投骰结果: ${
        diceRes.dice_expression
      }`
    );
  } catch (err) {
    client.sendReplyGroupMessage(payload, '机器人处理异常, 请查看控制台');
    console.error('操作异常', err);
  }
}
