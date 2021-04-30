import { TRPGClient } from '@trpgengine/sdk-node';
import type {
  TRPGChatMsgPayload,
  TRPGDiceLog,
  TRPGGroupActor,
} from '@trpgengine/sdk-node/lib/types';
import { roll } from './utils';

/**
 * 专门用于测试的客户端
 */
export class MockedClient extends TRPGClient {
  constructor() {
    super('ws://example.com');
  }
  login = jest.fn();
  loginAccountWithQuestion = jest.fn();
  loginAccount = jest.fn();
  updateJWT = jest.fn();
  send = jest.fn();
  watch = jest.fn();
  onReceiveMsg = jest.fn();
  connect = jest.fn();
  disconnect = jest.fn();
  groupRoll = jest.fn((groupUUID: string, requestExp: string) => {
    const { str, value } = roll(requestExp);
    return Promise.resolve({
      uuid: '',
      sender_uuid: 'mockclient',
      to_uuid: groupUUID,
      is_group: true,
      is_private: false,
      dice_request: requestExp,
      dice_expression: str,
      dice_result: value,
    } as TRPGDiceLog);
  });
  sendReplyGroupMessage = jest.fn(
    (payload: TRPGChatMsgPayload, replyMsg: string) => {
      return Promise.resolve();
    }
  );
  getPlayerSelectedGroupActorInfo = jest.fn(() => {
    return Promise.resolve({
      uuid: 'any',
      actor_uuid: 'actor_uuid',
      actor_info: {
        'skill-取悦': {
          基础: 15,
          addedPoint: 0,
        },
      },
      actor_template_uuid: 'actor_template_uuid',
      name: '',
      desc: '',
      avatar: '',
      passed: true,
      enabled: true,
    } as TRPGGroupActor);
  });
  setGroupActorInfo = jest.fn();
}
