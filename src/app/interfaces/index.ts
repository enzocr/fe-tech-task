export interface ILogInResponse {
  accessToken: string;
  expiresIn: number
}

export interface IResponse<T> {
  data: T;
  message: string,
  meta: T;
}

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stockQuantity?: number;
  category?: ICategory
}

export interface IRequestProduct {
  name?: string;
  description?: string;
  price?: number;
  stockQuantity?: number;
  categoryId?: number
}

export interface ICategory {
  id?: number;
  name?: string;
  description?: string;
}

export interface ISearch {
  page?: number;
  size?: number;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
}

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  authorities?: IAuthority[];
  role?: IRole
}

export interface IRequestUser {
  name?: string;
  email?: string;
  password?: string;
}
export interface IRequestUpdateUser {
  email?: string;
  name?: string;
}

export interface IRequestLogIn {
  email?: string;
  password?: string;
}

export interface IAuthority {
  authority: string;
}

export enum IRoleType {
  admin = "ROLE_SUPER_ADMIN",
  user = "ROLE_USER"
}

export interface IRole {
  description: string;
  id: number;
  name: string;
}



