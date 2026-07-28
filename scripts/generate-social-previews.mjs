import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  caseDefinitions,
  localeOrder,
} from "../src/content.mjs";

const projectRoot = resolve(import.meta.dirname, "..");
const sourceRoot = resolve(projectRoot, "design", "social");
const outputRoot = resolve(projectRoot, "site", "assets", "social");
const manifestPath = resolve(sourceRoot, "manifest.json");
const checkOnly = process.argv.includes("--check");
const width = 1200;
const height = 630;
const maxDifferingPixelRatio = 0.08;
const maxMeanChannelError = 6;

const copy = Object.freeze({
  en: {
    label: "ENGINEERING CASE STUDIES",
    headline: ["Engineering decisions,", "explained."],
    size: 54,
    nodes: ["CONSTRAINT", "CHOICE", "ALTERNATIVE", "COST"],
    system: "DECISION VIEW / ARCHIVE",
  },
  it: {
    label: "CASE STUDY DI INGEGNERIA",
    headline: ["Decisioni tecniche,", "spiegate."],
    size: 61,
    nodes: ["VINCOLO", "SCELTA", "ALTERNATIVA", "COSTO"],
    system: "VISTA DECISIONI / ARCHIVIO",
  },
  de: {
    label: "ENGINEERING-FALLSTUDIEN",
    headline: ["Technische Entscheidungen,", "erklärt."],
    size: 48,
    nodes: ["ANFORDERUNG", "WAHL", "ALTERNATIVE", "PREIS"],
    system: "ENTSCHEIDUNGSANSICHT / ARCHIV",
  },
  fr: {
    label: "ÉTUDES DE CAS D’INGÉNIERIE",
    headline: ["Les décisions techniques,", "expliquées."],
    size: 50,
    nodes: ["CONTRAINTE", "CHOIX", "ALTERNATIVE", "COÛT"],
    system: "VUE DES DÉCISIONS / ARCHIVES",
  },
});
const localeKeys = Object.freeze([...localeOrder]);

if (JSON.stringify(Object.keys(copy)) !== JSON.stringify(localeKeys)) {
  throw new Error("Social-preview copy must match the published locale order.");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pngDimensions(png) {
  const signature = "89504e470d0a1a0a";
  if (png.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("Social preview is not a PNG.");
  }
  return {
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20),
  };
}

