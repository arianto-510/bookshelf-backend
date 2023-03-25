const Hapi = require("@hapi/hapi");
const { bookRoute } = require("./route");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(bookRoute);

  await server.start();
  console.log(`server berjalan pada ${server.info.uri}`);
};

init();
