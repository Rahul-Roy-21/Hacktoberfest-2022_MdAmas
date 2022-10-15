import { format } from "date-fns";

export const getDate = (createdAt) =>
  format(new Date(Number(createdAt)), "eeee dd/MM/yyyy hh:mm:ss aa");
