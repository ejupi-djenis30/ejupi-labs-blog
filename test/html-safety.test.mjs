import assert from "node:assert/strict";
import test from "node:test";

import {
  caseDefinitions,
  localeOrder,
  protectedLegacySlugs,
} from "../src/content.mjs";
import { assertDefinitionCatalog } from "../src/content-contract.mjs";
import {
  escapeHtmlAttribute,
  renderDecisionCard,
} from "../src/html-safety.mjs";

const catalogOptions = { localeOrder, protectedLegacySlugs };

function replaceDefinition(slug, patch) {
  return caseDefinitions.map((definition) =>
    definition.slug === slug
      ? { ...structuredClone(definition), ...patch }
      : definition,
  );
}

test("decision cards encode every editorial field before entering HTML", () => {
  const rendered = renderDecisionCard(
    {
      title: '</h3><img src=x onerror="alert(1)">',
      body: "<script>alert(2)</script>&",
      tradeoff: '\"><svg onload="alert(3)">',
    },
    0,
    '<b onclick="alert(4)">Trade-off</b>',
  );

  assert.equal(
    rendered,
    '<article class="decision"><span class="decision-number">D01</span><h3>&lt;/h3&gt;&lt;img src=x onerror=&quot;alert(1)&quot;&gt;</h3><p>&lt;script&gt;alert(2)&lt;/script&gt;&amp;</p><p class="decision-tradeoff"><strong>&lt;b onclick=&quot;alert(4)&quot;&gt;Trade-off&lt;/b&gt;</strong><span>&quot;&gt;&lt;svg onload=&quot;alert(3)&quot;&gt;</span></p></article>',
  );
  assert.doesNotMatch(rendered, /<(?:img|script|svg|b)\b/iu);
  assert.equal(
    (rendered.match(/<article class="decision">/gu) ?? []).length,
    1,
  );
});

test("quoted attribute values encode all HTML syntax characters", () => {
  assert.equal(
    escapeHtmlAttribute(`https://example.test/?q=\"><svg onload='alert(1)'>&x=y`),
    "https://example.test/?q=&quot;&gt;&lt;svg onload=&#039;alert(1)&#039;&gt;&amp;x=y",
  );
});

test("render metadata rejects values that could escape structural contexts", () => {
  const attacks = [
    {
      slug: "ai-workflow-cloud-migration",
      patch: { slug: 'case\" onmouseover=\"alert(1)' },
      expected: /slug: expected a lowercase kebab-case slug/u,
    },
    {
      slug: "ai-workflow-cloud-migration",
      patch: { categoryKey: 'cloud\" onmouseover=\"alert(1)' },
      expected: /categoryKey: expected a lowercase kebab-case identifier/u,
    },
    {
      slug: "ai-workflow-cloud-migration",
      patch: { diagram: 'cloud\"><script>alert\(1\)<\/script>' },
      expected: /diagram: expected a lowercase kebab-case identifier/u,
    },
    {
      slug: "ai-workflow-cloud-migration",
      patch: { kind: 'professional\" onmouseover=\"alert(1)' },
      expected: /kind: expected professional or labs/u,
    },
    {
      slug: "ai-workflow-cloud-migration",
      patch: { published: '2026-07-31\" onmouseover=\"alert(1)' },
      expected: /published: expected YYYY-MM-DD/u,
    },
    {
      slug: "ai-workflow-cloud-migration",
      patch: { published: "2026-02-31" },
      expected: /published: expected a real calendar date/u,
    },
    {
      slug: "careeros-local",
      patch: { projectUrl: "javascript:alert(1)" },
      expected: /projectUrl: expected an HTTPS URL/u,
    },
    {
      slug: "careeros-local",
      patch: { sourceUrl: "javascript:alert(1)" },
      expected: /sourceUrl: expected an immutable GitHub commit URL/u,
    },
  ];

  for (const attack of attacks) {
    assert.throws(
      () =>
        assertDefinitionCatalog(
          replaceDefinition(attack.slug, attack.patch),
          catalogOptions,
        ),
      attack.expected,
    );
  }
});

test("decision card numbering rejects values outside its generated index contract", () => {
  const decision = { title: "Title", body: "Body", tradeoff: "Trade-off" };
  assert.throws(
    () => renderDecisionCard(decision, -1, "Trade-off"),
    /non-negative safe integer/u,
  );
  assert.throws(
    () => renderDecisionCard(decision, 0.5, "Trade-off"),
    /non-negative safe integer/u,
  );
});
