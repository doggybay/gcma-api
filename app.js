const { app } = require("./server");
const { HOST, PORT } = process.env

app.listen(PORT, HOST, function() {
  console.log(`Running on  http://${HOST}:${PORT}`);
});
