import { Activity } from "botbuilder";
import * as cron from "node-cron";
import { TeamsFxBot } from "./sdk/bot";
import { adapter } from "./adapter";
import { server } from "./server";
import { convertToBotMessage, getMessageData, transformMessageData,  } from "./message";

const message: Partial<Activity> = convertToBotMessage(getMessageData(), transformMessageData);

const teamsfxBot = new TeamsFxBot(adapter);

// HTTP trigger to send notification.
server.post("/api/notify/default", async (req, res) => {
  await teamsfxBot.forEachSubscribers(async subscriber => {
    await teamsfxBot.notifySubscriber(subscriber, message);
  });

  res.json({});
});

// Time trigger to send notification.
cron.schedule('*/1 * * * *', async () => {
  // send notification every one minutes.
  await teamsfxBot.forEachSubscribers(async subscriber => {
    await teamsfxBot.notifySubscriber(subscriber, message);
  });
});
