import { Server } from "@hocuspocus/server";
import { verifyToken } from "../middleware/auth.js";


const hocuspocus = new Server({
  port: process.env.HOCUSPOCUS_PORT,

  async onAuthenticate({ token }) {
    const user = verifyToken(token);

    console.log("Authenticated:", user);

    return { user };
  }

});

export default hocuspocus;