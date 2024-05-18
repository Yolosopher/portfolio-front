export type LEVEL = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ITechStack {
  _id: string;
  name: string;
  icon: string;
  level: LEVEL;
  description: string;
}
