import "./loadEnvironment.js";
import chalk from "chalk";
import createDebug from "debug";
import app from "./server/index.js";

const debug = createDebug("pixelart-api:main");

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(chalk.green(`Listening on http://localhost:${port}`));
});
