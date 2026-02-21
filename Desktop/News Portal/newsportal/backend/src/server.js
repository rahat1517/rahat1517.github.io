const app = require("./app");
const { sequelize } = require("./models");
require("dotenv").config();

const PORT = Number(process.env.PORT || 5000);

async function start() {
  await sequelize.authenticate();

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

start().catch((e) => {
  console.error("Failed to start server:", e);
  process.exit(1);
});
