import _ from 'lodash';
import { TRPGChatMsgPayload, TRPGClient } from '../../';

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

  if (payload.message.startsWith('.st')) {
    // 检测到st
    try {
      console.log(`[${groupUUID}] 检测到st命令: ${payload.message}`);

      console.log('正在获取用户角色信息...');
      const actorDetail = await client.getPlayerSelectedGroupActorInfo(
        payload.group_uuid,
        payload.sender_uuid
      );
      // console.log('当前理智:', _.get(actorDetail, ))
      await client.setGroupActorInfo(actorDetail.uuid, {
        data: _.get(actorDetail, 'actor_info.data') + '1',
      });
      console.log('数据追加完毕');
    } catch (err) {
      console.error('操作异常', err);
    }
  }
}
