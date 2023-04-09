import ApiRouter from "./ApiRouter";

const express = require('express');

const app = express();
app.use(express.json());

const apiRouter = new ApiRouter();
apiRouter.attachTo(app);

const httpServer = app.listen(3002);