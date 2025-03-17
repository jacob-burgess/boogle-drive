import { auth } from "@/routes/-functions";
import { createMiddleware } from "@tanstack/react-start";

export const loggingMiddleware = createMiddleware().server(
  async ({ next, data }) => {
    console.log("Request received:", data);
    const result = await next();
    console.log("Response processed:", result);
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
