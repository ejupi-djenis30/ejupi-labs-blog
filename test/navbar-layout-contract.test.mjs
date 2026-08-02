import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const stylesheet = await readFile(
  new URL("../src/styles.css", import.meta.url),
  "utf8",
);

test("the ecosystem navbar keeps the shared desktop and mobile geometry", () => {
  assert.match(stylesheet, /--navbar-height:\s*88px;/u);
  assert.match(
    stylesheet,
    /--navbar-shell:\s*min\(calc\(100% - clamp\(40px, 5vw, 72px\)\), 1320px\);/u,
  );
  assert.match(
    stylesheet,
    /\.site-header__inner\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*minmax\(260px, 1fr\) auto minmax\(260px, 1fr\);[^}]*width:\s*var\(--navbar-shell\);[^}]*height:\s*100%;/u,
  );
  assert.match(
    stylesheet,
    /@media \(max-width: 62\.5em\)\s*\{[\s\S]*?--navbar-height:\s*76px;[\s\S]*?\.site-header__inner\s*\{[^}]*grid-template-columns:\s*1fr auto;/u,
  );
  assert.match(
    stylesheet,
    /\.menu-toggle\s*\{[\s\S]*?width:\s*44px;[\s\S]*?height:\s*44px;/u,
  );
});
