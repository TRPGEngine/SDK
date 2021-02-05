import _ from 'lodash';
import {
  TRPGChatMsgPayload,
  TRPGClient,
  TRPGDiceLog,
  isValidString,
} from '../../';

// san check 格式
const scRE = /^\.sc\s*?(\S*)?\/(\S*)?\s*?.*?$/;

/**
 * 团消息处理
 * @param client SDK Client
 * @param payload 消息体
 */
export async function handleGroupMessage(
  client: TRPGClient,
  payload: TRPGChatMsgPayload
) {
  const groupUUID = payload.group_uuid;
  const message = payload.message;

  if (message.startsWith('.sc')) {
    // 检测到st
    try {
      console.log(`[${groupUUID}] 检测到sc命令: ${message}`);

      // 解析消息
      const groups = message.match(scRE);
      const successDiceExp = groups[1];
      const failDiceExp = groups[2];

      if (!isValidString(successDiceExp) || !isValidString(failDiceExp)) {
        // 如果有一项不是一个合法字符串
        client.sendReplyGroupMessage(
          payload,
          `输入不合法, 格式应为 .sc[成功损失]/[失败损失], 请重新检查输入: ${message}`
        );
        return;
      }

      console.log('正在获取用户角色信息...');
      const actorDetail = await client.getPlayerSelectedGroupActorInfo(
        payload.group_uuid,
        payload.sender_uuid
      );

      const san = Number(_.get(actorDetail, 'actor_info.SAN'));
      if (!san) {
        client.sendReplyGroupMessage(
          payload,
          '没有获取到san值, 请确定当前人物卡是正确的COC7人物卡'
        );
        console.log('获取san值失败:', actorDetail);
        return;
      }

      console.log('正在投骰...');

      const diceRes = await client.groupRoll(groupUUID, '1d100');
      console.log('判定结果:', diceRes);
      let diceRes2: TRPGDiceLog;
      let isSuccess = true;
      if (diceRes.dice_result < san) {
        // 判定成功
        diceRes2 = await client.groupRoll(groupUUID, successDiceExp);
        isSuccess = true;
      } else {
        // 判定失败
        diceRes2 = await client.groupRoll(groupUUID, successDiceExp);
        isSuccess = false;
      }

      const newSan = san - diceRes2.dice_result;
      client.sendReplyGroupMessage(
        payload,
        `${isSuccess ? '判定成功' : '判定失败'}, san check 结果: ${
          diceRes.dice_expression
        }, 损失SAN值: ${diceRes2.dice_result}, 当前: ${newSan}`
      );

      console.log('正在修改数据...');
      await client.setGroupActorInfo(actorDetail.uuid, {
        SAN: newSan,
      });
      console.log('数据修改完毕:', `${san} => ${newSan}`);
    } catch (err) {
      client.sendReplyGroupMessage(payload, '机器人处理异常, 请查看控制台');
      console.error('操作异常', err);
    }
  }
}
