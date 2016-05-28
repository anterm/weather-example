import asyncRequest from '../utils/request'

export const fetch = () => dispatch => {
	const params = {
		url: "http://ipinfo.io/json"
	}

	return dispatch({
    types: ['CITY_REQUEST', 'CITY_SUCCESS', 'CITY_FAILURE'],
    callAPI: () => asyncRequest(params)
  })
}