import moment, { Moment } from "moment";

export const getDate = (date: Moment): Moment => {
  return date.utc(false);
};

export const now = (): Moment => {
  return moment();
};

export const setDate = (date: Moment): Moment => {
  return date.utc(false);
};
