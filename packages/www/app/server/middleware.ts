import { auth } from "@/server/functions/auth";
import { createMiddleware } from "@tanstack/react-start";

export const loggingMiddleware = createMiddleware().server(
  async ({ next, data }) => {
    const time = Date.now();
    console.log("Request received:", data);
    const result = await next();
    console.log("Response processed:", result);
    console.log("Time taken:", Date.now() - time, "ms");
    return result;
  }
);

export const authMiddleware = createMiddleware().server(
  async ({ next, context }) => {
    const subject = await auth();
    if (!subject) {
      throw new Error("Unauthorized");
    }
    return next({
      context: { subject: subject.properties },
    });
  }
);
