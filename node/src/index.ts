import io from 'socket.io-client';
import md5 from 'md5';
import { TRPGChatMsgPayload, TRPGUserInfo } from './types';
import inquirer from 'inquirer';

export { TRPGUserInfo };

export class TRPGClient {
  private socket: SocketIOClient.Socket;
  constructor(url: string = 'wss://trpgapi.moonrailgun.com') {
    this.socket = io(url, {
      transports: ['websocket'],
    });
  }

  /**
   * TODO
   * 登录机器人账号
   */
  async login(appKey: string, appSecret: string) {
    // TODO
  }

  async loginAccountWithQuestion(): Promise<TRPGUserInfo> {
    const params = await inquirer.prompt([
      {
        name: 'username',
      },
      {
        name: 'password',
      },
    ]);

    if (!params.username || !params.password) {
      throw new Error('请输入用户名或密码');
    }

    const userInfo = await this.loginAccount(params.username, params.password);

    return userInfo;
  }

  /**
   * 登录用户(使用用户密码)
   */
  async loginAccount(
    username: string,
    password: string
  ): Promise<TRPGUserInfo> {
    const res = await this.send('player::login', {
      username,
      password: md5(password),
    });

    return res.info;
  }

  /**
   * 发送消息
   * @param eventName 事件名
   * @param data 数据
   */
  async send(eventName: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.socket.emit(eventName, data, ({ result, ...others }) => {
        if (result === false) {
          reject(new Error(others.msg));
        } else {
          resolve(others);
        }
      });
    });
  }

  /**
   * 监听事件
   * @param eventName 事件名
   * @param cb 回调
   */
  watch(eventName: string, cb: (data: any) => void) {
    this.socket.on(eventName, (data) => {
      cb(data);
    });
  }

  /**
   * 增加接受消息事件监听
   */
  onReceiveMsg(cb: (payload: TRPGChatMsgPayload) => void) {
    this.watch('chat::message', (payload) => {
      cb(payload);
    });
  }

  /**
   * 断开连接
   */
  disconnect(): void {
    this.socket.disconnect();
  }
}
