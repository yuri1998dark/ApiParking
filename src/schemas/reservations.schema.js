import z from "zod";

export const reservationsSchema = z.object({


  body: z.object({
    startDateTime: z.string().refine(
      (value) => {
        // Expresión regular para validar el formato de fecha y hora con milisegundos
        const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/;
        return regex.test(value);
      },
      { message: "El formato de fecha de inicio de la reserva no es válido" }
    ),

    endDateTime: z.string().refine(
      (value) => {
        // Expresión regular para validar el formato de fecha y hora con milisegundos
        const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/;
        return regex.test(value);
      },
      { message: "El formato de fecha de fin de la reserva no es válido" }
    ),
    
  }),
});
