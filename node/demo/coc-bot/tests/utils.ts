import { TRPGChatMsgPayload } from '@trpgengine/sdk-node';

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
