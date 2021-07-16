import React, { Component } from 'react'
import {Link} from "react-router-dom";

import axios from "axios";
import logo from '../logo.svg'

class CountryDetails extends Component {
    state = {
        countryDetails: null,
    };

    getData = async () => {
        let id = this.props.routeProps.match.params.id
        let response = await axios.get(`https://restcountries.eu/rest/v2/alpha/${id}`)

        let country = {
            id: this.props.routeProps.match.params.id,
            name: response.data.name,
            capital: response.data.capital,
            area: response.data.area,
            borders: response.data.borders
        }

        this.setState({
            countryDetails: country
        })
    }

    componentDidMount(){
        this.getData()
    }

    componentDidUpdate(){
        let stateId = this.state.countryDetails.id;
        let newId = this.props.routeProps.match.params.id
        if (newId !== stateId) {
            this.getData()
        }
    }

    countryNames = () => {
        const {countryDetails} = this.state

        return countryDetails.borders.map((countryAcr, i) => {
            return this.props.countries.map(country => {
                    if(countryAcr === country.alpha3Code){
                        return <li key={i}> <Link to={`/country-details/${countryAcr}`}>{country.name}</Link> </li>
                    }
                })
        })
    }

    render() {
        const {countryDetails} = this.state
        if (this.state.countryDetails === null) {
            return (
                <div>
                    Oops No Country details were found 
                </div>
            )
        }

        return (
            <div> 
                 <h1>{countryDetails.name}</h1>
                 <hr/>
                 <h4>Capital: {countryDetails.capital}</h4>
                 <hr/>
                 <h4>Area: {countryDetails.area}km</h4> 
                 <hr/> 
                 <h4>Borders:   <ul>{this.countryNames()}</ul> </h4> 
            </div>
        )
    }
}


export default CountryDetails
