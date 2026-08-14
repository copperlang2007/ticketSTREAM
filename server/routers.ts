import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const messageSchema = z.object({
  role: z.enum(["customer", "agent", "internal"]),
  content: z.string().trim().min(1).max(2000),
});

const suggestionInputSchema = z.object({
  ticketTitle: z.string().trim().min(1).max(160),
  messages: z.array(messageSchema).min(1).max(6),
  tone: z.enum(["empathetic", "concise", "technical"]).default("empathetic"),
});

const toneInstructions = {
  empathetic: "Warm, reassuring, and human. Acknowledge the customer's experience before giving the next step.",
  concise: "Direct and efficient. Keep it short while still answering the customer clearly.",
  technical: "Precise and structured. Explain the relevant technical next step without unnecessary jargon.",
} as const;

const formatTranscript = (messages: z.infer<typeof messageSchema>[]) =>
  messages
    .map(({ role, content }) => `${role === "customer" ? "Customer" : role === "agent" ? "Support agent" : "Internal note"}: ${content}`)
    .join("\n");

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  ai: router({
    suggestReply: publicProcedure
      .input(suggestionInputSchema)
      .mutation(async ({ input }) => {
        try {
          const response = await invokeLLM({
            model: "claude-haiku-4-5",
            maxTokens: 220,
            messages: [
              {
                role: "system",
                content: [
                  "You draft customer-facing support replies for TicketStream.",
                  "Use only facts present in the conversation context; never invent order details, policy, refunds, timelines, or system actions.",
                  "Write one short plain-text reply, without a preamble, quotation marks, markdown, or sign-off.",
                  "The support agent will review and edit the draft before sending.",
                  `Tone: ${toneInstructions[input.tone]}`,
                ].join("\n"),
              },
              {
                role: "user",
                content: `Ticket: ${input.ticketTitle}\n\nConversation context:\n${formatTranscript(input.messages)}`,
              },
            ],
          });

          const content = response.choices[0]?.message?.content;
          const suggestion = typeof content === "string" ? content.trim() : "";

          if (!suggestion || suggestion.length > 800) {
            throw new Error("The model returned an unusable response");
          }

          return { suggestion };
        } catch (error) {
          console.error("[AI] Reply suggestion failed", error instanceof Error ? error.message : "unknown error");
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Unable to generate a reply draft right now.",
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
