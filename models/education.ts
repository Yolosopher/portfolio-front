export interface IEducation {
  _id: string;
  field: string;
  university: string;
  start_date: string;
  end_date?: string | undefined;
  description: string;
}
