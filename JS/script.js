window.addEventListener("load", () => {
    let longitud;
    let latitud;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((posicion) => {
            longitud = posicion.coords.longitude;
            latitud = posicion.coords.latitude;
        });
    }
});
