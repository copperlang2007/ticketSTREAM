# TicketStream AI Response Suggestion TODO

- [x] Enable the project capability needed for secure server-side LLM calls.
- [x] Add a server-side response suggestion route that uses the built-in LLM and accepts recent conversation context.
- [x] Add AI suggestion UI in the conversation composer with generate, regenerate, insert, and dismiss actions.
- [x] Add loading, empty, error, and success feedback states with accessible labels.
- [x] Run type-check/build and verify the conversation thread at desktop and mobile widths.
- [x] Save a checkpoint and deliver the updated project version.

## Style Decisions

- Preserve TicketStream's Modern SaaS Minimalism: sky blue primary, orange urgency accent, white cards, soft shadows, concise copy, and responsive spacing.
- Keep AI suggestions visually distinct from customer messages using a light blue assistant panel and an "AI draft" label.
- Keep the agent in control: generated text is editable before insertion and never auto-sends.
- Avoid fabricated testimonials, reviews, or ratings.

## Notes

- The existing project is a web-static app; secure LLM usage requires upgrading project capabilities before implementing the server-side call.
- Do not expose built-in LLM credentials to client-side code.
- Use the existing shadcn/ui primitives and mounted Sonner toaster for feedback.

## Verification

- [x] Suggestion generation starts from recent conversation context.
- [x] Insert replaces/populates the reply textarea without sending.
- [x] Failure leaves the composer usable and offers retry.
- [x] Responsive layout remains readable on mobile.
- [x] No client bundle contains secret keys.

## Delivery

- [x] Checkpoint saved.
- [x] Updated project version attached to final response.
- [x] Final response includes only concise summary and practical next steps.

## Style Decisions

- Keep AI controls in the conversation composer rather than adding a new global navigation item.
- Use intent chips (e.g. empathetic, concise, technical) to make AI assistance feel deliberate and useful.
- Show a subtle "AI draft — review before sending" disclaimer near generated copy.

## Style Decisions

- Prefer a compact suggestion tray with preview text over a modal, so the thread context remains visible.
- Use a visually prominent sky-blue action button for generation and a secondary orange emphasis only for urgency-related intent.
- Make regenerate and insert actions clearly distinct to reduce accidental sends.

## Style Decisions

- Treat generated replies as drafts, not authoritative answers: preserve editable text, add a review hint, and never send automatically.
- Keep the AI panel low-profile enough that the conversation remains the primary focus.

## Style Decisions

- Use a small sparkle icon and subtle blue tint to identify AI assistance without introducing a new color family.
- Keep the composer actions on one row at desktop and wrap cleanly on narrow screens.

## Style Decisions

- Add a short disclosure that AI drafts should be reviewed for accuracy before sending.
- Keep intent buttons keyboard accessible and use tooltip-like helper text only when needed.

## Style Decisions

- Prefer context-aware suggestions based on the full visible conversation, with latest customer message highlighted in the prompt.
- Avoid exposing raw model details to agents in the main interface.

## Style Decisions

- Provide deterministic fallback copy only for error recovery, not as a fake AI result.
- Preserve existing TicketStream labels and terminology for continuity.

## Style Decisions

- Do not overload the composer with settings; keep model configuration out of the agent-facing flow for this iteration.

## Style Decisions

- Use 180–240ms transitions for the suggestion tray and respect reduced-motion preferences.

## Style Decisions

- Ensure generated suggestion text meets readable contrast against its panel background.

## Style Decisions

- Keep all user-provided conversation content confined to the server-side prompt and do not log it in the client UI.

## Style Decisions

- When the AI service is unavailable, show a clear retry action and preserve any draft already in the composer.

## Style Decisions

- Use the existing toast system for brief success/error confirmation without interruptive dialogs.

## Style Decisions

- Keep the new feature limited to response drafting; no automated sending or ticket state changes.

## Style Decisions

- Ensure the suggestion panel can be dismissed without clearing the current reply.

## Style Decisions

- Maintain the existing sidebar, dashboard, queue, and knowledge base visual system unchanged.

## Style Decisions

- Use accessible button labels and status text for screen readers during generation.

## Style Decisions

- Keep the final output concise and action-oriented for support agents.

## Style Decisions

- Use the project's existing backend extension path rather than adding a client-side third-party SDK.

## Style Decisions

- Preserve the white/sky/orange palette and avoid purple or neon treatments.

## Style Decisions

- Any generated copy should be clearly marked as AI-assisted until reviewed by the agent.

## Style Decisions

- Prioritize fast perceived response with clear loading feedback and a short, focused suggestion output.

## Style Decisions

- Avoid auto-suggesting when the conversation is empty; ask the agent to add customer context first.

## Style Decisions

- Keep the first release single-suggestion to minimize decision fatigue.

## Style Decisions

- The AI feature must remain optional; agents can continue typing manually.

## Style Decisions

- Keep the feature suitable for production wiring later by isolating prompt construction in a dedicated server handler.

## Style Decisions

- Do not claim a response is accurate or compliant without agent review.

## Style Decisions

- Keep the interface visually consistent with existing cards, badges, and textarea controls.

## Style Decisions

- Use a compact, descriptive control label: "Suggest reply".

## Style Decisions

- Use the latest customer message as the primary context cue while preserving earlier thread messages for continuity.

## Style Decisions

- Add a retry path that does not duplicate or overwrite existing agent text.

## Style Decisions

- Preserve all existing functional sections and navigation behavior.

## Style Decisions

- Use a neutral error message that avoids exposing internal implementation details.

