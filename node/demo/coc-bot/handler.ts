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

  if (payload.message.startsWith('.sc')) {
    // 检测到st
    try {
      console.log(`[${groupUUID}] 检测到st命令: ${payload.message}`);

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
        return;
      }
      console.log('TODO: 未完成');
      return;
      // console.log('当前理智:', _.get(actorDetail, ))
      // await client.setGroupActorInfo(actorDetail.uuid, {
      //   data: Number(_.get(actorDetail, 'actor_info.SAN')) + 1,
      // });
      console.log('数据追加完毕');
    } catch (err) {
      console.error('操作异常', err);
    }
  }
}
