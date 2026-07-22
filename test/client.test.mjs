import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { shouldCloseOnEscape } from "../src/client.js";

test("mobile disclosure closes on Escape only while open", () => {
  assert.equal(shouldCloseOnEscape("Escape", true), true);
  assert.equal(shouldCloseOnEscape("Escape", false), false);
  assert.equal(shouldCloseOnEscape("Enter", true), false);
  assert.equal(shouldCloseOnEscape("Tab", true), false);
});

test("mobile disclosure locks page scrolling while open", async () => {
  const source = await readFile(new URL("../src/client.js", import.meta.url), "utf8");

  assert.match(source, /document\.body\.classList\.toggle\("menu-open", open\)/);
});

test("skip link transfers keyboard focus to the main landmark", async () => {
  const source = await readFile(new URL("../src/client.js", import.meta.url), "utf8");

  assert.match(source, /skipLink\.addEventListener\("click"/);
  assert.match(source, /requestAnimationFrame\(\(\) => target\.focus\(\)\)/);
});
