var socket = io();

let label = $("#lblNuevoTicket");

socket.on("connect", function () {
  console.log("Conectado al servidor");

  socket.on("actualTicket", function (data) {
      console.log(data)
    label.text(data.actual);
  });
});

socket.on("disconnect", function () {
  console.log("Desconectado al servidor");
});

$("button").on("click", function () {
  socket.emit("siguienteTicket", null, function (siguienteTicket) {
    console.log(siguienteTicket);
    label.text(siguienteTicket);
  });
});
