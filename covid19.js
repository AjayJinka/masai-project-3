window.addEventListener('DOMContentLoaded', function(){
   getCountries()
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

var waytoDisplay = document.getElementById('wayToDisplay')
waytoDisplay.addEventListener('click', function(){
    if(event.target.id === "selectedDay") {
        createDate()
    }
    else if(event.target.id === "selectedRange") {
        displayselectedRange()
    }
    else if( event.target.id === "selectedRange" ) {
        compareDates()
    }
})

function createDate(){
    var calendar = document.getElementById('calendar')
    var dateInp = document.createElement('input')
    dateInp.setAttribute('id', 'desiredDate')
    dateInp.type = "date"
    var div = document.createElement('div')
    var small = document.createElement('small')
    small.textContent = "Select your desired Date"
    small.setAttribute('class', 'text-muted')
    div.append(small)
    calendar.append(dateInp, div)

    dateInp.addEventListener('change',function(){
        var date = new Date(dateInp.value)
        var dateDup = new Date(dateInp.value)
        displaySelectedDay(date, dateDup)
    })
    
}

function displaySelectedDay(date, dateDup){

    date = date.toISOString()
    dateDup = dateDup.setDate(dateDup.getDate()+1)
    dateDup = new Date(dateDup).toISOString()
    var selectedCountry = document.querySelector('#countryList').value

    var xhr = new XMLHttpRequest()
    var url = "https://api.covid19api.com/country/"
    url = url + selectedCountry + "?from=" + date + "&to=" + dateDup
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function(){
        if( xhr.status === 200 ) {
            var response = JSON.parse(xhr.response)
            var dispCountry = document.getElementById('dispCountry')
            dispCountry.innerHTML = ""
            dispCountry.textContent = selectedCountry + " on " + new Date(date).toLocaleDateString()
        
            var resultHead = document.getElementById('resultHead')
            resultHead.style.visibility = "visible"
            var resultFromAPI = document.getElementById('resultFromAPI')
            resultFromAPI.innerHTML = ""
            for( key in response[0] ){
                if( key === 'Confirmed' ) {
                    var td = document.createElement('td')
                    td.textContent = response[0][key]
                    td.setAttribute('class', 'border text-center font-weight-bold')
                    resultFromAPI.append(td)
                }
                else if( key === 'Deaths' ) {
                    var td = document.createElement('td')
                    td.textContent = response[0][key]
                    td.setAttribute('class', 'border text-center font-weight-bold')
                    resultFromAPI.append(td)
                }
                else if( key === 'Recovered') {
                    var td = document.createElement('td')
                    td.textContent = response[0][key]
                    td.setAttribute('class', 'border text-center font-weight-bold')
                    resultFromAPI.append(td)
                }
                else if( key === 'Active' ) {
                    var td = document.createElement('td')
                    td.textContent = response[0][key]
                    td.setAttribute('class', 'border text-center font-weight-bold')
                    resultFromAPI.append(td)
                }
            }
        }
        else {
            alert("The Error Code is : " + xhr.status)
        }
    }
    xhr.onerror = function(){
        alert("There is an Error in sending HTTP Request")
    }
    
}