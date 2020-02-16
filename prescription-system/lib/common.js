import moment from 'moment';

export const formatDate = (dateString) => {
	const formatString = "MMM DD, YYYY"
	return moment(dateString).format(formatString);
}
