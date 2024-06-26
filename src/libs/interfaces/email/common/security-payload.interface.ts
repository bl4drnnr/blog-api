import { UserInfoInterface } from '@interfaces/user-info.interface';
import { Language } from '@interfaces/language.enum';

export interface SecurityPayloadInterface {
  link: string;
  userInfo?: UserInfoInterface;
  language?: Language;
}
