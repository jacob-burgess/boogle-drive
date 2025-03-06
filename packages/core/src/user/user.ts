import { z } from "zod";
import { timestampsZod } from "../database/types";
import { fn } from "../utils/fn";
import { useTransaction } from "../database/transaction";
import { userTable } from "./user.sql";
import { eq } from "drizzle-orm";

export namespace User {
  export const Info = z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string(),
    ...timestampsZod,
  });
  export type Info = z.infer<typeof Info>;

  export const byId = fn(Info.shape.id, (id) =>
    useTransaction(async (tx) =>
      tx.select().from(userTable).where(eq(userTable.id, id))
    )
  );

  export const byEmail = fn(Info.shape.email, (email) =>
    useTransaction(async (tx) =>
      tx.select().from(userTable).where(eq(userTable.email, email))
    ).then(([user]) => {
      if (user) {
        return user;
      } else return null;
    })
  );

  export const Create = z.object({
    email: z.string().email(),
    name: z.string(),
  });
  export type Create = z.infer<typeof Create>;

  export const create = fn(Create, (input) =>
    useTransaction(async (tx) => tx.insert(userTable).values(input))
  );

  export const Update = z.object({
    id: z.number(),
    name: z.string(),
  });
  export type Update = z.infer<typeof Update>;

  export const update = fn(Update, (input) =>
    useTransaction(async (tx) =>
      tx
        .update(userTable)
        .set({ name: input.name })
        .where(eq(userTable.id, input.id))
    )
  );
}
