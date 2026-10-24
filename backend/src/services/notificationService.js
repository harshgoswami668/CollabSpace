import notificationModel
from "../model/notification.js";

export async function createNotification({
  employeeId,
  actorId,
  type,
  title,
  entityType,
  entityId
}) {

  return await notificationModel.create({
    employeeId,
    actorId,
    type,
    title,
    entityType,
    entityId
  });

}