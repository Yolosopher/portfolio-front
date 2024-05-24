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

export enum AnalyticsDataType {
  UNIQUE_VISITORS = "active",
  PAGE_VIEWS = "pageviews",
  METRICS = "metrics",
  STATS = "stats",
}
