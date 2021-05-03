const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to university application." });
});

require("./routes/staff.routes.js")(app);
require("./routes/roles.routes.js")(app);
require("./routes/attendance.routes.js")(app);
require("./routes/non_teaching_staff.routes.js")(app);
require("./routes/salary.routes.js")(app);
require("./routes/student.routes.js")(app);
require("./routes/teaching_staff.routes.js")(app);
require("./routes/department.routes.js")(app);
require("./routes/courses.routes.js")(app);

// set port, listen for requests
app.listen(3030, () => {
  console.log("Server is running on port 3030.");
});
