import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetch as fetchCurrentLocation } from '../actions/currentLoc'
import * as CityActions from '../actions/cities'

import styles from './app.css'

class App extends Component {
	componentDidMount() {
		const { actions, cities } = this.props
		actions.currentLoc.fetch().then(res => {
			const city = res.response.city
			this.addCityIfNeed(city)
		})
	}
	
	componentWillReceiveProps(nextProps) {
		if(this.props.cities.value !== nextProps.cities.value) {
			localStorage.setItem("cities", JSON.stringify(nextProps.cities.value))
		}
	}
	
	
 	render() {
		const removeCity = this.props.actions.cities.remove
		const cities = this.props.cities.value.map((city, i) => {
			return <tr key={i}>
				<td className={styles.city_name}>{city.name}</td>
				<td>temperature from {city.main.temp_min} to {city.main.temp_max} °С</td>
				<td>wind {city.wind.speed}</td>
				<td>cloud {city.clouds.all}</td>
				<td><a href="javascript:void(0);" onClick={() => removeCity(city)}>remove</a></td>
			</tr>
		})

		const currentLoc = this.props.currentLoc.value
		
 		return <div className={styles.container}>
			<div className={styles.block}>
				<span className={styles.loc_text}>Your location: </span>
				<span className={styles.curr_city}>{currentLoc.city}</span>
				<span className={styles.curr_country}>{currentLoc.country}</span>
		  </div>
			
			<div className={styles.block}>
				<form onSubmit={this.addCity}>
					<input ref='city' placeholder='City' />
					<input className={styles.button} type='submit' onClick={this.addCity} value="Add city"/>
				</form>
			</div>
			
			<table><tbody>{cities}</tbody></table>
		</div>
 	}
	
	addCityIfNeed(city) {
		var existCity = false
		const cities = this.props.cities.value
		for(let i = 0, len = cities.length; i < len; ++i) {
			if(cities[i].name === city) {
				existCity = true
				break
			}
		}

		if(!existCity) {
			this.props.actions.cities.add(city)
		}
	}

	addCity = (e) => {
		e.preventDefault()
		
		const city = this.refs.city.value.trim()
		if(!city) return
		
		this.addCityIfNeed(city)
		this.refs.city.value = ""
	};
}


export default connect(
  state => state,
  dispatch => ({
    actions: { 
      currentLoc: {
				fetch: () => dispatch(fetchCurrentLocation())
			},
			cities: bindActionCreators(CityActions, dispatch) 
    }
  })
)(App)