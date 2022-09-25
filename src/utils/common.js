import moment from 'moment';

export const formatDate = (date, format = 'LLL') => {
  return moment(date).format(format);
};
