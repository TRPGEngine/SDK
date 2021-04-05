import { TRPGClient } from '@trpgengine/sdk-node';

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
  groupRoll = jest.fn();
  sendReplyGroupMessage = jest.fn();
  getPlayerSelectedGroupActorInfo = jest.fn();
  setGroupActorInfo = jest.fn();
}
