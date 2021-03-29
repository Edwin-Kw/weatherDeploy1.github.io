var mainbody = document.getElementsByTagName("body")[0];

mainbody.innerHTML = '<header id="header1"><h1>My Weather Portal</h1></header>'
mainbody.innerHTML += '<div id="firstlayer"><div id="h"><h2>Hong Kong</h2></div><div id="headerBlock"><img id="p1"><img id="p2"></div></div>'
mainbody.innerHTML += '<div id="secondlayer"><h1>sec</h1><div id="myLocation"><h1 in="header2_1">My Location</h1><div id="items-wrapper"></div></div><div id="temperatureofDL"><h1 id="header2_2">Temperatures</h1><h4 id="box3sel">Select the location</h4><div id="items-wrapper2"><select id="station"></select></div></div></div>'
mainbody.innerHTML += '<div id="thirdlayer"><h1>th</h1><div id="ninedayForecast"></div></div>'

/* First block var headerBlock = document.createElement("div");*/




/* Second block */


/* Third block */


/* Fourth block */
var changedOpt = 0;
var dcName = "";
var tempartureNum2 = document.createElement("span");
    tempartureNum2.id = "tempartureNum2";
function selectFunction(){
    var x = document.getElementById("station").value;
    
    tempartureNum2.innerHTML=x;
}

