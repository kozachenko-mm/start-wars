import qs from 'query-string';

export const queryFromLocation = location => qs.parse(location.search).query;