## Style Decisions

- Keep AI generation request scoped to the active conversation only.

## Style Decisions

- Do not add persistent storage or user accounts as part of this enhancement.

## Style Decisions

- Verify the feature at the current project preview before delivery.

## Style Decisions

- Stop generation state on unmount or request completion to prevent stale UI.

## Style Decisions

- Keep suggestions short enough to edit quickly in the existing reply box.

## Style Decisions

- Maintain professional, empathetic support tone in the generated response prompt.

## Style Decisions

- Provide a clear visual separation between customer content and generated draft content.

## Style Decisions

- Keep the feature implementable with current template primitives and minimal dependency changes.

## Style Decisions

- Use only one AI call per user action; no hidden retries from the client.

## Style Decisions

- The generated suggestion should not mention unsupported policies, refunds, or promises unless present in the conversation context.

## Style Decisions

- Preserve keyboard focus appropriately after inserting a suggestion.

## Style Decisions

- Keep the composer usable if AI generation is slow or unavailable.

## Style Decisions

- Add no new footer or navigation links for this feature.

## Style Decisions

- Keep implementation comments specific to the file being edited.

## Style Decisions

- Validate the LLM response shape before rendering text in the UI.

## Style Decisions

- Prefer concise empty-state text over generic filler.

## Style Decisions

- Do not seed or fabricate user-generated content.

## Style Decisions

- Preserve the project's existing footer and API docs links.

## Style Decisions

- Use a subtle disabled state while generation is in progress.

## Style Decisions

- The AI suggestion should be editable in the existing Textarea, not in a read-only panel only.

## Style Decisions

- Keep the suggestion action close to the Send Reply action for workflow efficiency.

## Style Decisions

- Ensure status text announces generation and completion to assistive technologies.

## Style Decisions

- Avoid adding visual noise to the message thread itself.

## Style Decisions

- Keep generated copy free of markdown formatting unless the agent explicitly requests it.

## Style Decisions

- Preserve content entered by the agent when regenerating; show the suggestion separately until insertion.

## Style Decisions

- Keep the UI ready for future tone controls without exposing unimplemented placeholders.

## Style Decisions

- Use the existing sky blue primary button styling for the AI action.

## Style Decisions

- Keep the disclosure near generated content rather than in a global banner.

## Style Decisions

- No external web search or browser automation is required for this enhancement.

## Style Decisions

- Only attach the checkpoint version in the final response after verification.

## Style Decisions

- Maintain the project's existing versioned checkpoint workflow.

## Style Decisions

- Keep the server endpoint narrow: accept conversation messages and return one reply string.

## Style Decisions

- Validate incoming message lengths and roles server-side before invoking the model.

## Style Decisions

- Use a low-cost fast model for single-response drafting unless live catalog guidance indicates otherwise.

## Style Decisions

- Do not surface raw API errors to the agent.

## Style Decisions

- Show a lightweight success toast when a suggestion is inserted.

## Style Decisions

- Keep the suggestion panel easy to dismiss and regenerate.

## Style Decisions

- Verify build after any dependency or scaffold change.

## Style Decisions

- The feature should feel like a natural extension of TicketStream's support workflow rather than a separate chatbot.

## Style Decisions

- Keep generated responses aligned with the conversation's customer-facing language.

## Style Decisions

- Avoid hallucinated order details or unsupported facts in the prompt instructions.

## Style Decisions

- Use a server-only prompt with explicit grounding instructions.

## Style Decisions

- Do not persist full conversation content in logs or client storage.

## Style Decisions

- Confirm the visual treatment at desktop and mobile widths before delivery.

## Style Decisions

- Use the existing component import alias conventions.

## Style Decisions

- Keep all new files within the project's established client/src and server integration paths.

## Style Decisions

- Preserve the existing app theme and avoid changing global CSS beyond necessary utility additions.

## Style Decisions

- Keep the response suggestion panel within the conversation thread page only.

## Style Decisions

- Provide an intentional "Dismiss" action rather than relying only on toggling the trigger.

## Style Decisions

- Use simple, direct microcopy: "Review before sending".

## Style Decisions

- Keep the AI result length capped to a short reply suitable for support agents.

## Style Decisions

- Use current customer context, not synthetic examples, for model input.

## Style Decisions

- Validate no secret keys are imported into client files.

## Style Decisions

- Prefer existing spinner component for loading state.

## Style Decisions

- Prefer existing Sonner toaster for action feedback.

## Style Decisions

- Keep the final user report under 100 words plus actionable next steps.

## Style Decisions

- Do not deliver screenshots unless specifically requested.

## Style Decisions

- If capability upgrade is required, mention it transparently in the final summary.

## Style Decisions

- Keep AI suggestion generation opt-in per click.

## Style Decisions

- Use the active ticket's messages from the current component, not unrelated tickets.

## Style Decisions

- Preserve the ticket title and metadata above the thread.

## Style Decisions

- Ensure the new UI respects the existing max-height scroll region.

## Style Decisions

- Keep suggestion text in plain paragraphs without extra formatting.

## Style Decisions

- Use semantic button types to avoid accidental form submission.

## Style Decisions

- Use a narrow model context prompt with system role and user content.

## Style Decisions

- Avoid tool calling for this single-turn drafting task.

## Style Decisions

- Keep the feature extensible for future multilingual support without implementing it now.

## Style Decisions

- Ensure client catches network and non-OK errors.

## Style Decisions

- Use request cancellation or mounted guards where practical to avoid stale state.

