import mentionModel from "../model/mention.js";

export async function createMention({
  blockId,
  pageId,
  workspaceId,
  mentionedUser,
  mentionedBy
}) {

  const mention =
    await mentionModel.create({
      blockId,
      pageId,
      workspaceId,
      mentionedUser,
      mentionedBy
    });

  await createNotification({
    employeeId: mentionedUser,
    actorId: mentionedBy,
    type: "mention",
    title: "You were mentioned",
    entityType: "block",
    entityId: blockId
  });

  return mention;
}