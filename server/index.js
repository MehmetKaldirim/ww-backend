const app = require("./app");

const port = process.env.PORT || 4000;

app.get("/", (req, res) => res.status(200).json({ message: "it is working" }));

app.listen(port, () => console.log(`Listening on ${port}`));
