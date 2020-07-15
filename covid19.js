window.addEventListener('DOMContentLoaded', function(){
   //getCountries()
})

function getCountries(){
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

var globe = document.getElementById('globe')
globe.addEventListener('click', function(){
    var xhr = new XMLHttpRequest()
    var url = "https://api.covid19api.com/world/total"
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function(){
        if( xhr.status === 200 ) {
            var response = JSON.parse(xhr.response)
            displayGlobe(response)
        }
        else {
            alert("The Error Code is : " + xhr.status)
        }
    }
    xhr.onerror = function(){
        alert("There is an Error in sending HTTP Request")
    }
})

function displayGlobe(response){
    var tableRow = document.getElementById('tableRow')
    tableRow.innerHTML = ""
    var thead = document.getElementById('thead')
    thead.style.visibility = "visible"
    for( key in response ) {
        var td = document.createElement('td')
        td.textContent = response[key]
        td.setAttribute('class', 'border text-center font-weight-bold')
        tableRow.append(td)
    }
}