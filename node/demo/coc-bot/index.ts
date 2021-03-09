import { TRPGClient, TRPGUserInfo } from '@trpgengine/sdk-node';
import { handleGroupMessage } from './handler';
import fs from 'fs-extra';
import packageJson from './package.json';

const config =
  fs.readJsonSync('./config.json', {
    throws: false,
  }) ?? {};

async function main() {
  console.log('欢迎使用 COC Bot for TRPG Engine..');
  console.log(`当前版本号: ${packageJson.version}`);
  console.log('正在启动中...');

  const client = new TRPGClient(config.serverUrl);
  client.connect();

  console.log('初始化完毕...');

  try {
    let userInfo: TRPGUserInfo;
    if (typeof config.username === 'string') {
      console.log('检测到配置文件有指定用户, 开始自动登录', config.username);
      userInfo = await client.loginAccount(config.username, config.password);
    } else {
      console.log(
        '请输入账号密码用于机器人进行登录, 请确保该账号拥有相关团的管理员权限:'
      );
      userInfo = await client.loginAccountWithQuestion();
    }

    console.log('登录成功:', `${userInfo.username}[${userInfo.uuid}]`);

    console.log('开始监听所有的消息, 在团中输入 /help 查看所有指令');
    client.onReceiveMsg(async (payload) => {
      if (payload.is_group === true) {
        // 仅处理团消息
        handleGroupMessage(client, payload);
      }
    });
  } catch (err) {
    console.log('登录失败', err);
    process.exit(1);
  }
}

main();
