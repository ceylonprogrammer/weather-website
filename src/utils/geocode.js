const request = require("request")

// Callback functions

const geocode=(address,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?q='+address+'&appid=e0f355851b3514de1c9d345e9998eb44&units=metric'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location service!',undefined)
        }else if(body.cod==404){
            callback('Unable to find location .Try another search',undefined)
        }else{
            callback(undefined,{
                Tempreture:body.main.temp,
                Location:body.name,
                Country:body.sys.country
            })
        }
    })
}

module.exports=geocode