const { io } = require("../server");
const { TicketControl } = require("./classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguiente();

    console.log(siguiente);
    callback(siguiente);
  });

  client.emit("actualTicket", {
    actual: ticketControl.getUltimoTicket(),
    utlimos4: ticketControl.getUltimo4(),
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: "escritorio necesario",
      });
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);
    client.broadcast.emit("actualTicket", {
      actual: ticketControl.getUltimoTicket(),
      utlimos4: ticketControl.getUltimo4(),
    });
  });
});