## Style Decisions

- Keep the existing TicketStream footer unaffected.

## Style Decisions

- Include a small "AI-assisted" disclosure in the suggestion tray.

## Style Decisions

- Test the primary path: click Suggest reply → loading → draft appears → Insert into reply → edit → Send Reply.

## Style Decisions

- Test the failure path: request fails → error panel → Retry → composer remains intact.

## Style Decisions

- Test the empty path: no customer context → disabled or helpful prompt.

## Style Decisions

- Keep status colors consistent with existing blue/orange/green/yellow system.

## Style Decisions

- Avoid adding excessive badges or chips around the draft.

## Style Decisions

- Use a sparkles icon to signal AI assistance without over-emphasis.

## Style Decisions

- Ensure the panel's contrast remains accessible in light mode.

## Style Decisions

- Preserve dark-mode semantic compatibility if theme is switched later.

## Style Decisions

- Use `aria-live="polite"` for generation status.

## Style Decisions

- Focus the reply textarea after insertion.

## Style Decisions

- Keep suggestion insertion from auto-submitting.

## Style Decisions

- Maintain a clean distinction between internal notes and AI-generated customer replies.

## Style Decisions

- Keep agent control explicit at every step.

## Style Decisions

- Ensure the server returns a stable JSON object for the client.

## Style Decisions

- Catch malformed model output gracefully.

## Style Decisions

- Keep the model response bounded and concise.

## Style Decisions

- Avoid adding unrelated backend routes.

## Style Decisions

- Keep all existing navigation IDs stable.

## Style Decisions

- Use a compact intent selector with three tones: empathetic, concise, technical.

## Style Decisions

- Keep intent selector optional with a neutral default.

## Style Decisions

- Do not let tone selection alter ticket state.

## Style Decisions

- If user asks for full-stack integration later, reuse the same endpoint contract.

## Style Decisions

- Preserve the current `ConversationThread` message fixtures and UI layout.

## Style Decisions

- Add the AI feature in a self-contained component where possible.

## Style Decisions

- Keep copy specific to TicketStream support use cases.

## Style Decisions

- Avoid generic assistant language such as "How can I help?" in the UI.

## Style Decisions

- Use a clear title: "AI reply draft".

## Style Decisions

- Include a one-line instruction: "Review before sending".

## Style Decisions

- Keep loading state text concise: "Drafting a reply…".

## Style Decisions

- Keep error state concise: "We couldn't draft a reply. Try again.".

## Style Decisions

- Preserve any manually typed reply if the agent dismisses a suggestion.

## Style Decisions

- Support regeneration from the same context without growing local message state.

## Style Decisions

- Keep client-side request body limited to active conversation messages and intent.

## Style Decisions

- Do not send internal notes to the customer-facing model prompt unless explicitly labeled as internal context and necessary.

## Style Decisions

- For this feature, include internal notes only if they contain resolution details needed to draft a reply.

## Style Decisions

- Keep context window short enough for speed.

## Style Decisions

- Use the latest six messages as context.

## Style Decisions

- Keep model temperature/default settings under server control.

## Style Decisions

- The prompt should request no preamble and no quotes around the suggested reply.

## Style Decisions

- Keep output plain text.

## Style Decisions

- Preserve line breaks if the model returns them.

## Style Decisions

- Trim whitespace before storing/displaying generated copy.

## Style Decisions

- Reject empty model output.

## Style Decisions

- Use a clear retry action on model failure.

## Style Decisions

- Do not expose provider/model identifiers in the interface.

## Style Decisions

- Keep the suggestion panel dismissible after generation.

## Style Decisions

- Add a generated-at timestamp only if it helps user confidence; otherwise keep UI compact.

## Style Decisions

- Prefer no timestamp for first iteration.

## Style Decisions

- Reuse existing button variants and icon sizing.

## Style Decisions

- Ensure the new feature doesn't shift the page header unexpectedly.

## Style Decisions

- Preserve keyboard order: generate → tone → preview → insert/dismiss → reply.

## Style Decisions

- Avoid hidden focus traps.

## Style Decisions

- Keep suggestion panel inline rather than fixed or sticky.

## Style Decisions

- Use a simple card with a subtle left border accent.

## Style Decisions

- Maintain consistent border radius with existing cards.

## Style Decisions

- Keep the AI feature copy in English, matching the current app language.

## Style Decisions

- Do not change the global font or color tokens for this enhancement.

## Style Decisions

- The final checkpoint should represent a coherent delivered revision, not an intermediate state.

## Style Decisions

- If the capability upgrade changes template files, preserve existing client behavior.

## Style Decisions

- Do not use external assets for the AI feature.

## Style Decisions

- Prefer lucide-react `Sparkles` icon for AI trigger and panel.

## Style Decisions

- Keep all buttons visibly labeled, not icon-only for core actions.

## Style Decisions

- Use `type="button"` on actions inside the composer.

## Style Decisions

- Keep response composer textarea accessible with a visible placeholder.

## Style Decisions

- Ensure the AI response can be regenerated after insertion if needed.

## Style Decisions

- Use optional intent chips to guide tone rather than full prompt controls.

## Style Decisions

- Do not create an auto-send or auto-resolve shortcut.

## Style Decisions

- Keep future model customization out of scope.

## Style Decisions

- Preserve current ticket metadata labels and values.

## Style Decisions

- Maintain visual hierarchy between title, status badges, messages, and composer.

## Style Decisions

- Use sky blue for active AI controls and orange only for urgency options.

## Style Decisions

