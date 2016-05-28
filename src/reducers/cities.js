const initialState = {
  status: null,
  value: JSON.parse(localStorage.getItem("cities")) || [],
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_CITY_REQUEST': {
      return {
        ...state,
        error: null,
        status: "pending"
      }
    }
    
    case 'ADD_CITY_SUCCESS': {
      return {
        status: "fulfilled",
        value: [...state.value, action.response]
      }
    }

    case 'ADD_CITY_FAILURE': {
      return {
        status: "rejected",
        error: actions.error
      }
    }
    
    case "REMOVE_CITY": {
      return {
        ...state,
        value: state.value.filter(city => city !== action.city)
      }
    }
      
    default:
      return state
  }
}