async function fetchRequestCurrent(){
    try {
        let response = await fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en');
        if (response.status == 200) {
            let data = await response.json();
            
            document.getElementById('firstlayer').setAttribute("style","background-image: url('images/blue-sky.jpg');");
            /* topic */
            var h2 = document.createElement("h2");
            h2.innerHTML= "Hong Kong";
            /* element*/
            var wicon = document.createElement("img");
            wicon.id = "wicon";
            wicon.setAttribute("src","https://www.hko.gov.hk/images/HKOWxIconOutline/pic"+data.icon[0]+".png");
            document.getElementById('headerBlock').append(wicon);
            
            var tempartureBox = document.createElement("div");
            tempartureBox.id = "tempartureBox";
            var tempartureNum = document.createElement("span");
            tempartureNum.id = "tempartureNum";
            tempartureNum.innerHTML = data.temperature.data[1].value;
            var tempartureC = document.createElement("p");
            tempartureC.id = "tempartureC";
            tempartureC.innerHTML = "°C";
            tempartureBox.append(tempartureNum);
            tempartureBox.append(tempartureC);
            document.getElementById('headerBlock').append(tempartureBox);
            
            var  humidityBox = document.createElement("div");
            humidityBox.id = "humidityBox";
            var humidityPic = document.createElement("img");
            humidityPic.id = "humidityPic";
            humidityPic.setAttribute("src","images/drop-48.png");
            var humidityNum = document.createElement("span");
            humidityNum.id = "humidityNum";
            humidityNum.innerHTML = data.humidity.data[0].value;
            var humiditySign = document.createElement("p");
            humiditySign.id = "humiditySign";
            humiditySign.innerHTML = "%";
            humidityBox.append(humidityPic);
            humidityBox.append(humidityNum);
            humidityBox.append(humiditySign);
            document.getElementById('headerBlock').append(humidityBox);

            var  rainfallBox = document.createElement("div");
            rainfallBox.id = "rainfallBox";
            var rainfallPic = document.createElement("img");
            rainfallPic.id = "rainfallPic";
            rainfallPic.setAttribute("src","images/rain-48.png");
            var rainfallNum = document.createElement("span");
            rainfallNum.id = "rainfallNum";
            rainfallNum.innerHTML = data.rainfall.data[13].max;
            var rainfallNumSign = document.createElement("p");
            rainfallNumSign.id = "rainfallNumSign";
            rainfallNumSign.innerHTML = "mm";
            rainfallBox.append(rainfallPic);
            rainfallBox.append(rainfallNum);
            rainfallBox.append(rainfallNumSign);
            document.getElementById('headerBlock').append(rainfallBox);

            var uvBox = document.createElement("div");
            uvBox.id = "uvBox";
            var uvPic = document.createElement("img");
            uvPic.id = "uvPic";
            uvPic.setAttribute("src","images/UVindex-48.png");
            var uvNum = document.createElement("span");
            uvNum.id = "uvNum";
            if (data.uvindex.data == undefined){
                console.log("asdasd");
                document.getElementById('headerBlock').append(uvBox);
            } else {
                uvNum.innerHTML = data.uvindex.data[0].value;
                console.log("dasd");
                uvBox.append(uvPic);
                uvBox.append(uvNum);
                document.getElementById('headerBlock').append(uvBox);
            }
            var warnBox = document.createElement("div");
            warnBox.id = "warnBox";
            var warnButton = document.createElement("button");
            warnButton.id = "warnButton";
            var warnHead = document.createElement("h2");
            warnHead.id = "warnHead";
            warnHead.innerHTML = "Warning";
            warnBox.append(warnHead);
            if (data.warningMessage[0] == undefined){
                console.log("asdasdasdsd");
            } else {
                var warnMess = document.createElement("h3");
                console.log("dasd");
                warnMess.id="warnMess";
                warnMess.innerHTML="";
                console.log(data.warningMessage.length);
                for (var i =0; i< data.warningMessage.length;i++){
                    warnMess.innerHTML += data.warningMessage[i];
                }
                warnBox.append(warnMess);
                document.getElementById('headerBlock').append(warnBox);
                var counter = 0;
                /* document.getElementById("warnButton").addEventListener("click", function() {
                    warnMess.innerHTML="";
                    for (var i =0; i<data.warningMessage.length();i++){
                        warnMess.innerHTML += data.warningMessage[i];
                    }
                    if (counter == 1){
                        warnMess.setAttribute("style","display:none;");
                        counter = 0;
                    }   else if(counter == 0){
                        warnMess.setAttribute("style","display:inline;");
                        counter = 1;
                    }
                    warnBox.append(warnMess);
                    document.getElementById('headerBlock').append(warnBox);
                }); */
            }
            var lupdateBox = document.createElement("div");
            lupdateBox.id = "lupdateBox";
            var lupdateNum = document.createElement("p");
            lupdateNum.id = "lupdateNum";
            lupdateNum.innerHTML = "Last update:" + data.updateTime.slice(11, 16);
            lupdateBox.append(lupdateNum);
            document.getElementById('headerBlock').append(lupdateBox);
            var llat = 0;
            var llng = 0;
            try {
                let response2 = await fetch('data/aqhi-station-info.json');
                if (response2.status == 200) {
                    console.log(data);
                    document.getElementById('myLocation').setAttribute("style","background-color:LightGreen;");
                    function geoFindMe() {
                        var output = document.createElement("p");
                        output.innerHTML = "Locating…";
                        if (!navigator.geolocation){
                            output.innerHTML = "Geolocation is not supported by your browser";
                            return;
                        }
                        
                        function success(position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                            output.innerHTML = '<p>Latitude is ' + pos.lat + '° <br>Longitude is ' + pos.lng + '°</p>';
                            /* gmap.setView(new ol.View({
                            center: ol.proj.fromLonLat([pos.lng, pos.lat]),
                            zoom: 15
                            })); */
                            llat = JSON.parse(JSON.stringify(pos.lat));
                            llng = JSON.parse(JSON.stringify(pos.lng));
                            console.log(llat);
                            console.log(llng);
                            document.getElementById('items-wrapper').append(output);
                            let locaAPI= 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+pos.lat+'&lon='+pos.lng+'&zoom=18&addressdetails=1&accept-language=en-US';
                            fetch(locaAPI).then(response4 => response4.json()).then(data4=>{
                                let borough = data4.address.borough;
                                let suburb = data4.address.suburb;
                                let town = data4.address.town;
                                let county = data4.address.county;
                                let city_district = data4.address.city_district;
                                var district1 = document.createElement("p");
                                district1.id = "district1";
                                var suburb1 = document.createElement("p");
                                suburb1.id = "suburb1";
                                if (suburb){
                                    suburb1.innerHTML = suburb;
                                }
                                else if (borough){
                                    suburb1.innerHTML = borough;
                                }
                                else if (town){
                                    suburb1.innerHTML = town;
                                }
                                else{
                                    suburb1.innerHTML = 'Undefined';
                                }

                                if (city_district){
                                    district1.innerHTML = city_district;
                                }
                                else if (county){
                                    district1.innerHTML = county;
                                }
                                else{
                                    district1.innerHTML = 'Undefined';
                                }



                                /* var district1 = document.createElement("p");
                                district1.id = "district1";
                                district1.innerHTML = data4.address.town;

                                var suburb1 = document.createElement("p");
                                suburb1.id = "suburb1";
                                suburb1.innerHTML = data4.address.suburb; */

                                document.getElementById('items-wrapper').append(district1);
                                document.getElementById('items-wrapper').append(suburb1);
                                /* temp */
                                var tempartureBox1 = document.createElement("div");
                                tempartureBox1.id = "tempartureBox1";
                                var tempartureNum1 = document.createElement("span");
                                tempartureNum1.id = "tempartureNum1";
                                console.log(data.temperature.data);
                                for (var i= 0; i<data.temperature.data.length; i++){
                                    if (data.temperature.data[i].place.slice(0,5).localeCompare(district1.innerHTML.slice(0,5)) == 0){
                                        tempartureNum1.innerHTML = data.temperature.data[i].value;
                                    }
                                }
                                for (var i= 0; i<data.temperature.data.length; i++){
                                    if (data.temperature.data[i].place.slice(0,5).localeCompare(suburb1.innerHTML.slice(0,5)) == 0){
                                        tempartureNum1.innerHTML = data.temperature.data[i].value;
                                    }
                                }
                                
                                
                                var tempartureC1 = document.createElement("p");
                                tempartureC1.id = "tempartureC1";
                                tempartureC1.innerHTML = "°C";
                                tempartureBox1.append(tempartureNum1);
                                tempartureBox1.append(tempartureC1);
                                document.getElementById('items-wrapper').append(tempartureBox1);


                                /* rainfall */

                                var  rainfallBox1 = document.createElement("div");
                                rainfallBox1.id = "rainfallBox1";
                                var rainfallPic1 = document.createElement("img");
                                rainfallPic1.id = "rainfallPic1";
                                rainfallPic1.setAttribute("src","images/rain-48.png");
                                var rainfallNum1 = document.createElement("span");
                                rainfallNum1.id = "rainfallNum1";
                                for (var i= 0; i<data.rainfall.data.length; i++){
                                    if (data.rainfall.data[i].place.slice(0,5).localeCompare(district1.innerHTML.slice(0,5)) == 0){
                                        rainfallNum1.innerHTML = data.rainfall.data[i].max;
                                        
                                    }
                                }
                                for (var i= 0; i<data.rainfall.data.length; i++){
                                    if (data.rainfall.data[i].place.slice(0,5).localeCompare(suburb1.innerHTML.slice(0,5)) == 0){
                                        rainfallNum1.innerHTML = data.rainfall.data[i].max;
                                        
                                    }
                                }
                                
                                
                                var rainfallNumSign1 = document.createElement("p");
                                rainfallNumSign1.id = "rainfallNumSign1";
                                rainfallNumSign1.innerHTML = "mm";
                                rainfallBox1.append(rainfallPic1);
                                rainfallBox1.append(rainfallNum1);
                                rainfallBox1.append(rainfallNumSign1);
                                document.getElementById('items-wrapper').append(rainfallBox1);

                                

                                var smallest = 100000;
                                var smallestLo = "";
                                var aqBox1 = document.createElement("div");
                                aqBox1.id = "aqBox1";
                                var aqPic1 = document.createElement("img");
                                aqPic1.id = "aqPic1";
                                var aqNum1 = document.createElement("span");
                                aqNum1.id = "aqNum1";
                                var aqNumSign1 = document.createElement("p");
                                aqNumSign1.id = "aqNumSign1";

                                fetch('data/ogciopsi.json').then(response5 => response5.json()).then(data5=>{
                                    console.log(data5);
                                    for (var i= 0; i<data5.length; i++){
                                        

                                        const x = (data5[i].longitude* Math.PI/180 - llng* Math.PI/180) * Math.cos((llat* Math.PI/180+data5[i].latitude* Math.PI/180)/2);
                                        const y = (data5[i].latitude* Math.PI/180 - llat* Math.PI/180);
                                        const d = Math.sqrt(x*x + y*y) * 6371;
                                        console.log(d);

                                        if (d < smallest){
                                            smallest = d;
                                            smallestLo = data5[i].station_name_en;
                                            console.log(data5[i].station_name_en);
                                            
                                            
                                        }
                                    }
                                    fetch('https://dashboard.data.gov.hk/api/aqhi-individual?format=json').then(response6 => response6.json()).then(data6=>{
                                        console.log(data6);
                                        for (var j=0;j<data6.length;j++){
                                            if (data6[j].station.slice(0,5).localeCompare(smallestLo.slice(0,5) == 0)) {
                                                aqNum1.innerHTML = data6[j].aqhi;
                                                aqNumSign1.innerHTML = data6[j].health_risk.toUpperCase();
                                                aqPic1.setAttribute("src","images/aqhi-"+data6[j].health_risk.toLowerCase()+".png");
                                            }
                                        }
                                        
                                        
                                        /* aqPic1.setAttribute("src","images/aqhi-low.png");
                                        
                                        aqNum1.innerHTML = data.rainfall.data[13].max;
                                        
                                        aqNumSign1.innerHTML = "LOW"; */

                                        aqBox1.append(aqPic1);
                                        aqBox1.append(aqNum1);
                                        aqBox1.append(aqNumSign1);
                                        document.getElementById('items-wrapper').append(aqBox1);
                                    })
                                })
                                /* var box3head = document.createElement("h2");
                                box3head.id = "box3head";
                                box3head.innerHTML = "Temperature";
                                document.getElementById('temperatureofDL').append(box3head); */

                                /* var box3sel = document.createElement("h4");
                                box3sel.id = "box3sel";
                                box3sel.innerHTML = "Select the location";
                                document.getElementById('temperatureofDL').append(box3sel); */
                                
                                
                                var tempartureBox2 = document.createElement("div");
                                tempartureBox2.id = "tempartureBox2";
                                
                                
                                

                                var stationList = [];
                                for (var k = 0; k < data.temperature.data.length;k++){
                                    stationList.push(data.temperature.data[k].place);
                                }
                                stationList.sort();
                                for (var k = 0; k < data.temperature.data.length;k++){
                                    if (stationList[0].localeCompare(data.temperature.data[k].place)==0){
                                        tempartureNum2.innerHTML = data.temperature.data[k].value;
                                    }
                                }
                                document.getElementById("station").setAttribute("onChange","selectFunction()");

                                /* document.getElementById("station").onChange = function() {
                                    var x = document.getElementById("station").value;
                                    console.log(x+"asdasd");
                                    for (var k = 0; k < data.temperature.data.length;k++){
                                        if (x.localeCompare(data.temperature.data[k].place)==0){
                                            tempartureNum2.innerHTML = data.temperature.data[k].value;
                                        }
                                    }
                                }; */
                                for (var k = 0; k < stationList.length;k++){
                                    var stationName = document.createElement("option");
                                    for (var i = 0; i < data.temperature.data.length;i++){
                                        if (stationList[k].localeCompare(data.temperature.data[i].place)==0){
                                            stationName.setAttribute("value",data.temperature.data[i].value);
                                            
                                        }
                                    }
                                    
                                    stationName.innerHTML=stationList[k];
                                    document.getElementById("station").append(stationName);
                                    
                                }
                                
                                console.log(stationList);
                                /* document.getElementsById("station").append() */
                                

                                var tempartureC2 = document.createElement("p");
                                tempartureC2.id = "tempartureC2";
                                tempartureC2.innerHTML = "°C";
                                tempartureBox2.append(tempartureNum2);
                                tempartureBox2.append(tempartureC2);
                                document.getElementById('temperatureofDL').append(tempartureBox2);


                                

                                
                                
                                
                                
                                console.log(data4.address.suburb);
                            })

/*                             console.log('https://nominatim.openstreetmap.org/reverse?format=json&lat='+String(pos.lat).substring(0,8)+'&lon='+String(pos.lng).substring(0,9)+'&zoom=18&addressdetails=1');
 */                          
                            /* console.log('https://nominatim.openstreetmap.org/reverse?format=json&lat='+pos.lat+'&lon='+pos.lng+'&zoom=18&addressdetails=1&accept-language=en-US'); */ 
                        }
                        function error() {
                            output.innerHTML = "Unable to retrieve your location";
                            }
                        navigator.geolocation.getCurrentPosition(success, error);
                        
                        
                    }
                    geoFindMe();
                    
                    /* console.log('https://nominatim.openstreetmap.org/reverse?format=json&lat='+llat+'&lon='+llng+'&zoom=18&addressdetails=1&accept-language=en-US');
                    console.log(llat);
                    console.log(llng);
                    var locaAPI = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${llat}&lon=${llng}&zoom=18&addressdetails=1&accept-language=en-US`;
                    try {
                        let response4 = await fetch(locaAPI);
                        if (response4.status == 200) {
                            var data4 = await response4.json();
                            console.log(llat);
                            console.log(llng);
                            console.log(data4.lat);
                            console.log(data4.lon);
                            console.log(data4.display_name);
                        } else {
                            console.log("HTTP return status: "+response4.status);
                        }
                        } catch(err) {
                            console.log("Fetch Error!");
                    } 
                    
                    document.getElementById('items-wrapper').append(); */
                   
                        
                } else {
                    console.log("HTTP return status: "+response2.status);
                }
            } catch(err) {
                    console.log("Fetch Error!");
            }

            try {
                let response3 = await fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en');
                if (response3.status == 200) {

                } else {
                    console.log("HTTP return status: "+response3.status);
                }
                } catch(err) {
                    console.log("Fetch Error!");
            }


            
            





        
            /* document.getElementById('p1').setAttribute("src","https://www.hko.gov.hk/images/HKOWxIconOutline/pic"+data.icon[0]+".png");
            document.getElementById('p2').setAttribute("src","https://www.hko.gov.hk/images/HKOWxIconOutline/pic"+63+".png"); */
            /* output.innerHTML = '<img src="https://www.hko.gov.hk/images/HKOWxIconOutline/pic'+data.icon[0]+'.png">'; */
            /* document.getElementById('headerBlock').append(h2); */
            
    
            
            console.log(document.getElementById('headerBlock').childNodes);

            
            /* const {rainfall,icon,uvindex,temparture,warningMessage} = data */
            
            
            
        } else {
            console.log("HTTP return status: "+response.status);
        }
    } catch(err) {
        console.log("Fetch Error!");
    }
}

