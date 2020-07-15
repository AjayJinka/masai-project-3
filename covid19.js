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
            //console.log(response)
            displayCountries(response)
        }
        else {
            alert("The Error Code is : " + xhr.status)
        }
    }
    xhr.onerror = function(){
        alert("There is an Error in sending HTTP Request")
    }
}

function displayCountries(response){
    var countries = document.getElementById('countryList')
    for( var i = 0; i < response.length; i++ ) {
        var a = document.createElement('a')
        a.setAttribute('class', 'dropdown-item')
        a.textContent = response[i].Country
        //console.log(response[i].Country)
        countries.append(a)
    }
}