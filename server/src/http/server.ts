import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import { createGoalRoute } from "./routes/create-goal";
import { getWeekPendingGoalsRoute } from "./routes/get-week-pending-goals";
import { createGoalCompletionRoute } from "./routes/create-goal-completion";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute);
app.register(getWeekPendingGoalsRoute);
app.register(createGoalCompletionRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("🔥 HTTP server running on http://localhost:3333 🚀");
  });
