export enum Role {
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
  USER = "user",
}
export enum ReadAccess {
  PUBLIC = "public",
  PRIVATE = "private",
}

export type SizeInfo = {
  cols: number;
  hiddenNumber: number;
};
