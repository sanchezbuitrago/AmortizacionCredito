/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ServiciosAmortizacion;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * REST Web Service
 *
 * @author ASUS
 */
@Path("/amortizacioncuotas")
public class AmortizadorNumeroCuotas {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AmortizadorCredito
     */
    public AmortizadorNumeroCuotas() {
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postJson(String content) throws JSONException {

        System.out.println("Contenido : " + content);

        JSONObject datos = new JSONObject(content);
        int deuda = Integer.parseInt(datos.get("deuda").toString());
        int cuotas = Integer.parseInt(datos.get("cuotas").toString());
        double interes = Double.parseDouble(datos.get("interes").toString());
      

        double valorcuota;
        valorcuota = (deuda * (interes / 100));
        valorcuota = (valorcuota / (Math.pow((1 + (interes / 100)), cuotas) - 1));
        valorcuota = valorcuota + (deuda * (interes / 100));

        JSONObject respuesta = new JSONObject();
        JSONObject fila = new JSONObject();

        double valorintereses = 0;
        double valoramortizacion = 0;
        double capitalvivo = deuda;

        fila.put("Pago", 0);
        fila.put("Cuota", 0);
        fila.put("Intereses",valorintereses);
        fila.put("Amortizacion", valoramortizacion);
        fila.put("CapitalVivo", capitalvivo);
        respuesta.put("0", fila);

        for (int i = 1; i <= cuotas; i++) {
            valorintereses = capitalvivo * interes / 100;
            valoramortizacion = valorcuota - valorintereses;
            capitalvivo = capitalvivo - valoramortizacion;
            
            fila = new JSONObject();
            fila.put("Pago", i);
            fila.put("Cuota", valorcuota);
            fila.put("Intereses", valorintereses);
            fila.put("Amortizacion", valoramortizacion);
            fila.put("CapitalVivo", capitalvivo);
            
            respuesta.put(""+i, fila);
        }

        System.out.println("Respuesta : " + respuesta.toString());

        return Response.status(Response.Status.OK).entity(respuesta.toString()).build();
    }

    /**
     * Retrieves representation of an instance of
     * ServicioAmortizacion.AmortizadorCredito
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getJson() throws JSONException {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        JSONObject respuesta = new JSONObject();
        respuesta.put("Numero", 0);
        return Response.ok(respuesta.toString()).header("Access-Control-Allow-Origin", "*").build();
    }

    /**
     * PUT method for updating or creating an instance of AmortizadorCredito
     *
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
