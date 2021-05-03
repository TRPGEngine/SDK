import { MockedClient } from '../../tests/MockedClient';
import { generateMsgPayload } from '../../tests/utils';
import { handleRAP } from '../rap';

describe('rap', () => {
  test.each(['/rap5# 取悦 50', '/rap1# 取悦 50', '/rap 取悦 50'])(
    '%s',
    async (command) => {
      const client = new MockedClient();
      await handleRAP(
        client,
        generateMsgPayload({
          message: command,
        })
      );

      const calls = client.sendReplyGroupMessage.mock.calls;
      expect(calls.length).toBe(1);
      const replyMessage = calls[0][1];
      expect(replyMessage).toMatch(
        /^P\d=\d*?\[惩罚骰: .*?\]=.*?\/50, 判定(成功|失败)?$/
      );
    }
  );
});