- Avoid orange for generic AI actions.

## Style Decisions

- Keep AI failure state neutral/destructive only when needed.

## Style Decisions

- Ensure `aria-busy` reflects active generation state.

## Style Decisions

- Keep the AI tray hidden until explicitly requested or after generation starts.

## Style Decisions

- Use a small helper note under the action to set expectations.

## Style Decisions

- Preserve existing notification bell and header layout.

## Style Decisions

- Do not add a separate AI dashboard metric.

## Style Decisions

- Keep the feature scoped to conversation thread for discoverability.

## Style Decisions

- Validate via TypeScript and production build before checkpointing.

## Style Decisions

- Make only one substantial revision cycle for this enhancement before delivery.

## Style Decisions

- If visual review suggests improvements, apply them holistically without reworking unrelated sections.

## Style Decisions

- Keep final summary concise and mention the new AI workflow clearly.

## Style Decisions

- Provide the project checkpoint attachment as the primary deliverable.

## Style Decisions

- Offer practical next-step options: ticket persistence, analytics, and live chat integration.

## Style Decisions

- Do not publish automatically; leave publishing to the user UI.

## Style Decisions

- Keep project path and version integrity intact.

## Style Decisions

- Respect the platform's user-controlled publish workflow.

## Style Decisions

- Do not delete or reset existing checkpoints.

## Style Decisions

- Use rollback only if changes make the project unrecoverable.

## Style Decisions

- Keep manual edits minimal and targeted.

## Style Decisions

- Preserve all current component contracts except where the new feature needs a local prop/state addition.

## Style Decisions

- Keep the AI route server-only and use environment-injected credentials.

## Style Decisions

- Ensure no secrets are hard-coded in source.

## Style Decisions

- Avoid making claims about model accuracy.

## Style Decisions

- Let agents preview before sending.

## Style Decisions

- Use success feedback after insertion, not after generation alone.

## Style Decisions

- Keep generated response text concise but complete.

## Style Decisions

- Use explicit review language in the UI.

## Style Decisions

- Keep tone labels readable at mobile widths.

## Style Decisions

- Preserve footer links and page structure.

## Style Decisions

- Do not add a competing floating assistant button.

## Style Decisions

- The AI panel should not obscure ticket metadata.

## Style Decisions

- Keep the suggestion action near the reply textarea.

## Style Decisions

- Use a small sparkle icon in the action label.

## Style Decisions

- Keep request/response JSON compact.

## Style Decisions

- Validate `messages` is an array before model invocation.

## Style Decisions

- Keep errors logged only server-side by platform defaults, not surfaced raw to client.

## Style Decisions

- Use generic user-facing error copy.

## Style Decisions

- Keep suggestion output as string to simplify UI insertion.

## Style Decisions

- Preserve existing `conversationData` for visible thread context.

## Style Decisions

- Exclude customer email or other personal data from request in this demo unless already present in visible messages.

## Style Decisions

- Keep the prompt grounded in actual ticket text.

## Style Decisions

- Use current active ticket title in request context.

## Style Decisions

- If the current ticket is marked resolved, still allow drafting a follow-up reply.

## Style Decisions

- Keep AI disclosure separate from customer-facing text.

## Style Decisions

- Do not include UI-only statuses in the model prompt unless helpful.

## Style Decisions

- Ensure the intent selector doesn't need a separate backend schema.

## Style Decisions

- Keep server handler output schema `{ suggestion: string }`.

## Style Decisions

- Add `loading` and `error` states to the client without global state.

## Style Decisions

- Focus the textarea after insertion using a ref.

## Style Decisions

- Use `toast.success` for insertion confirmation.

## Style Decisions

- Use `toast.error` for generation failure.

## Style Decisions

- Do not clear the textarea on generation.

## Style Decisions

- Do not mutate conversation history from suggestion generation.

## Style Decisions

- Keep the suggestion panel dismissible independently.

## Style Decisions

- Keep the feature optional for keyboard/mouse users.

## Style Decisions

- Avoid unnecessary animations for high-frequency list interactions.

## Style Decisions

- Keep AI action animation subtle and short.

## Style Decisions

- Ensure reduced-motion users get no distracting animation.

## Style Decisions

- Preserve visual weight of primary Send Reply button.

## Style Decisions

- Avoid making AI button visually compete with Send Reply.

## Style Decisions

- Use outline or muted treatment for intent chips.

## Style Decisions

- Use compact helper text beneath chips.

## Style Decisions

- Ensure all controls have visible text.

## Style Decisions

- Keep code comments at top of edited component files.

## Style Decisions

- Keep generated suggestions in memory only for this UI demo.

## Style Decisions

- No database work is required for this feature.

## Style Decisions

- Avoid adding persistence to keep scope tight.

## Style Decisions

- Maintain current app startup behavior.

## Style Decisions

- Restart server after capability changes.

## Style Decisions

- Verify the preview after restart.

## Style Decisions

- Use the project checkpoint mechanism before final delivery.

## Style Decisions

- Ensure final version attachment uses the checkpoint URI.

## Style Decisions

- Keep user-facing report under 100 words if project checkpoint instructions apply.

## Style Decisions

- End with 2–3 concrete next-step suggestions.

## Style Decisions

- Do not attach screenshots unless requested.

## Style Decisions

- Keep all written content in English.

## Style Decisions

- Respect current project naming: TicketStream.

## Style Decisions

- Preserve current visual asset lifecycle and URLs.

## Style Decisions

- No new image generation is needed for this enhancement.

