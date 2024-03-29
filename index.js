const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

require("dotenv").config();

app.listen(config.PORT, () => {
	logger.info(`App started at port ${config.PORT}`);
});
