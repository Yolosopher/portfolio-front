export enum WorkHours {
  FULL_TIME = "Full Time",
  PART_TIME = "Part Time",
  INTERNSHIP = "Internship",
}
export interface IExperience {
  _id: string;
  position: string;
  company: string;
  location: string;
  work_hours: WorkHours;
  start_date: Date | string;
  end_date?: Date | string | null;
  description: string;
}
