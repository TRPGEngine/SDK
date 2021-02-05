export interface TRPGUserInfo {
  id: number;
  uuid: string;
  username: string;
  nickname: string;
  last_login: string;
  avatar: string;
  token?: string;
  app_token?: string;
  sex: string;
  sign: string;
  alignment: string;
  createAt: string;
}

export type TRPGChatMsgType =
  | 'normal'
  | 'system'
  | 'ooc'
  | 'speak'
  | 'action'
  | 'cmd'
  | 'card'
  | 'tip'
  | 'file';

export interface TRPGChatMsgPayload {
  uuid: string;
  message: string;
  sender_uuid: string;
  to_uuid: string | null;
  converse_uuid: string;
  group_uuid: string;
  type: TRPGChatMsgType;
  is_public: boolean;
  is_group: boolean;
  date: string;
  data: object;
  revoke?: boolean;
}

export interface TRPGGroupActor {
  uuid: string;
  actor_uuid: string;
  actor_info: {};
  actor_template_uuid: string;
  name: string;
  desc: string;
  avatar: string;
  passed: boolean;
  enabled: boolean;
}

export interface TRPGDiceLog {
  uuid: string;
  sender_uuid: string;
  to_uuid: string;
  is_group: boolean;
  is_private: boolean;
  dice_request: string;
  dice_expression: string;
  dice_result: number;
}
