import { StatusCode } from '@constant/status-code.enum';

interface IMessageResponse {
  [key: string]: string;
}

export const MessageResponse: IMessageResponse = {
  [StatusCode.INVALID_LOGIN_CREDENTIALS]: 'Email or password invalid',
  [StatusCode.INVALID_CREDENTIALS]: 'Token invalid or expired',
  [StatusCode.OK]: 'Success',
  [StatusCode.ROOM_EXISTED]: 'Meeting existed',
  [StatusCode.ROOM_NOT_EXISTED]: 'Meeting not existed',
  [StatusCode.UNEXPECTED]: 'Unexpected error occur',
  [StatusCode.EMAIL_EXISTED]: 'Email existed',
  [StatusCode.OLD_PASSWORD_INCORRECT]: 'Old password incorrect',
  [StatusCode.NOT_HAVE_PERMISSION]: 'User not have permission',
  [StatusCode.ROOM_REACH_LIMIT]: 'Meeting reach limit',
  [StatusCode.USERNAME_TAKEN]: 'Username was taken',
  [StatusCode.USERNAME_REQUIRED]: 'Username is required',
  [StatusCode.INVITE_NOT_EXISTED]: 'Invite not existed',
  [StatusCode.BAD_REQUEST]: 'Bad request',
  [StatusCode.ROOM_CODE_INVALID]: 'Meeting code is invalid',
  [StatusCode.USER_NOT_EXISTED]: 'User not existed',
  [StatusCode.CONTACT_EXISTED]: 'Contact existed',
  [StatusCode.CONTACT_NOT_EXISTED]: 'Contact not existed',
};
