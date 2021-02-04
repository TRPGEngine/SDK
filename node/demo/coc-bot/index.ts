import { TRPGClient, TRPGUserInfo } from '../../';
import config from './config.json';
import _ from 'lodash';

async function main() {
  console.log('欢迎使用COC Bot for TRPG Engine..');
  console.log('正在启动中');

  const client = new TRPGClient(config.serverUrl);

  console.log('初始化完毕...');

  try {
    let userInfo: TRPGUserInfo;
    if (typeof config.username === 'string') {
      console.log('检测到配置文件有指定用户, 开始自动登录', config.username);
      userInfo = await client.loginAccount(config.username, config.password);
    } else {
      userInfo = await client.loginAccountWithQuestion();
    }

    console.log('登录成功:', `${userInfo.username}[${userInfo.uuid}]`);

    console.log('正在监听所有的消息');
    client.onReceiveMsg(async (payload) => {
      if (payload.is_group === false) {
        // 跳过私人消息
        return;
      }

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
    });
  } catch (err) {
    console.log('登录失败', err);
    process.exit(1);
  }
}

main();
