function peticion()
{
    $.ajax({

        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
      
        // la URL para la petición
        url : 'http://localhost:8080/AppCredito/servicios/amortizacion',
     
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data : JSON.stringify({"deuda":"12000","cuotas":"5","interes":"7.1"}),
     
        // especifica si será una petición POST o GET
        type : 'POST',
        
        // el tipo de información que se espera de respuesta
        dataType : 'json',
     
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(json) {
            console.log(json);
        },
     
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
     
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            alert('Petición realizada');
        }
    });
}