window.addEventListener('DOMContentLoaded', function(){
    getData()
})

function getData(){
    var xhr = new XMLHttpRequest()
    var url = "https://api.covid19api.com/countries"
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function(){
        if( xhr.status === 200 ) {
            var response = JSON.parse(xhr.response)
            var firstLetter = document.getElementById('firstLetter')
            firstLetter.addEventListener('blur', function(){
                displayCountries(response, firstLetter.value.toLowerCase())
            })
        }
        else {
            alert("The Error Code is : " + xhr.status)
        }
    }
    xhr.onerror = function(){
        alert("There is an Error in sending HTTP Request")
    }
}

function displayCountries(response, firstLetter){
    
    var countries = document.getElementById('countryList')
    countries.innerHTML = ""
    var countryNames = []
    for( var i = 0; i < response.length; i++ ) {
        countryNames.push(response[i].Country)
    }
    for( var i = 0; i < response.length; i++ ) {
       if( response[i].Country[0].toLowerCase() === firstLetter ) {
            var option = document.createElement('option')
            option.value = response[i].Country
            option.textContent = response[i].Country
            countries.append(option)
       }
    }
}