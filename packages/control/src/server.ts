import { handle } from "hono/aws-lambda";
import { create } from "opencontrol";
import { tool } from "opencontrol/tool";
import { db } from "@boogle/core/database/index";
import { z } from "zod";
import AWS from "aws-sdk";
import { tools } from "sst/opencontrol";

const ping = tool({
  name: "ping",
  description: "sends a ping",
  async run() {
    return {
      content: [
        {
          type: "text",
          text: "pong",
        },
      ],
    };
  },
});

const dbQuery = tool({
  name: "database_query",
  description: "execute mysql query",
  args: z.object({
    query: z.string().describe("The query to execute"),
  }),
  async run(input) {
    return db
      .transaction(async (tx) => tx.execute(input.query), {
        accessMode: "read only",
        isolationLevel: "read committed",
      })
      .catch(async (error) => {
        console.error(error);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: error.toString(),
            },
          ],
        };
      })
      .then((result) => ({
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }));
  },
});

const aws = tool({
  name: "aws",
  description: "Make a call to the AWS SDK for JavaScript v2",
  args: z.object({
    client: z.string().describe("Class name of the client to use"),
    command: z.string().describe("Command to call on the client"),
    args: z
      .record(z.string(), z.any())
      .optional()
      .describe("Arguments to pass to the command"),
  }),
  async run(input) {
    // @ts-ignore
    const c = AWS[input.client];
    if (!c) throw new Error(`Could not find client ${input.client}`);
    const client = new c();
    if (!client[input.command])
      throw new Error(
        `Could not find command ${input.command} on client ${input.client}`
      );
    return await client[input.command](input.args).promise();
  },
});

console.log("opencontrol_key", process.env.OPENCONTROL_KEY);

const app = create({
  key: process.env.OPENCONTROL_KEY,
  tools: [ping, dbQuery, aws, ...tools],
});
// @ts-ignore
export const handler = handle(app);
