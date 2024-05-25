// utils/user/types.ts

export type UserDataType = {
  id: number;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  registrationTime: string;
  credentials: {
    roleId: number;
    role: {
      roleName: string;
    };
  };
  details?: string;
};
