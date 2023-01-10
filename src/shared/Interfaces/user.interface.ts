import { UserRole } from './role.enum';

export interface User {
  id: number;
  name: string;
  username: string;
  email?: string;
  password?: string;
  role?: UserRole;
  profileImg?: string;
}
