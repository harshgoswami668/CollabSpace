import * as Y from "yjs";

const documents = new Map();

export function registerDocument(
  pageId,
  document
) {
  documents.set(
    pageId.toString(),
    document
  );
}

export function getDocument(pageId) {
  return documents.get(
    pageId.toString()
  );
}

export function createBlock(
  pageId,
  blockId
) {
  const document =
    getDocument(pageId);

  if (!document) {
    console.log("No such page exist");
    return;
  }

  const blocks =
    document.getMap("blocks");

  if (
    !blocks.has(blockId.toString())
  ) {
    blocks.set(
      blockId.toString(),
      new Y.Text()
    );
  }
}




export function updateBlockContent(
  pageId,
  blockId,
  content
) {
  console.log(
    "updateBlockContent called"
  );

  console.log(
    "pageId:",
    pageId.toString()
  );

  console.log(
    "blockId:",
    blockId.toString()
  );

  const document =
    getDocument(pageId);

  if (!document) {
    console.log(
      "No active Y.Doc found"
    );
    return;
  }

  const blocks =
    document.getMap("blocks");

  let text =
    blocks.get(
      blockId.toString()
    );

  if (!text) {

    console.log(
      "Creating Y.Text for block"
    );

    text = new Y.Text();

    blocks.set(
      blockId.toString(),
      text
    );
  }

  text.delete(
    0,
    text.length
  );

  text.insert(
    0,
    content
  );

  console.log(
    `Updated collaborative block ${blockId}`
  );

  console.log(
    "Current content:",
    text.toString()
  );
}



export function deleteBlock(
  pageId,
  blockId
) {
  const document =
    getDocument(pageId);

  if (!document) return;

  const blocks =
    document.getMap("blocks");

  blocks.delete(
    blockId.toString()
  );

  console.log(
    `Deleted collaborative block ${blockId}`
  );
}


export function getBlockContent(
  pageId,
  blockId
) {
  const document =
    getDocument(pageId);

  if (!document) {
    return null;
  }

  const blocks =
    document.getMap("blocks");

  const text =
    blocks.get(blockId.toString());

  if (!text) {
    return "";
  }

  return text.toString();
}