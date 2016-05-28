const initialState = {
  status: null,
  value: {
		city: "",
		loc: "",
		country: ""
	},
  error: null
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'CITY_REQUEST': {
			return {
				...state,
				status: "pending"
			}
		}

		case 'CITY_SUCCESS': {
			const { city, loc, country } = action.response
			return {
				status: 'fulfilled',
				value: { city, loc, country }
			}
		}

		case 'CITY_FAILURE': {
			return {
				...state,
				status: 'rejected',
				errors: action.error.response.body
			}
		}
			
	  default:
			return state
	}
}