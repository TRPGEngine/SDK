import _ from 'lodash';
import { TRPGChatMsgPayload, TRPGClient } from '@trpgengine/sdk-node';
import { handleSC } from './sc';
import { handleRA } from './ra';
import { handleRAB } from './rab';
import { handleRAP } from './rap';

const helpMsg = `目前支持指令:
- .sc[成功损失]/[失败损失]
- /ra[技能名]( [专长])`;

/**
 * 团消息处理
 * @param client SDK Client
 * @param payload 消息体
 */
export async function handleGroupMessage(
  client: TRPGClient,
  payload: TRPGChatMsgPayload
) {
  const message = payload.message;

  if (message.startsWith('/help')) {
    client.sendReplyGroupMessage(payload, helpMsg);
    return;
  }

  if (message.startsWith('.sc')) {
    // 检测到st
    handleSC(client, payload);
  } else if (message.startsWith('/rab')) {
    // coc奖励骰
    handleRAB(client, payload);
  } else if (message.startsWith('/rap')) {
    // coc惩罚骰
    handleRAP(client, payload);
  } else if (message.startsWith('/ra')) {
    // coc专用判定骰
    handleRA(client, payload);
  }
}
