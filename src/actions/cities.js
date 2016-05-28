import asyncRequest from '../utils/request'

export const add = (city) => dispatch => {
	const params = {
		url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=24f6455e01abab67a66e87fab176ea38`
	}

	return dispatch({
    types: ['ADD_CITY_REQUEST', 'ADD_CITY_SUCCESS', 'ADD_CITY_FAILURE'],
    callAPI: () => asyncRequest(params)
  })
}

export function remove(city) {
	return { type: "REMOVE_CITY", city }
}