function socialSvg(localeKey, brandHref, fontRegularHref, fontSemiboldHref) {
  const item = copy[localeKey];
  const count = String(caseDefinitions.length).padStart(2, "0");
  const nodes = item.nodes
    .map((label, index) => {
      const y = 112 + index * 108;
      const active = index === 2;
      return `<g>
    <rect x="816" y="${y}" width="300" height="66" fill="${active ? "#B74D2C" : "none"}" stroke="${active ? "#E97A4A" : "#F4F1EA"}"/>
    <text x="840" y="${y + 40}" fill="#F4F1EA" font-family="Instrument Sans" font-size="17" letter-spacing="1.4">${escapeXml(label)}</text>
    <rect x="1082" y="${y + 24}" width="12" height="12" fill="${active ? "#0E1111" : "#E97A4A"}"/>
  </g>`;
    })
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">Ejupi Labs — ${escapeXml(item.label)}</title>
  <desc id="desc">Ejupi Labs wordmark, editorial headline and a four-stage decision diagram.</desc>
  <defs>
    <style>
      @font-face {
        font-family: "Instrument Sans";
        font-style: normal;
        font-weight: 400;
        src: url("${fontRegularHref}") format("woff2");
      }
      @font-face {
        font-family: "Instrument Sans";
        font-style: normal;
        font-weight: 600;
        src: url("${fontSemiboldHref}") format("woff2");
      }
    </style>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="#0E1111" stroke-opacity=".065"/>
    </pattern>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0 0L10 5L0 10Z" fill="#E97A4A"/>
    </marker>
  </defs>
  <rect width="${width}" height="${height}" fill="#F4F1EA"/>
  <rect width="770" height="${height}" fill="url(#grid)"/>
  <path d="M0 18H770M0 608H770" stroke="#0E1111" stroke-opacity=".22"/>
  <image href="${brandHref}" x="28" y="18" width="520" height="160"/>
  <path d="M54 199H714" stroke="#0E1111" stroke-opacity=".24"/>
  <rect x="54" y="217" width="12" height="12" fill="#B74D2C"/>
  <text x="82" y="229" fill="#626966" font-family="Instrument Sans" font-size="17" letter-spacing="1.6">${escapeXml(item.label)} / 01—${count}</text>
  <text x="52" y="337" fill="#0E1111" font-family="Instrument Sans" font-size="${item.size}" font-weight="600" letter-spacing="-2.2">${escapeXml(item.headline[0])}</text>
  <text x="52" y="419" fill="#B74D2C" font-family="Instrument Sans" font-size="${item.size}" font-weight="600" letter-spacing="-2.2">${escapeXml(item.headline[1])}</text>
  <text x="54" y="568" fill="#626966" font-family="Instrument Sans" font-size="16" letter-spacing="1.8">BLOG.EJUPILABS.COM</text>
  <rect x="770" width="430" height="${height}" fill="#0E1111"/>
  <text x="816" y="54" fill="#AEB4B0" font-family="Instrument Sans" font-size="16" letter-spacing="1.6">${escapeXml(item.system)}</text>
  <path d="M816 74H1148" stroke="#F4F1EA" stroke-opacity=".24"/>
  ${nodes}
  <path d="M966 178V216M966 286V324M966 394V432" stroke="#E97A4A" stroke-width="2" marker-end="url(#arrow)"/>
  <path d="M816 556H1148" stroke="#F4F1EA" stroke-opacity=".24"/>
  <rect x="1118" y="574" width="30" height="30" fill="#E97A4A"/>
</svg>
`;
}

function expectedManifest(
  sources,
  pngs,
  brandSource,
  fontRegularSource,
  fontSemiboldSource,
) {
  return {
    schemaVersion: 1,
    dimensions: { width, height },
    brandSourceSha256: sha256(brandSource),
    fontSourceSha256: {
      regular: sha256(fontRegularSource),
      semibold: sha256(fontSemiboldSource),
    },
    assets: Object.fromEntries(
      localeKeys.map((localeKey) => [
        localeKey,
        {
          source: `design/social/case-studies-${localeKey}.svg`,
          output: `site/assets/social/case-studies-${localeKey}.png`,
          sourceSha256: sha256(sources[localeKey]),
          outputSha256: sha256(pngs[localeKey]),
        },
      ]),
    ),
  };
}

const brandSource = await readFile(
  resolve(projectRoot, "site", "assets", "brand", "ejupi-labs-primary-carbon.svg"),
);
const fontRegularSource = await readFile(
  resolve(projectRoot, "site", "assets", "fonts", "instrument-sans-regular.woff2"),
);
const fontSemiboldSource = await readFile(
  resolve(projectRoot, "site", "assets", "fonts", "instrument-sans-semibold.woff2"),
);
const brandHref = `data:image/svg+xml;base64,${brandSource.toString("base64")}`;
const fontRegularHref = `data:font/woff2;base64,${fontRegularSource.toString("base64")}`;
const fontSemiboldHref = `data:font/woff2;base64,${fontSemiboldSource.toString("base64")}`;
const sources = Object.fromEntries(
  localeKeys.map((localeKey) => [
    localeKey,
    socialSvg(localeKey, brandHref, fontRegularHref, fontSemiboldHref),
  ]),
);
const { default: sharp } = await import("sharp");
const renderPng = (source) =>
  sharp(Buffer.from(source))
    .png({ compressionLevel: 9 })
    .toBuffer();

async function verifyPortableRaster(localeKey, current, expected) {
  const [actual, reference] = await Promise.all([
    sharp(current).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
    sharp(expected).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
  ]);

  if (
    actual.info.width !== width
    || actual.info.height !== height
    || actual.info.channels !== 4
    || reference.info.width !== width
    || reference.info.height !== height
    || reference.info.channels !== 4
  ) {
    throw new Error(
      `The ${localeKey} social preview must decode to ${width}×${height} RGBA pixels.`,
    );
  }

  let differingPixels = 0;
  let channelError = 0;
  const pixelCount = width * height;

  for (let offset = 0; offset < actual.data.length; offset += 4) {
    let largestPixelError = 0;
    for (let channel = 0; channel < 4; channel += 1) {
      const difference = Math.abs(
        actual.data[offset + channel] - reference.data[offset + channel],
      );
      channelError += difference;
      largestPixelError = Math.max(largestPixelError, difference);
    }
    if (largestPixelError > 24) differingPixels += 1;
  }

  const differingPixelRatio = differingPixels / pixelCount;
  const meanChannelError = channelError / actual.data.length;
  if (
    differingPixelRatio > maxDifferingPixelRatio
    || meanChannelError > maxMeanChannelError
  ) {
    throw new Error(
      `The ${localeKey} social-preview PNG differs materially from its SVG `
      + `(${(differingPixelRatio * 100).toFixed(2)}% pixels, `
      + `${meanChannelError.toFixed(2)} mean channel error).`,
    );
  }
}

if (checkOnly) {
  const pngs = {};
  for (const localeKey of localeKeys) {
    const storedSource = await readFile(
      resolve(sourceRoot, `case-studies-${localeKey}.svg`),
      "utf8",
    );
    if (storedSource !== sources[localeKey]) {
      throw new Error(`The ${localeKey} social-preview SVG is stale.`);
    }
    const png = await readFile(resolve(outputRoot, `case-studies-${localeKey}.png`));
    const dimensions = pngDimensions(png);
    if (dimensions.width !== width || dimensions.height !== height) {
      throw new Error(`The ${localeKey} social preview must be ${width}×${height}.`);
    }
    const renderedPng = await renderPng(sources[localeKey]);
    await verifyPortableRaster(localeKey, png, renderedPng);
    pngs[localeKey] = png;
  }

  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const expected = expectedManifest(
    sources,
    pngs,
    brandSource,
    fontRegularSource,
    fontSemiboldSource,
  );
  if (JSON.stringify(manifest) !== JSON.stringify(expected)) {
    throw new Error("The social-preview manifest does not match the committed assets.");
  }
  console.log("Verified four localized 1200×630 social previews.");
} else {
  await mkdir(sourceRoot, { recursive: true });
  await mkdir(outputRoot, { recursive: true });
  const pngs = {};

  for (const localeKey of localeKeys) {
    const source = sources[localeKey];
    const png = await renderPng(source);
    await writeFile(resolve(sourceRoot, `case-studies-${localeKey}.svg`), source, "utf8");
    await writeFile(resolve(outputRoot, `case-studies-${localeKey}.png`), png);
    pngs[localeKey] = png;
  }

  await writeFile(
    manifestPath,
    `${JSON.stringify(
      expectedManifest(
        sources,
        pngs,
        brandSource,
        fontRegularSource,
        fontSemiboldSource,
      ),
      null,
      2,
    )}\n`,
    "utf8",
  );
  console.log("Generated four localized 1200×630 social previews.");
}
