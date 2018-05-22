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
@Path("/amortizacionpago")
public class AmortizacionValorPago {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AmortizacionValorPago
     */
    public AmortizacionValorPago() {
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response postJson(String content) throws JSONException {
        JSONObject datos = new JSONObject(content);
        int deuda = Integer.parseInt(datos.getString("deuda"));
        double interes = Double.parseDouble(datos.getString("interes"));
        double valorcuota = Double.parseDouble(datos.getString("valorcuota"));

        double cuotas;
        cuotas = -Math.log(1 - ((interes / 100) * deuda / valorcuota)) / Math.log(1 + (interes / 100));
        cuotas = Math.round(cuotas);

        JSONObject respuesta = new JSONObject();
        JSONObject fila = new JSONObject();

        double valorintereses = 0;
        double valoramortizacion = 0;
        double capitalvivo = deuda;
        fila.put("numerocuotas", cuotas);
        fila.put("Pago", 0);
        fila.put("Cuota", 0);
        fila.put("Intereses", valorintereses);
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

            respuesta.put("" + i, fila);
        }

        System.out.println("Respuesta : "+cuotas+"---"+ respuesta.toString());

        return Response.status(Response.Status.OK).entity(respuesta.toString()).build();
    }

    /**
     * Retrieves representation of an instance of
     * ServiciosAmortizacion.AmortizacionValorPago
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of AmortizacionValorPago
     *
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
