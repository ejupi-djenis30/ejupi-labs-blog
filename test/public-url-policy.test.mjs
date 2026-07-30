import assert from "node:assert/strict";
import test from "node:test";
import {
  caseDefinitions,
  locales,
  site,
} from "../src/content.mjs";
import { editorialUi, methodology } from "../src/editorial.mjs";
import {
  EJUPI_LABS_PUBLIC_HOSTS,
  LABS_PROJECT_PAGES_URLS,
  PRODUCT_GITHUB_PAGES_HOST,
  assertLabsProjectUrls,
  assertPublicDomainTopology,
  findDisallowedEjupiLabsUrls,
} from "../src/public-url-policy.mjs";

function labsProject(projectUrl, slug = "careeros-local") {
  return [
    {
      kind: "labs",
      projectUrl,
      slug,
    },
  ];
}

test("the public Ejupi Labs hostname allowlist is exact", () => {
  for (const hostname of EJUPI_LABS_PUBLIC_HOSTS) {
    assert.deepEqual(
      findDisallowedEjupiLabsUrls(`https://${hostname}/example`),
      [],
    );
  }

  const violations = findDisallowedEjupiLabsUrls(
    [
      "https://jdoor.ejupilabs.com/",
      "https://vector.ejupilabs.com/product",
      "//staging.ejupilabs.com/product",
    ].join(" "),
  );

  assert.deepEqual(
    violations.map(({ hostname }) => hostname),
    [
      "jdoor.ejupilabs.com",
      "vector.ejupilabs.com",
      "staging.ejupilabs.com",
    ],
  );
});

test("mailto and GitHub hosts are not treated as project subdomains", () => {
  const publicText = [
    "mailto:info@ejupilabs.com",
    "https://github.com/ejupi-djenis30/example",
    "https://api.github.com/repos/ejupi-djenis30/example",
    `https://${PRODUCT_GITHUB_PAGES_HOST}/example/`,
  ].join(" ");

  assert.deepEqual(findDisallowedEjupiLabsUrls(publicText), []);
});

test("Labs product links must use the dedicated HTTPS GitHub Pages host", () => {
  assert.doesNotThrow(() =>
    assertLabsProjectUrls(
      labsProject(`https://${PRODUCT_GITHUB_PAGES_HOST}/careeros-local/`),
    ),
  );

  assert.throws(
    () => assertLabsProjectUrls(labsProject("https://jdoor.ejupilabs.com/")),
    /jdoor\.ejupilabs\.com.*Project links must use GitHub Pages/su,
  );
  assert.throws(
    () =>
      assertLabsProjectUrls(
        labsProject("https://github.com/ejupi-djenis30/careeros-local"),
      ),
    /must use the GitHub Pages host/su,
  );
  assert.throws(
    () =>
      assertLabsProjectUrls(
        labsProject(`http://${PRODUCT_GITHUB_PAGES_HOST}/careeros-local/`),
      ),
    /must use HTTPS/su,
  );
  assert.throws(
    () =>
      assertLabsProjectUrls(
        labsProject(`https://${PRODUCT_GITHUB_PAGES_HOST}/careeros-local`),
      ),
    /canonical GitHub Pages URL/su,
  );

  for (const decoratedUrl of [
    `https://${PRODUCT_GITHUB_PAGES_HOST}/wrong-project/`,
    `https://${PRODUCT_GITHUB_PAGES_HOST}/careeros-local/?preview=true`,
    `https://${PRODUCT_GITHUB_PAGES_HOST}/careeros-local/#demo`,
  ]) {
    assert.throws(
      () => assertLabsProjectUrls(labsProject(decoratedUrl)),
      /canonical GitHub Pages URL/su,
    );
  }

  assert.throws(
    () =>
      assertLabsProjectUrls(
        labsProject(
          `https://${PRODUCT_GITHUB_PAGES_HOST}/careeros-local/`,
          "unregistered-project",
        ),
      ),
    /no canonical GitHub Pages policy/su,
  );

  assert.equal(
    LABS_PROJECT_PAGES_URLS["careeros-local"],
    `https://${PRODUCT_GITHUB_PAGES_HOST}/careeros-local/`,
  );
});

test("the generated-output scanner catches project subdomains without false positives", () => {
  const html = `
    <a href="mailto:info@ejupilabs.com">Email</a>
    <a href="https://github.com/ejupi-djenis30/JDoor">Source</a>
    <a href="https://jdoor.ejupilabs.com/">JDoor</a>
    <script>const preview = "https://preview.ejupilabs.com/card";</script>
    <a href="https:\\encoded-backslash.ejupilabs.com/">Backslash</a>
    <a href="https://encoded&#46;entity&#46;ejupilabs&#46;com/">Entity</a>
    <a href="https://percent%2Eencoded%2Eejupilabs%2Ecom/">Percent</a>
    <a href="https://例.ejupilabs.com/">IDN</a>
    <a href="https://jdoor.ejupilabs.comevil.example/">Different host</a>
    <a href="https://jdoor.ejupilabs.com!evil.example/">Punctuated external host</a>
    <a href="https://jdoor.ejupilabs.com;evil.example/">Semicolon external host</a>
    <a href="https://jdoor.ejupilabs.com,evil.example/">Comma external host</a>
    <a href="https://not&PERIOD;really&PERIOD;ejupilabs&PERIOD;com/">Invalid uppercase entity</a>
  `;

  assert.deepEqual(
    findDisallowedEjupiLabsUrls(html).map(({ hostname }) => hostname),
    [
      "jdoor.ejupilabs.com",
      "preview.ejupilabs.com",
      "encoded-backslash.ejupilabs.com",
      "encoded.entity.ejupilabs.com",
      "percent.encoded.ejupilabs.com",
      "xn--fsq.ejupilabs.com",
    ],
  );
});

test("plain forbidden host references remain visible to the policy scanner", () => {
  assert.deepEqual(
    findDisallowedEjupiLabsUrls(
      "Retired address: jdoor.ejupilabs.com, followed by ordinary prose.",
    ).map(({ hostname }) => hostname),
    ["jdoor.ejupilabs.com"],
  );
});

test("the current public content satisfies the domain topology", () => {
  assert.doesNotThrow(() =>
    assertPublicDomainTopology({
      caseDefinitions,
      publicContent: {
        caseDefinitions,
        editorialUi,
        locales,
        methodology,
        site,
      },
    }),
  );
});
