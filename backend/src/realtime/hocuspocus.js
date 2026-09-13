import { Server } from "@hocuspocus/server";
import { verifyToken } from "../auth.js";
import pageModel from "../model/page.js";

import {
  loadDocument,
  saveDocument,
} from "./persistence.js";

import {
  registerDocument,
} from "./documentManager.js";

const hocuspocus = new Server({
  port: process.env.HOCUSPOCUS_PORT,

  async onAuthenticate({ token }) {
    const user = verifyToken(token);

    console.log("Authenticated:", user);

    return { user };
  },

  async onLoadDocument({
    documentName,
    document,
    context,
  }) {
    const page = await pageModel.findById(
      documentName
    );

    if (!page) {
      throw new Error("Page not found");
    }

    await loadDocument(
      documentName,
      document
    );

    registerDocument(
      documentName,
      document
    );

    const blocks =
      document.getMap("blocks");

    console.log(
      `User ${context.user.userId} opened page ${documentName}`
    );

    console.log(
      `Collaborative blocks: ${blocks.size}`
    );
  },

  async onStoreDocument({
    documentName,
    document,
  }) {
    await saveDocument(
      documentName,
      document
    );

    console.log(
      `Saved page ${documentName}`
    );
  },
});

export default hocuspocus;