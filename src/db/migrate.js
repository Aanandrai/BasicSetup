
// migrate.js
import createDbIfNotExist from "./createDb.js";
import sequelize from "./sequelizer.js";
import { Umzug, SequelizeStorage } from "umzug";

const runMigrations = async () => {
  await createDbIfNotExist(); // <-- ensure DB exists

  const umzug = new Umzug({
    migrations: { glob: "src/migrations/*.js" },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  try {
    await umzug.up();
    console.log("Migrations complete!");
    process.exit(0);
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  }
};

runMigrations();
