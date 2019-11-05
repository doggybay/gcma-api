const { app } = require("./server")

const PORT = 8080
const HOST = '0.0.0.0'

app.listen(PORT, HOST, function() {
  console.log(`Running on  http://${HOST}:${PORT}`)
});