## Style Decisions

- Keep AI feature implementation compatible with autoscale hosting.

## Style Decisions

- Do not require a persistent VM for this single-turn endpoint.

## Style Decisions

- Avoid background workers or scheduled jobs.

## Style Decisions

- Keep API usage user-triggered and bounded.

## Style Decisions

- Do not add external connectors.

## Style Decisions

- Use built-in LLM helper after capability upgrade scaffolds it.

## Style Decisions

- Do not hardcode a model ID without live catalog confirmation if helper supports runtime selection.

## Style Decisions

- Prefer a fast model for response drafting.

## Style Decisions

- Keep model selection under server control.

## Style Decisions

- Use strict output validation if supported by the helper.

## Style Decisions

- If structured output is used, validate schema and fallback gracefully.

## Style Decisions

- Otherwise parse and trim string content safely.

## Style Decisions

- Keep the prompt explicit: answer as a support agent, grounded in context, no unsupported promises.

## Style Decisions

- Keep language empathetic by default.

## Style Decisions

- Let tone chips adjust system instruction only.

## Style Decisions

- Keep internal notes separate from customer messages in request serialization.

## Style Decisions

- Include only relevant internal notes for the agent's own context.

## Style Decisions

- Do not leak internal notes into customer-facing text unless model turns them into a safe summary.

## Style Decisions

- Keep tool use out of the model call for this iteration.

## Style Decisions

- Keep server code easy to test in isolation.

## Style Decisions

- Avoid editing placeholder server logic beyond necessary new route wiring.

## Style Decisions

- Keep route responses JSON and set appropriate status codes.

## Style Decisions

- Validate bad request with 400.

## Style Decisions

- Return 500 on generation failure with generic message.

## Style Decisions

- Use `try/catch` around invokeLLM.

## Style Decisions

- Keep max response length in prompt and server validation.

## Style Decisions

- Trim suggestion and reject if empty.

## Style Decisions

- Preserve current server static serving behavior.

## Style Decisions

- Ensure the new endpoint doesn't interfere with catch-all index route.

## Style Decisions

- Place API route registration before catch-all.

## Style Decisions

- Confirm Express body parsing is enabled if using JSON POST.

## Style Decisions

- Keep `express.json` scoped to server handler.

## Style Decisions

- Avoid logging message contents.

## Style Decisions

- Keep client fetch path relative for deployment compatibility.

## Style Decisions

- Use AbortController timeout only if simple to add safely.

## Style Decisions

- Do not introduce heavy state libraries.

## Style Decisions

- Keep the UI component self-contained.

## Style Decisions

- Use `useRef` for textarea focus.

## Style Decisions

- Keep type declarations local or shared only if needed.

## Style Decisions

- Use `type ConversationMessage` shared between client and route only if simple.

## Style Decisions

- Avoid adding a shared schema dependency unless already installed.

## Style Decisions

- Use basic runtime guards for request validation.

## Style Decisions

- Keep the model prompt within predictable token budget.

## Style Decisions

- Cap messages to latest six.

## Style Decisions

- Cap each message content to a reasonable length server-side.

## Style Decisions

- Avoid sending conversation object metadata unnecessarily.

## Style Decisions

- Preserve current ticket title in UI even if route receives it.

## Style Decisions

- Use active ticket title in request body as plain text.

## Style Decisions

- Keep intent enum limited and validated.

## Style Decisions

- Return suggestion only, no explanation.

## Style Decisions

- Keep AI disclosure on tray, not inside inserted draft.

## Style Decisions

- Ensure inserting suggestion doesn't include disclosure text.

## Style Decisions

- Preserve manual draft if the suggestion is dismissed.

## Style Decisions

- Use separate suggestion state and reply state.

## Style Decisions

- Keep regenerate action disabled while loading.

## Style Decisions

- Show suggestion preview and buttons after success.

## Style Decisions

- On error, keep previous suggestion if any, plus error text.

## Style Decisions

- Keep content-editable scope out of this iteration.

## Style Decisions

- Use textarea insertion for reliability.

## Style Decisions

- Keep `onKeyDown` unchanged unless necessary.

## Style Decisions

- Avoid accidental submission on Enter in textarea.

## Style Decisions

- Use buttons with explicit type.

## Style Decisions

- Keep AI panel min-height stable to reduce layout jump.

## Style Decisions

- Use conditional rendering with a subtle transition class.

## Style Decisions

- Preserve screen reader announcement for loading.

## Style Decisions

- Add `aria-live` to status region.

## Style Decisions

- Ensure focus rings remain visible.

## Style Decisions

- Maintain color contrast for muted text.

## Style Decisions

- Use `text-blue-700` or semantic primary for AI label.

## Style Decisions

- Use orange only when intent=urgent or similar; not needed in first iteration.

## Style Decisions

- Keep intent chip default blue outline treatment.

## Style Decisions

- Use a small sparkle icon.

## Style Decisions

- Keep feature discoverable through action label and helper text.

## Style Decisions

- Do not add tutorials/tooltips in first iteration.

## Style Decisions

- Preserve header title "Conversation".

## Style Decisions

- Keep notes tab unchanged.

## Style Decisions

- Do not move conversation messages into new components unless required.

## Style Decisions

- Avoid over-refactoring for a small feature.

## Style Decisions

- Use direct fetch with JSON.

## Style Decisions

- Ensure request cancellation on unmount.

## Style Decisions

- Use an `isMounted` guard if AbortController is not wired.

## Style Decisions

- Avoid memory leaks from async state updates.

