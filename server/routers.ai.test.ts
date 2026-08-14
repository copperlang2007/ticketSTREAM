import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";
import { invokeLLM } from "./_core/llm";
import { appRouter } from "./routers";

vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

const mockedInvokeLLM = vi.mocked(invokeLLM);

beforeEach(() => {
  mockedInvokeLLM.mockReset();
});

function createContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("ai.suggestReply", () => {
  it("returns a concise suggestion from the model response", async () => {
    mockedInvokeLLM.mockResolvedValueOnce({
      id: "completion-1",
      created: Date.now(),
      model: "claude-haiku-4-5",
      choices: [
        {
          index: 0,
          finish_reason: "stop",
          message: {
            role: "assistant",
            content: "Thanks for flagging this. I’m checking the payment details now and will follow up with the next step shortly.",
          },
        },
      ],
    });

    const caller = appRouter.createCaller(createContext());
    const result = await caller.ai.suggestReply({
      ticketTitle: "Payment processing error on checkout",
      tone: "empathetic",
      messages: [
        { role: "customer", content: "My card was declined but I was charged." },
        { role: "agent", content: "Can you share your order number?" },
      ],
    });

    expect(result.suggestion).toContain("Thanks for flagging this");
    expect(mockedInvokeLLM).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "claude-haiku-4-5",
        maxTokens: 220,
      })
    );
  });

  it("rejects empty conversation content before calling the model", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(
      caller.ai.suggestReply({
        ticketTitle: "Payment processing error on checkout",
        tone: "concise",
        messages: [{ role: "customer", content: "   " }],
      })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });

    expect(mockedInvokeLLM).not.toHaveBeenCalled();
  });
});
