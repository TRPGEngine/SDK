import { MockedClient } from '../../tests/MockedClient';
import { generateMsgPayload } from '../../tests/utils';
import { handleRAP } from '../rap';

describe('rab', () => {
  test('test', async () => {
    const client = new MockedClient();
    await handleRAP(
      client,
      generateMsgPayload({
        message: '/rap5# 取悦 50',
      })
    );

    const calls = client.sendReplyGroupMessage.mock.calls;
    expect(calls.length).toBe(1);
    const replyMessage = calls[0][1];
    expect(replyMessage).toMatch(
      /^P5=\d*?\[惩罚骰: .*?\]=.*?\/50, 判定(成功|失败)?$/
    );
  });
});