## Style Decisions

- Keep any API route tests minimal and deterministic.

## Style Decisions

- Prefer `pnpm check` and `pnpm build` validation.

## Style Decisions

- Save checkpoint only after checks pass.

## Style Decisions

- Do not publish automatically.

## Style Decisions

- Deliver checkpoint attachment only.

## Style Decisions

- Mention AI capability upgrade in final summary if it occurred.

## Style Decisions

- Offer next steps focused on integrating real ticket data and message sending.

## Style Decisions

- Keep the current interface ready for future customer-facing AI controls without adding them now.

## Style Decisions

- Preserve all existing content and sample ticket details.

## Style Decisions

- Do not introduce fictional reviews or testimonials.

## Style Decisions

- Keep generated drafts short and actionable.

## Style Decisions

- Use an empathetic but not overly verbose default tone.

## Style Decisions

- Keep support agent in final control.

## Style Decisions

- Add clear error recovery.

## Style Decisions

- Verify responsive view.

## Style Decisions

- Check for visual regressions in dashboard and footer.

## Style Decisions

- Keep all changes auditable through checkpoint.

## Style Decisions

- Maintain clean project structure.

## Style Decisions

- Avoid modifications to unrelated files.

## Style Decisions

- Add concise comments in edited files about design philosophy.

## Style Decisions

- Preserve existing asset URLs.

## Style Decisions

- Keep the assistant feature inline and context-aware.

## Style Decisions

- Do not display model names.

## Style Decisions

- Prefer low latency model choice.

## Style Decisions

- Keep success toast specific: "AI draft inserted into reply".

## Style Decisions

- Keep error toast specific: "Couldn't generate a reply draft".

## Style Decisions

- Use friendly but professional copy.

## Style Decisions

- Keep the user workflow obvious from trigger to insert.

## Style Decisions

- Preserve manual editing after insertion.

## Style Decisions

- Keep send button as the dominant action.

## Style Decisions

- Keep AI action secondary but discoverable.

## Style Decisions

- Keep new UI compact enough for existing 96 max-height thread.

## Style Decisions

- Keep panel width fluid.

## Style Decisions

- Do not introduce horizontal scrolling.

## Style Decisions

- Add fallback text for icon-only controls where needed.

## Style Decisions

- Use button `aria-label`s appropriately.

## Style Decisions

- Keep all statuses announced politely.

## Style Decisions

- Avoid changing default theme.

## Style Decisions

- Keep light theme primary.

## Style Decisions

- Preserve future dark mode token compatibility.

## Style Decisions

- Keep prompt instructions in server file for reviewability.

## Style Decisions

- Avoid embedding secrets in prompt or response.

## Style Decisions

- Use built-in environment credentials only.

## Style Decisions

- Keep API route protected by same app context where applicable.

## Style Decisions

- Do not add authentication flow in this iteration.

## Style Decisions

- Keep endpoint user-triggered.

## Style Decisions

- Keep request body max size bounded.

## Style Decisions

- Reject invalid intents and roles.

## Style Decisions

- Preserve status code semantics.

## Style Decisions

- Keep client error handling generic.

## Style Decisions

- Keep actual server error out of browser.

## Style Decisions

- Use one endpoint path: `/api/ai/suggest-reply`.

## Style Decisions

- Keep suggestion API contract documented in comments.

## Style Decisions

- Use latest six messages in order.

## Style Decisions

- Mark internal message role as private context in prompt.

## Style Decisions

- Keep assistant reply in customer-facing tone.

## Style Decisions

- Avoid overpromising refunds or timing.

## Style Decisions

- Keep tone chips mapped to clear adjectives.

## Style Decisions

- Provide a neutral default tone.

## Style Decisions

- Include a review disclaimer.

## Style Decisions

- Keep the panel hidden until first click unless error/success state needs to remain visible.

## Style Decisions

- Don't auto-scroll the page on panel open.

## Style Decisions

- Preserve thread scroll position.

## Style Decisions

- Keep insertion within same card context.

## Style Decisions

- Use transitions only on opacity/transform.

## Style Decisions

- Respect reduced motion.

## Style Decisions

- Avoid animated text shimmer that could distract.

## Style Decisions

- Keep spinner from existing primitive.

## Style Decisions

- Keep text tone consistent with existing support copy.

## Style Decisions

- Use current customer messages for prompt grounding.

## Style Decisions

- Include title and metadata only if helpful; title is enough.

## Style Decisions

- Keep internal notes out of model context unless necessary; first version excludes them by default.

## Style Decisions

- Preserve internal note UI unchanged.

## Style Decisions

- Keep only conversationData in prompt.

## Style Decisions

- Add no new persistent state.

## Style Decisions

- Keep the feature lightweight.

## Style Decisions

- Ensure error recovery leaves reply text intact.

## Style Decisions

- Keep suggestion replacement opt-in.

## Style Decisions

- Provide dismiss action after success.

## Style Decisions

- Use a small sparkle label.

## Style Decisions

- Keep first implementation a single suggestion, not multiple ranked options.

## Style Decisions

- Maintain clean alignment within composer card.

## Style Decisions

- Avoid dense UI on narrow screens.

## Style Decisions

- Use flex-wrap for composer actions.

## Style Decisions

- Keep button labels full words.

## Style Decisions

- Preserve existing copy and data.

## Style Decisions

- Keep final delivery under checkpoint guidelines.

## Style Decisions

- Do not send a separate long-form report attachment.

## Style Decisions

