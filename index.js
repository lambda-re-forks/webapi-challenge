/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const projectRouter = require("./routers/projectRouter");
const actionRouter = require("./routers/actionsRouter");

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => res.send("<h1>WebAPI Sprint Challenge</h1>"));
app.use("/api/projects", projectRouter);
app.use("/api/actions", actionRouter);

const port = process.env.PORT || 4000;

app.listen(port, console.log(`Server listening on ${port}`));
