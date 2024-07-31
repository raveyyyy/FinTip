const express = require("express"),
  app = express(),
  path = require("path"),
  http = require("http"),
  { Server } = require("socket.io"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  whitelisted = require("./middleware/whitelist"),
  whitelist = require("./config/whitelist");
require("dotenv").config();

// ENV connection to MongoDB
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const corsConfig = {
  origin: whitelist, // Do not use wildcard`
  methods: ["GET", "POST", "PUT", "DELETE"], // List only` available methods
  credentials: true, // Must be set to true

  allowedHeaders: [
    "Origin",
    "Content-Type",
    "X-Requested-With",
    "x-xsrf-token",
    "Accept",
    "Authorization",
  ], // Allowed Headers to be received
};

app.use(cors(corsConfig)); // Pass configuration to cors
const server = http.createServer(app);

// Used to receive req.body in api
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(express.json({ limit: "50mb" }));

mongoose.connection.once("open", () =>
  console.log("MongoDB connection established successfully")
);

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "./view")));

// Uncomment when deployed to disable calls from postman
// app.use(whitelisted);

// Routes
require("./routes")(app);

require("./config/socket")(
  new Server(server, {
    cors: corsConfig, // Pass configuration to websocket
  })
);

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./", "view", "index.html"))
);

const port = process.env.PORT || 5000; // Dynamic port for deployment
server.listen(port, () => console.log(`Server is running on port: ${port}`));
