import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Env from "./env"
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (image:string):string => {
  return `${Env.API_URL}/storage/${image}`;
}

export const isValidUrl = (url:string):boolean => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

export const formatDate = (date:string):string => {
  return moment(date).format("DD MMM YYYY");
}