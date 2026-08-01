export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// HTML text and quoted attribute values require the same five-character
// encoding. Keeping the attribute helper explicit makes the rendering context
// visible at every URL and metadata boundary.
export const escapeHtmlAttribute = escapeHtml;
export const escapeXml = escapeHtml;

export function renderDecisionCard(decision, itemIndex, tradeoffLabel) {
  if (!Number.isSafeInteger(itemIndex) || itemIndex < 0) {
    throw new TypeError("Decision index must be a non-negative safe integer.");
  }

  return [
    '<article class="decision"><span class="decision-number">D',
    escapeHtml(String(itemIndex + 1).padStart(2, "0")),
    "</span><h3>",
    escapeHtml(decision.title),
    "</h3><p>",
    escapeHtml(decision.body),
    '</p><p class="decision-tradeoff"><strong>',
    escapeHtml(tradeoffLabel),
    "</strong><span>",
    escapeHtml(decision.tradeoff),
    "</span></p></article>",
  ].join("");
}
