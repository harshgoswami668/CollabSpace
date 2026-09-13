import * as Y from "yjs";
import yjsDocumentModel from "../model/yjsDocument.js";

export async function loadDocument(pageId, document) {
    const savedDocument = await yjsDocumentModel.findOne({ pageId });

    if (!savedDocument) {
        console.log("No saved document found");
        return;
    }

    Y.applyUpdate(document, savedDocument.state);
}

export async function saveDocument(pageId, document) {
    const state = Buffer.from(
        Y.encodeStateAsUpdate(document)
    );

    await yjsDocumentModel.findOneAndUpdate(
        { pageId },
        {
            pageId,
            state
        },
        {
            upsert: true
        }
    );

    console.log("Document saved");
}