const PORT = 3030;

const express   = require("express");
const cors      = require("cors");
const fs        = require("fs");

const app       = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("assets"));

const server    = app.listen(PORT, () => console.log(`Listen at ${PORT}`));
const io        = require('socket.io')(server)

io.on('connection', (ws) => {
    console.log(`User Connected ==> ${ws.id}`)

    ws.on('new-message', (data) => {
        console.log('New Message ==>', data)
        let user = {
            user: data.user,
            message: data.message
        }
        io.emit('income-msg', user)
    })

})
app.get("/", (req, resp) => {
  resp.writeHead(200, { "Content-Type": "text/html" });
  let HTMLstream = fs.createReadStream(`${__dirname}/index.html`, "utf-8");
  HTMLstream.pipe(resp);
});
