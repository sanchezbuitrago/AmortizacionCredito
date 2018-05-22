function agregarformulario(numeroformulario)
{
    if(numeroformulario == 1)
    {
        var formulario = '<label for="ldeuda">Valor de la Deuda</label>';
        formulario = formulario + '<input type="text" id="deuda" name="deuda">';
        formulario = formulario + '<label for="lcuotas">Numero de Cuotas</label>';
        formulario = formulario + '<input type="text" id="cuotas" name="cuotas">';
        formulario = formulario + '<select id="tiempo" name="tiempo">';
        formulario = formulario + '<option value="mensual">Mensual</option>';
        formulario = formulario + '<option value="trimestral">Trimestral</option>';
        formulario = formulario + '<option value="semestral">Semestral</option>';
        formulario = formulario + '<option value="anual">Anual</option>';
        formulario = formulario + '</select>';
        formulario = formulario + '<label for="interes">Interes Efectivo Anual</label>';
        formulario = formulario + '<input type="text" id="interes" name="interes">';
        formulario = formulario + '<input type="submit" onclick="amortizarporcuotas(deuda.value,cuotas.value,interes.value,tiempo.options[tiempo.selectedIndex].value);">';
        formulario = formulario + '<input type="submit" value="Regresar" onclick="agregarformulario(3);">';
        document.getElementById("bloque_formulario").innerHTML = formulario;
    }
    if(numeroformulario==2){
        var formulario = '<label for="ldeuda">Valor de la Deuda</label>';
        formulario = formulario + '<input type="text" id="deuda" name="deuda">';
        formulario = formulario + '<label for="lcuotas">Valor de la Cuota</label>';
        formulario = formulario + '<input type="text" id="valorcuotas" name="cuotas">';
        formulario = formulario + '<select id="tiempo" name="tiempo">';
        formulario = formulario + '<option value="mensual">Mensual</option>';
        formulario = formulario + '<option value="trimestral">Trimestral</option>';
        formulario = formulario + '<option value="semestral">Semestral</option>';
        formulario = formulario + '<option value="anual">Anual</option>';
        formulario = formulario + '</select>';
        formulario = formulario + '<label for="interes">Interes Efectivo Anual</label>';
        formulario = formulario + '<input type="text" id="interes" name="interes">';
        formulario = formulario + '<input type="submit" onclick="amortizarporvalorcuota(deuda.value,valorcuotas.value,interes.value,tiempo.options[tiempo.selectedIndex].value);">';
        formulario = formulario + '<input type="submit" value="Regresar" onclick="agregarformulario(3);">';
        document.getElementById("bloque_formulario").innerHTML = formulario;
    }
    if(numeroformulario==3){
        var formulario = "";
        formulario = formulario + '<input type="submit" value="Amortizar por Numero de Cuotas" onclick="agregarformulario(1);">';
        formulario = formulario + '<input type="submit" value="Amortizar por Valor de la Cuota" onclick="agregarformulario(2);">';
        document.getElementById("bloque_formulario").innerHTML = formulario;
    }
}

function amortizarporcuotas(deuda, cuotas, interes, tiempo) {
    if (deuda == "" || cuotas == "" || interes == "") {
        alert("Los campos no puede estar vacios");
    } else {
        if(tiempo == "mensual")
        {
            interes = Math.pow((1+interes),(30/360))-1;
        }
        if(tiempo == "trimestral")
        {
            interes = Math.pow((1+interes),(90/360))-1;
        }
        if(tiempo == "semestral")
        {
            interes = Math.pow((1+interes),(180/360))-1;
        }

        $.ajax({

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            // la URL para la petición
            url: 'http://localhost:8080/AppCredito/servicios/amortizacioncuotas',

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

function amortizarporvalorcuota(deuda, valorcuota, interes,tiempo) {
    if (deuda == "" || valorcuota == "" || interes == "") {
        alert("Los campos no puede estar vacios");
    } else {
        if(tiempo == "mensual")
        {
            interes = Math.pow((1+interes),(30/360))-1;
        }
        if(tiempo == "trimestral")
        {
            interes = Math.pow((1+interes),(90/360))-1;
        }
        if(tiempo == "semestral")
        {
            interes = Math.pow((1+interes),(180/360))-1;
        }
        $.ajax({

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            // la URL para la petición
            url: 'http://localhost:8080/AppCredito/servicios/amortizacioncuotas',

            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data: JSON.stringify({ "deuda": deuda, "valorcuota": valorcuota, "interes": interes }),

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