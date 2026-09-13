import { Server } from "@hocuspocus/server";
import { verifyToken } from "../middleware/auth.js";
import { registerDocument } from "./documentManager.js";

const hocuspocus = new Server({
    port: process.env.HOCUSPOCUS_PORT,

    async onAuthenticate({ token }) {
        const user = verifyToken(token);

        console.log("Authenticated:", user);

        return { user };
    },

    async onLoadDocument({ documentName, document, context }) {
        registerDocument(documentName, document);

        console.log(`User ${context.user.userId} opened page ${documentName}`);
    }
});

export default hocuspocus;