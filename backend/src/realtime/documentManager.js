

const documents = new Map();

export function registerDocument(pageId, document) {
    documents.set(pageId.toString(), document);
}

export function getDocument(pageId) {
    return documents.get(pageId.toString());
}