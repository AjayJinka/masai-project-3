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
        createRangeDates()
    }
    else if( event.target.id === "selectedRange" ) {
        compareDates()
    }
})

function createDate(){
    var calendar = document.getElementById('calendar')
    calendar.innerHTML = ""
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

function createRangeDates() {
    var calendar = document.getElementById('calendar')
    calendar.innerHTML = ""
    var dateFrom = document.createElement('input')
    dateFrom.setAttribute('id', 'desiredFrom')
    dateFrom.type = "date"
    var from = document.createElement('div')
    from.textContent = "From"
    from.setAttribute('class', 'font-weight-bold')
    var small = document.createElement('small')
    small.textContent = "Select From Date"
    small.setAttribute('class', 'ml-2 text-muted')
    from.append(small)

    var dateTo = document.createElement('input')
    dateTo.setAttribute('id', 'desiredTo')
    dateTo.type = "date"
    var to = document.createElement('div')
    to.textContent = "To"
    to.setAttribute('class', 'mt-5 font-weight-bold')
    var small = document.createElement('small')
    small.textContent = "Select To Date"
    small.setAttribute('class', 'ml-2 text-muted')
    to.append(small)


    calendar.append(from,dateFrom, to,dateTo)

    dateTo.addEventListener('change',function(){
        var fromDate = new Date(dateFrom.value)
        var toDate = new Date(dateTo.value)
        displayselectedRange(fromDate, toDate)
    })
}

function displaySelectedDay(date, dateDup){
    var flagy = false
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
            
            for( var k = 0; k < response.length; k++ ) {
                if( response[k].Province !== "" ) {
                    flagy = true;
                    break;
                }
            }
            if( flagy === false ) {
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
                for( m = response.length-1; m >=0 ; m-- ) {
                    if( new Date(response[m].Date).toLocaleDateString() !== new Date(date).toLocaleDateString() ) {
                        response.pop()
                    }
                    else {
                        break;
                    }
                }  
                
                var obj = {
                "Confirmed": 0,
                "Deaths": 0,
                "Recovered": 0,
                "Active": 0,
                }

                for( var z = 0; z < response.length; z++ ) {
                    obj.Confirmed += Number(response[z].Confirmed)
                    obj.Deaths += Number(response[z].Deaths)
                    obj.Recovered += Number(response[z].Recovered)
                    obj.Active += Number(response[z].Active)
                }

                for( key in obj ) {
                var td = document.createElement('td')
                td.textContent = obj[key]
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

function displayselectedRange(fromDate, toDate) {
    var flagy = false
    fromDate = fromDate.toISOString()
    toDate = toDate.toISOString()
    var selectedCountry = document.querySelector('#countryList').value
    var xhr = new XMLHttpRequest()
    var url = "https://api.covid19api.com/country/"
    url = url + selectedCountry + "?from=" + fromDate + "&to=" + toDate
    xhr.open('GET', url)
    xhr.send()
    xhr.onload = function(){
        if( xhr.status === 200 ) {
            var response = JSON.parse(xhr.response)
            var dispCountry = document.getElementById('dispCountry')
            dispCountry.innerHTML = ""
            dispCountry.textContent = selectedCountry +  " : Covid Data Between " + new Date(fromDate).toLocaleDateString() + " & " + new Date(toDate).toLocaleDateString()
            var headRow = document.getElementById('headRow')
            if( headRow.lastChild.textContent !== "Date" ) {
                var th = document.createElement('th')
                th.setAttribute('class', 'border font-weight-normal text-center')
                th.textContent = "Date"
                headRow.append(th)
            }
            var resultHead = document.getElementById('resultHead')
            resultHead.style.visibility = "visible"
            var tbody = document.getElementById('tbody')
            tbody.innerHTML = ""
            
            for( var k = 0; k < response.length; k++ ) {
                if( response[k].Province !== "" ) {
                    flagy = true;
                    break;
                }
            }
            if( flagy === false ) {
                
                for( var p = 0; p < response.length; p++ ){
                        
                    var tr = document.createElement('tr')

                    var td1 = document.createElement('td')
                    td1.textContent = response[p].Confirmed
                    td1.setAttribute('class', 'border text-center font-weight-bold')

                    var td2 = document.createElement('td')
                    td2.textContent = response[p].Deaths
                    td2.setAttribute('class', 'border text-center font-weight-bold')

                    var td3 = document.createElement('td')
                    td3.textContent = response[p].Recovered
                    td3.setAttribute('class', 'border text-center font-weight-bold')

                    var td4 = document.createElement('td')
                    td4.textContent = response[p].Active
                    td4.setAttribute('class', 'border text-center font-weight-bold')

                    var td5 = document.createElement('td')
                    td5.textContent = new Date(response[p].Date).toLocaleDateString()
                    td5.setAttribute('class', 'border text-center font-weight-bold')

                    tr.append(td1, td2, td3, td4,td5)

                    tbody.append(tr)

                }
            }
            else {
                var fDate  = Number(new Date(fromDate).getDate())
                var tDate  = Number(new Date(toDate).getDate())

                var n = tDate - fDate + 1

                for( k = 0; k < n; k++ ) {
                    var tr2 = document.createElement('tr')
                    var obj = {
                        "Confirmed": 0,
                        "Deaths": 0,
                        "Recovered": 0,
                        "Active": 0,
                        "Date":""
                        }
                    for( m = 0; m < response.length ; m++ ) {
                        if( new Date(response[m].Date).toLocaleDateString() === new Date(fromDate).toLocaleDateString() ) {
                            obj.Confirmed += Number(response[m].Confirmed)
                            obj.Deaths += Number(response[m].Deaths)
                            obj.Recovered += Number(response[m].Recovered)
                            obj.Active += Number(response[m].Active)
                            obj.Date = new Date(response[m].Date).toLocaleDateString()
                        }
                    }  
                    
                    for( key in obj ) {
                    var td = document.createElement('td')
                    td.textContent = obj[key]
                    td.setAttribute('class', 'border text-center font-weight-bold')
                    tr2.append(td)
                    }
                    tbody.append(tr2)

                    fromDate = new Date(fromDate)
                    fromDate = fromDate.setDate(fromDate.getDate()+1)
    
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