import * as moment from "moment";

export type JobPost = {
  id: number;
  jobTagId: number;
  jobContentId: number;
  addressId: number;
  companyId: number;
  contentId: number;
  jobImageUrl: string;
  title: string;
  subTitle?: string;
  houryWage: number;
  monthlySalary: number;
  isClosed: number;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
};