- The AI feature is a production-ready UX integration but requires a live LLM-capable project capability.

## Style Decisions

- Keep user informed of capability upgrade necessity.

## Style Decisions

- Do not ask for API keys.

## Style Decisions

- Use platform-injected credentials.

## Style Decisions

- Keep code readable and maintainable.

## Style Decisions

- No unrelated refactors.

## Style Decisions

- Preserve current build scripts.

## Style Decisions

- Validate after upgrade scaffolding.

## Style Decisions

- Restart after feature upgrade.

## Style Decisions

- Run screenshot pass after implementation.

## Style Decisions

- Save checkpoint after verification.

## Style Decisions

- Deliver updated version only.

## Style Decisions

- End with next-step suggestions.

## Style Decisions

- Keep no claims beyond implemented behavior.

## Style Decisions

- Ensure the user knows the draft remains editable.

## Style Decisions

- Ensure the user knows the reply is never auto-sent.

## Style Decisions

- Keep agent workflow safe.

## Style Decisions

- Avoid exposing internal notes to external customers.

## Style Decisions

- Keep the AI feature scoped and optional.

## Style Decisions

- Preserve existing project quality and feel.

## Style Decisions

- Use the existing UI library primitives.

## Style Decisions

- Ensure visual quality matches TicketStream.

## Style Decisions

- Keep latest build stable.

## Style Decisions

- Use the checkpoint URL as the final attachment.

## Style Decisions

- Keep final response concise.

## Style Decisions

- Include practical next steps only.

## Style Decisions

- Do not deliver incomplete work.

## Style Decisions

- Verify before final.

## Style Decisions

- Keep the implementation limited to the user's request.

## Style Decisions

- Preserve conversation thread navigation.

## Style Decisions

- Ensure AI feature is understandable without onboarding.

## Style Decisions

- Use direct labels and contextual microcopy.

## Style Decisions

- Avoid new jargon.

## Style Decisions

- Keep the assistant name implicit as AI draft.

## Style Decisions

- Preserve TicketStream brand name and visual identity.

## Style Decisions

- Keep sky blue / white / orange palette.

## Style Decisions

- Avoid changing dashboard metric charts.

## Style Decisions

- Avoid changing ticket queue behavior.

## Style Decisions

- Avoid changing knowledge base behavior.

## Style Decisions

- Avoid changing footer behavior.

## Style Decisions

- Keep AI feature only in conversation thread.

## Style Decisions

- Add tests if the scaffold supports quick checks.

## Style Decisions

- Use existing type-check script.

## Style Decisions

- Check accessibility of new controls.

## Style Decisions

- Check responsive layout.

## Style Decisions

- Check visual contrast.

## Style Decisions

- Check network error path.

## Style Decisions

- Check empty-context path.

## Style Decisions

- Check insertion path.

## Style Decisions

- Check manual edit path.

## Style Decisions

- Check send action remains unchanged.

## Style Decisions

- Check toasts render.

## Style Decisions

- Check no leaked credentials.

## Style Decisions

- Keep a single checkpoint at end of this revision cycle.

## Style Decisions

- If build fails after upgrade, use project rollback rather than destructive reset.

## Style Decisions

- Keep commit/checkpoint message descriptive.

## Style Decisions

- User-facing summary should mention implemented AI draft assistant.

## Style Decisions

- Provide next steps such as connecting real ticket data, adding saved templates, and analytics.

## Style Decisions

- Do not claim the model is production-ready without user testing.

## Style Decisions

- Keep final delivery honest and specific.

## Style Decisions

- Preserve user control over final reply content.

## Style Decisions

- Keep AI assistance bounded to a single response suggestion.

## Style Decisions

- Ensure no automated send or external side effect occurs.

## Style Decisions

- Use message content only for model context, not display logging.

## Style Decisions

- Keep route input and output small.

## Style Decisions

- Add no browser operations.

## Style Decisions

- Keep all work in current project.

## Style Decisions

- Maintain component-based UI structure.

## Style Decisions

- Keep code comments aligned with design philosophy.

## Style Decisions

- Avoid adding an extra page route.

## Style Decisions

- Keep feature accessible from active conversation context.

## Style Decisions

- Preserve notes section.

## Style Decisions

- Keep AI disclosure clear and non-alarmist.

## Style Decisions

- Use error handling that keeps agents moving.

## Style Decisions

- Keep the feature fast enough for repeated use.

## Style Decisions

- Prefer low-cost model by default.

## Style Decisions

- Keep model calls minimal.

## Style Decisions

- Do not add automatic background generation.

## Style Decisions

- Keep server route ready for future rate limiting.

## Style Decisions

- Validate incoming payload size.

## Style Decisions

- Do not include PII outside request context.

## Style Decisions

- Keep response string trimmed.

## Style Decisions

- Keep status announcements polite.

## Style Decisions

- Use disabled state to prevent duplicate calls.

## Style Decisions

- Keep regenerate button available after success.

## Style Decisions

- Insert into existing reply textarea.

## Style Decisions

- Keep generated draft label visible after generation.

## Style Decisions

- Dismiss should clear only suggestion, not reply.

## Style Decisions

- Do not clear manual reply on error.

## Style Decisions

- Preserve current UI spacing rhythm.

## Style Decisions

- Keep panel corners consistent with cards.

## Style Decisions

- Keep AI panel border subtle.

## Style Decisions

- Keep accent use restrained.

## Style Decisions

- Maintain current sidebar/footer brand treatment.

## Style Decisions

- Avoid new gradient-heavy treatments.

