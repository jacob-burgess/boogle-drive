import { z } from "zod";
import { timestampsZod } from "../database/types";
import { fn } from "../utils/fn";
import { useTransaction } from "../database/transaction";
import { itemTable } from "./item.sql";
import { eq } from "drizzle-orm";

export namespace Item {
  export const Info = z.object({
    id: z.number(),
    name: z.string(),
    url: z.string(),
    type: z.enum(["file", "folder"]),
    parentId: z.number().nullable(),
    ownerId: z.number(),
    size: z.number().nullable(),
    mimeType: z.string().nullable(),
    ...timestampsZod,
  });
  export type Info = z.infer<typeof Info>;

  export const byId = fn(Info.shape.id, (id) =>
    useTransaction(async (tx) =>
      tx.select().from(itemTable).where(eq(itemTable.id, id))
    ).then(([item]) => item || null)
  );

  export const byOwner = fn(Info.shape.ownerId, (ownerId) =>
    useTransaction(async (tx) =>
      tx.select().from(itemTable).where(eq(itemTable.ownerId, ownerId))
    )
  );

  export const Create = z.object({
    name: z.string(),
    url: z.string(),
    type: z.enum(["file", "folder"]),
    parentId: z.number().nullable().optional(),
    ownerId: z.number(),
    size: z.number().nullable().optional(),
    mimeType: z.string().nullable().optional(),
  });
  export type Create = z.infer<typeof Create>;

  export const create = fn(Create, (input) =>
    useTransaction(async (tx) => {
      const result = await tx.insert(itemTable).values(input);
      return result.insertId;
    })
  );

  export const Update = z.object({
    id: z.number(),
    name: z.string().optional(),
    parentId: z.number().nullable().optional(),
    size: z.number().nullable().optional(),
    mimeType: z.string().nullable().optional(),
  });
  export type Update = z.infer<typeof Update>;

  export const update = fn(Update, (input) =>
    useTransaction(async (tx) => {
      const { id, ...data } = input;
      return tx.update(itemTable).set(data).where(eq(itemTable.id, id));
    })
  );
}
