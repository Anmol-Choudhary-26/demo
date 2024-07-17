const Pusher = require("pusher");

 const pusher = new Pusher({
    appId: "1756008",
    key: "901c45c53f799da99667",
    secret: "04ac470934f0d3bb936f",
    cluster: "ap3",
    useTLS: true
  });
  
  pusher.trigger("chat", "whatsappEvent", {
    message: "hello world"
  });

  module.exports = pusher