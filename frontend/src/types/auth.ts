export type IUser = {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN' | 'VENDOR' | 'SUPER_ADMIN' | 'VENDOR_STAFF';
  storeId?: string | null;
  avatar?: string | null;
  status: 'ACTIVE' | 'BLOCKED' | 'SUSPENDED';
};

export type IAuthResponse = {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    accessToken: string;
  };
};
