import moment from "moment";
import {DATE_FORMATS} from "./constants";

export const getLocalTime = ({time, format=DATE_FORMATS.DEFAULT_DATE_TIME_FORMAT, isMoment})=>{
  if(!time){
    return time;
  }
  let convertedTime = moment.utc(time).clone().local();
  if(!isMoment){
    convertedTime = convertedTime.format(format);
  }
  return convertedTime;
}

export const getUTCTime = ({time, format=DATE_FORMATS.DEFAULT_DATE_TIME_FORMAT, isMoment})=>{
  if(!time){
    return time;
  }
  let convertedTime = moment(time).utc();
  if(!isMoment){
    convertedTime = convertedTime.format(format);
  }
  return convertedTime;
}

export const getFormattedDate = ({date, format='LLL', isDate=false, isDateTime=false })=>{
  if(isDate){
    format='ll';
  }
  if(isDateTime){
    format='lll';
  }
  return moment(date).format(format);
}
