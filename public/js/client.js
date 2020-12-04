const getCity = async (city) => {
    try{
        const data = await fetch(`/weather?city=${city}`)
        const result = await data.json()
        console.log(result)
        return result
    }catch(error){
        return error
    }
}

const temperature = document.querySelector('.main__temperature')
const weather = document.querySelector('.main__weather')
const form = document.querySelector('.form-main')
const input = document.querySelector('.form-main__input')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    temperature.textContent = 'Loading...'
    weather.textContent = ''
    const data = await getCity(input.value)
    if(data.error){
        temperature.textContent = data.error
        input.value = ''
    }else{
        const degree = data.result.current.temperature
        const location = data.result.location.region
        const weatherDescription = data.result.current.weather_descriptions[0]
        temperature.textContent = 'There is ' + degree + '\xB0C ' + ` in ${location}`
        weather.textContent = weatherDescription
        input.value = ''
    }
})        

