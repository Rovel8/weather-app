const getCity = async (city) => {
    try{
        const data = await fetch(`/weather?city=${city}`)
        const result = await data.json()
        console.log(result)
        return result
    }catch(error){
        console.log(error.message)
    }
    
}

const temperature = document.querySelector('.temperature')
const form = document.querySelector('.form')
const input = document.querySelector('.form__input')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    temperature.textContent = 'Loading...'
    const data = await getCity(input.value)
    if(data.error){
        temperature.textContent = data.error
        input.value = ''
    }else{
        temperature.textContent = 'There is ' + data.result.temperature + ` in ${input.value}`
        input.value = ''
    }
})        

