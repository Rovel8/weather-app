const axios = require('axios');

const url = 'http://api.weatherstack.com/current?access_key=67679f0af3ecc2748f91441308ccc805&query='
const API_KEY_MAPBOX = 'pk.eyJ1IjoicGFzaGFyMSIsImEiOiJja2k3ZTl4NjMwbmptMnNtcWVkcGNzeWg5In0.D2I55yWTh7M22jXElIHIbQ'

const instance = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
})

const getTheCityLocation = async (city) => {
    try{
        let location;
        const result = await instance.get(`${city}.json?access_token=${API_KEY_MAPBOX}&limit=1`)
        if(result.status !== 200){
            throw new Error('Enable to connect to server')
        }else if(!result.data.features.length){
            throw new Error("Unable to find the location. Try another search")
        }else{
            location = result.data.features[0].center
            return location
        }
    }catch(error){
        return error
    }
}

const weatherInTheCity = async (city) => {
    try{
        if(!city){
            throw new Error("There is no location provided. Type in one and try again")
        }
        const location = await getTheCityLocation(city)
        if(!location){
            throw new Error('Enable to connect to location services')
        }
        const wetherData = await axios.get(url + `${location[1]},${location[0]}`)
        if(wetherData.data.error){
            throw new Error("There is no city like this in database. Try another one")
        }else{
            return{
                current: wetherData.data.current,
                location: wetherData.data.location
            }
        }
        
    }catch(error){
        return {
            error: error.message
        }
    }
}

module.exports = {
    weatherInTheCity
}