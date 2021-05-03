import { MockedClient } from '../../tests/MockedClient';
import { generateMsgPayload } from '../../tests/utils';
import { handleRAB } from '../rab';

describe('rab', () => {
  test.each(['/rab5# 取悦 50', '/rab1# 取悦 50', '/rab 取悦 50'])(
    '%s',
    async (command) => {
      const client = new MockedClient();
      await handleRAB(
        client,
        generateMsgPayload({
          message: command,
        })
      );

      const calls = client.sendReplyGroupMessage.mock.calls;
      expect(calls.length).toBe(1);
      const replyMessage = calls[0][1];
      expect(replyMessage).toMatch(
        /^B\d=\d*?\[奖励骰: .*?\]=.*?\/50, 判定(成功|失败)?$/
      );
    }
  );
});