async function fetchRequest9Day() {
    try {
        let response2 = await fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en');
        if (response2.status == 200) {
            const data2 = await response2.json();
            console.log(data2);
            
            var header3 = document.createElement("h2");
            header3.id = "header3";
            header3.innerHTML = "9-day Forecast";
            document.getElementById('ninedayForecast').append(header3);
            document.getElementById('ninedayForecast').setAttribute("style","background-color:LightGray;");
            for (var i = 0; i< 9; i++) {
                var dayBlock = document.createElement("div");
                dayBlock.className = "dayBlock";
                var date = document.createElement("p");
                date.className = "date";
                date.innerHTML = data2.weatherForecast[i].week.slice(0, 3) + " " + data2.weatherForecast[i].forecastDate.slice(6, 8)+ "/" + data2.weatherForecast[i].forecastDate.slice(4, 6);
                dayBlock.append(date);
                
                var wicon2 = document.createElement("img");
                wicon2.id = "wicon2";
                wicon2.setAttribute("src","https://www.hko.gov.hk/images/HKOWxIconOutline/pic"+data2.weatherForecast[i].ForecastIcon+".png");
                dayBlock.append(wicon2);
                var dayTemp = document.createElement("p");
                dayTemp.className = "dayTemp";
                dayTemp.innerHTML = data2.weatherForecast[i].forecastMintemp.value + "-" + data2.weatherForecast[i].forecastMaxtemp.value + " °C";
                dayBlock.append(dayTemp);
                var dayHum = document.createElement("p");
                dayHum.className = "dayHum";
                dayHum.innerHTML = data2.weatherForecast[i].forecastMinrh.value + "-" + data2.weatherForecast[i].forecastMaxrh.value + " %";
                dayBlock.append(dayHum);
                

                document.getElementById('ninedayForecast').append(dayBlock);
                
                
            }
        } else {
            console.log("HTTP return status: "+response2.status);
        }
    } catch(err) {
        console.log("Fetch Error!");
    }
}

async function fetchRequestOGC() {
    try {
        let response3 = await fetch('https://ogciopsi.blob.core.windows.net/dataset/weather-station/weather-station-info.json');
        if (response3.status == 200) {
            let data3 = await response3.json();
            console.log(data3);
            
        } else {
            console.log("HTTP return status: "+response3.status);
        }
    } catch(err) {
        console.log("Fetch Error!");
    }
}

/*https://nominatim.openstreetmap.org/reverse?format=json&lat=22.28408&lon=114.13790&zoom=18&addressdetails=1&accept-language=en-US  */


fetchRequestCurrent()
fetchRequest9Day()
/* fetchRequestOGC() */
