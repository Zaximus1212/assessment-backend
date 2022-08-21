const express = require("express");
const cors = require("cors");
const { getCompliment, getSpirit, deletePicture, editPicture, createPicture, getPictures} = require('./ctrl/controller')

const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/compliment", getCompliment);
app.get("/api/spirit", getSpirit);
app.get("/api/pictures", getPictures);
app.delete("/api/pictures/:id", deletePicture);
app.put("/api/pictures/:id", editPicture);
app.post("/api/pictures", createPicture);


app.listen(4000, () => console.log("Server running on 4000"));
