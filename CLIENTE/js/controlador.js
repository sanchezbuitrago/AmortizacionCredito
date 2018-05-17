function amortizardeuda(deuda, cuotas, interes) {
    if (deuda == "" || cuotas == "" || interes == "") {
        alert("Los campos no puede estar vacios");
    } else {
        $.ajax({

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            // la URL para la petición
            url: 'http://localhost:8080/AppCredito/servicios/amortizacion',

            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data: JSON.stringify({ "deuda": deuda, "cuotas": cuotas, "interes": interes }),

            // especifica si será una petición POST o GET
            type: 'POST',

            // el tipo de información que se espera de respuesta
            dataType: 'json',

            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success: function (json) {
                console.log(json);
                var miTabla = 
                '<table class="tablarespuesta" id="tablarespuesta">'+
                '<tr>'+
                '<th>Pago</th>'+
                '<th>Cuota</th>'+
                '<th>Interes</th>'+
                '<th>Amortizacion</th>'+
                '<th>Capital Vivo</th>'+
                '</tr>';
                console.log(miTabla);
                for (let i = 0; i <= cuotas; i++) {
                    miTabla = miTabla + "<tr>";
                    miTabla = miTabla + "<td>" + json[i].Pago+ "</td>";
                    miTabla = miTabla + "<td>" + json[i].Cuota+ "</td>";
                    miTabla = miTabla + "<td>" + json[i].Intereses+ "</td>";
                    miTabla = miTabla + "<td>" + json[i].Amortizacion+ "</td>";
                    miTabla = miTabla + "<td>" + json[i].CapitalVivo+ "</td>";
                    miTabla = miTabla + "</tr>";
                }
                document.getElementById('bloque_respuesta').innerHTML = miTabla;
            },

            // código a ejecutar si la petición falla;
            // son pasados como argumentos a la función
            // el objeto de la petición en crudo y código de estatus de la petición
            error: function (xhr, status) {
                alert('Disculpe, existió un problema, verifique los datos');
            }
        });
    }
}