import { Activity, CardFactory } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import messageTemplate from "./message.template.json";

export interface AdaptiveCardData {
  title: string,
  appName: string,
  description: string,
  notificationUrl: string
  actionChoices?: ActionChoice[]
}

export interface ActionChoice {
  title: string,
  value: string
}

export interface rawMessageData {
  title: string,
  description: string
  url: string
}

export function convertToBotMessage(rawMessage: any, transformMessage: (any) => AdaptiveCardData): Partial<Activity> {
  // Tramsform to adaptive card data contract
  const adaptiveCardData = transformMessage(rawMessage);
  // Wrap the message in adaptive card
  return {
    attachments: [
      CardFactory.adaptiveCard(
        AdaptiveCards.declare<AdaptiveCardData>(messageTemplate).render(adaptiveCardData)
      )
    ]
  };
}

// This is just a function to mock the notification data retrieval
export function getMessageData(): rawMessageData {
  return {
    title: "New Event Occurred!", 
    description: "Detailed description of what happened so the user knows what's going on.",
    url : "https://www.adaptivecards.io/",
  }
}

// Adapt the raw message data to adapative card data contract
export function transformMessageData(rawMessage: rawMessageData): AdaptiveCardData {
  return {
    title: rawMessage.title,
    appName: "Contoso App",
    description: rawMessage.description,
    notificationUrl : rawMessage.url,
    actionChoices: [
      {
        title: "Create new Github issue",
        value: "issue"
      },
      {
          title: "Add a task to my issues",
          value: "task"
      },
      {
          title: "Create bug report in Bugzapper",
          value: "bug"
      },
      {
          title: "Mark as already solved",
          value: "solved"
      }
    ]
  }
}