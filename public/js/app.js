console.log('client side javascript file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent='From javaScript'



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=e0f355851b3514de1c9d345e9998eb44&units=metric').then((response) => {
        response.json().then((data) => {
            if (data.error) {
            } else if (data.cod == 404) {
                messageOne.textContent='Can not find the location,Try different search!.'
            }
            else {
                messageOne.textContent = 'Country => '+data.sys.country+'  City  =>'  + data.name 
                messageTwo.textContent = data.main.temp
            }
        })
    })
})