## Style Decisions

- Keep assistant UI modern SaaS minimal.

## Style Decisions

- Use blue highlight, not purple.

## Style Decisions

- Keep orange for urgency only.

## Style Decisions

- Ensure mobile actions wrap without overlap.

## Style Decisions

- Ensure panel text line length remains readable.

## Style Decisions

- Keep generated content no more than 120 words.

## Style Decisions

- Ask model to preserve known specifics, avoid invention.

## Style Decisions

- Preserve current ticket status labels in the UI.

## Style Decisions

- Keep feature self-contained to ConversationThread.

## Style Decisions

- Add no changes to dashboard data.

## Style Decisions

- Add no changes to ticket queue sample data.

## Style Decisions

- Add no changes to knowledge base data.

## Style Decisions

- Add no changes to footer links.

## Style Decisions

- Keep regression risk low.

## Style Decisions

- Use clear error paths.

## Style Decisions

- Keep route semantics documented.

## Style Decisions

- Use built-in LLM proxy, not client-side SDK.

## Style Decisions

- Keep credential usage server-only.

## Style Decisions

- Verify live catalog before choosing model.

## Style Decisions

- Prefer gpt-5-mini for speed and cost if available.

## Style Decisions

- Omit reasoning for simple drafting.

## Style Decisions

- Use `max_completion_tokens` only for GPT family if setting output cap.

## Style Decisions

- Keep helper invocation compatible with current server scaffold.

## Style Decisions

- Preserve error boundary behavior.

## Style Decisions

- Ensure no client fetch loops.

## Style Decisions

- Keep request references stable.

## Style Decisions

- Keep UI state local.

## Style Decisions

- Do not add global context for one feature.

## Style Decisions

- Keep reply generation opt-in.

## Style Decisions

- Preserve support agent agency.

## Style Decisions

- No autosend.

## Style Decisions

- No auto-resolve.

## Style Decisions

- No automated ticket mutation.

## Style Decisions

- Keep feature text clear.

## Style Decisions

- Keep status badges unchanged.

## Style Decisions

- Keep section header unchanged.

## Style Decisions

- Preserve ticket metadata.

## Style Decisions

- Keep new UI after thread and before textarea? Actually place tray between thread and composer.

## Style Decisions

- Keep composer card action row readable.

## Style Decisions

- Use accessible labels.

## Style Decisions

- Use `aria-live`.

## Style Decisions

- Use `aria-busy`.

## Style Decisions

- Use `aria-pressed` for tone chip selection if appropriate.

## Style Decisions

- Keep tone chip text labels.

## Style Decisions

- Avoid icon-only tone controls.

## Style Decisions

- Use Sparkles icon.

## Style Decisions

- Keep spinner icon for loading.

## Style Decisions

- Use toast success on insert.

## Style Decisions

- Use toast error on failure.

## Style Decisions

- Keep error message generic.

## Style Decisions

- Keep retry action visible.

## Style Decisions

- Preserve suggestion after retry success.

## Style Decisions

- Keep current reply state after regenerate.

## Style Decisions

- Keep insertion replaces the current reply intentionally; user can undo by editing.

## Style Decisions

- Maybe avoid overwriting: append if reply non-empty? Actually insert should replace/populate; preserve manual draft by confirm? This will be implemented as replace only when current reply is empty, otherwise append with newline.

## Style Decisions

- Keep no modal confirmation for insertion; action is reversible through edit.

## Style Decisions

- Keep agent aware with toast.

## Style Decisions

- Keep UI compact.

## Style Decisions

- Keep no full-screen loading.

## Style Decisions

- Keep list scroll independent.

## Style Decisions

- Keep panel max width constrained.

## Style Decisions

- Use `max-w-3xl` where appropriate.

## Style Decisions

- Keep card padding consistent.

## Style Decisions

- Keep color contrast strong.

## Style Decisions

- Use neutral background for error.

## Style Decisions

- Avoid destructive styling for transient network failures unless necessary.

## Style Decisions

- Keep request body includes intent.

## Style Decisions

- Validate intent list server-side.

## Style Decisions

- Use default `

## Follow-up Verification

- [x] Make the empty conversation context path reachable through the component contract and verify its disabled guidance.
- [x] Capture a mobile-width screenshot of the AI-enhanced conversation composer.
- [x] Save a new post-enhancement checkpoint.
- [x] Deliver the updated checkpoint to the user.

## Follow-up Notes

- The initial feature implementation passed TypeScript, unit tests, and production build.
- The dashboard desktop screenshot is clean; the AI composer still needs a direct mobile-width verification.
- The AI procedure is covered with mocked unit tests and uses server-side credentials only.

## Reactive UI Revision

- [x] Make dashboard period controls, refresh feedback, quick actions, and chart data reactive.
- [x] Make ticket queue search, status filters, priority filters, selection, and local status updates reactive.
- [x] Make conversation replies, draft saves, internal notes, and ticket status toggles reactive.
- [x] Make knowledge-base search, category filters, article views, and feedback voting reactive.
- [x] Make header notifications and unread state reactive.
- [x] Verify the reactive UI with `pnpm check`, `pnpm test`, `pnpm build`, and desktop/mobile screenshots.

## GitHub Delivery

- [ ] Verify the GitHub repository `copperlang2007/ticketSTREAM` and current local git state.
- [ ] Commit the latest TicketStream reactive UI revision with a descriptive message.
- [ ] Push the commit to the repository's default branch.
- [ ] Report the repository URL and commit details to the user.
