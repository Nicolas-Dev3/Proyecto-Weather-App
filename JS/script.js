
const API_KEY = "f62e56928171dbfe2a916b64cee1374d";
const formClima = document.getElementById("formClima")


//El localStorage no me funciona 😭
// if(localStorage.getItem("darkmode")){
//     if(localStorage.getItem("darkmode")==="true"){
//         document.body.classList.add("darkMode")
//     }
//     else{
//         document.body.classList.remove("darkMode")
//     }
// }

formClima.addEventListener("submit", (e) =>{
    e.preventDefault()

    const datForm = new FormData(e.target)
    
    fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${datForm.get("país")},${datForm.get("provincia")},${datForm.get("localidad")}}&appid=${API_KEY}`
    )
        .then((response) => response.json())
        .then((data) => {
            let { lat, lon, name, state, country } = data[0];
            const nombreDelPais=data[0].name;
            const nombreDelEstadoOProvincia=data[0].state;
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sp&units=metric&appid=${API_KEY}`
            )
                .then((response) => response.json())
                .then((json)=>{
                    document.getElementById("caja2").innerHTML=`
                        <p>El clima en ${nombreDelPais} es: ${json.weather[0].description}</p> <br/>
                        
                        <p>La temperatura es de: ${json.main.temp} °C </p>
                    `

                    document.getElementById("caja1").innerHTML=`
                    <p>País: ${nombreDelPais}</p> <br/>
                    <p>Provincia / Estado: ${nombreDelEstadoOProvincia}</p>
                    `

                    document.getElementById("caja3").innerHTML=`
                        <p>Sensación Térmica: ${json.main.feels_like}</p> <br/>
                        <p>Humedad: ${json.main.humidity}</p> <br/>
                        <p>Presión: ${json.main.pressure}</p>
                    `
                });

        })
        .catch( e =>{
            alert("No se encontró el lugar que desea encontrar")
        }) 
        ;
})





document.getElementById("labelSwitch").addEventListener("change",()=>{
    document.body.classList.toggle("darkMode")
})