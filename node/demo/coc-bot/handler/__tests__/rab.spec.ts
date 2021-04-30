import { MockedClient } from '../../tests/MockedClient';
import { generateMsgPayload } from '../../tests/utils';
import { handleRAB } from '../rab';

describe('rab', () => {
  test('test', async () => {
    const client = new MockedClient();
    await handleRAB(
      client,
      generateMsgPayload({
        message: '/rab5# 取悦 50',
      })
    );

    const calls = client.sendReplyGroupMessage.mock.calls;
    expect(calls.length).toBe(1);
    const replyMessage = calls[0][1];
    expect(replyMessage).toMatch(
      /^B5=\d*?\[奖励骰: .*?\]=.*?\/50, 判定(成功|失败)?$/
    );
  });
});
