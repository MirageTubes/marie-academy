// Generates every photo on the site with Google Gemini, in one consistent art direction.
//
//   npm run images            # create any images that are missing
//   npm run images -- --force # regenerate everything
//   npm run images -- hero camp   # (re)generate only these keys
//
// Needs GEMINI_API_KEY in .env.local (free key: https://aistudio.google.com/apikey).
// Optional: GEMINI_IMAGE_MODEL to pin a model; otherwise the newest image model is picked.

import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const STYLE =
  "Cinematic editorial photograph for a world-class performing arts conservatory. " +
  "Deep black backgrounds, warm golden stage lighting, rich contrast, subtle film grain, shallow depth of field, " +
  "shot on a full-frame camera with a 35mm or 85mm lens. Elegant, emotional, authentic, diverse students. " +
  "Natural anatomy and hands. Absolutely no text, letters, logos, signage, or watermarks.";

// key → [output path in /public, aspect ratio, subject]
const shots = {
  hero: ["images/hero.jpg", "16:9", "A graceful ballerina in a grand jeté leap on an empty dark stage, a single golden spotlight from above, haze in the light beam, dancer placed on the right third of the frame leaving dark negative space on the left"],
  about: ["images/about.jpg", "16:9", "Students of different ages — young children, teenagers, and adults — laughing together in a large sunlit dance studio with wooden floors, mirrors, and tall windows, warm late-afternoon light"],
  dance: ["images/dance.jpg", "4:3", "Teenage ballet dancers in black leotards rehearsing at the barre in a light-filled studio, elegant extended lines, golden window light"],
  danceClass: ["images/dance-class.jpg", "4:3", "A ballet teacher gently correcting the arm position of a young student in a studio, warm and encouraging moment"],
  drama: ["images/drama.jpg", "4:3", "Two young actors performing an intense emotional scene on a theatre stage under dramatic warm spotlight, red velvet curtain softly visible behind"],
  dramaClass: ["images/drama-class.jpg", "4:3", "Teen actors seated in a circle reading scripts and laughing in a rehearsal room, director leaning in, candid moment"],
  music: ["images/music.jpg", "4:3", "A young violinist and a pianist with a black grand piano performing together in an intimate recital hall, warm stage light, dark audience"],
  musicClass: ["images/music-class.jpg", "4:3", "A child learning piano with a kind teacher sitting beside her, close-up on hands on the keys, warm practice room light"],
  camp: ["images/camp.jpg", "16:9", "Joyful children aged 7 to 12 dancing and laughing together in a bright studio at summer camp, colorful casual clothes, motion and energy, subjects on the right half of the frame"],
  campDay: ["images/camp-day.jpg", "4:5", "A group of children in simple costumes taking a bow together on a small stage after their summer camp showcase, golden light, proud smiles"],
  admissions: ["images/admissions.jpg", "4:3", "A teenage dancer auditioning in a studio, mid-movement, with a panel of three faculty members seated at a table in soft focus in the foreground"],
  performances: ["images/performances.jpg", "4:5", "View from the back of a full theatre audience in silhouette looking toward a brightly lit stage with performers, warm golden glow, cinematic"],
  give: ["images/give.jpg", "16:9", "Close-up of a young dancer's hands tying the ribbons of pink pointe shoes backstage, soft golden light, dark background, dancer on the right of the frame"],
  contact: ["images/contact.jpg", "16:9", "A warm, modern performing arts academy entrance lobby at dusk, glass doors, wooden accents, soft golden interior light glowing out, inviting"],
  "news-pre-professional-dancers-win-regional": ["images/news/pre-professional-dancers-win-regional.jpg", "16:9", "Teenage ballet dancers in classical tutus celebrating together on stage after a competition, holding a trophy, golden stage light"],
  "news-summer-camp-registration-opens": ["images/news/summer-camp-registration-opens.jpg", "16:9", "Children at a performing arts summer camp painting set pieces and rehearsing, sunny and playful atmosphere"],
  "news-alumna-joins-national-company": ["images/news/alumna-joins-national-company.jpg", "16:9", "A young professional musical theatre performer singing center stage in a big production number, dramatic warm lighting"],
  "news-new-recital-hall-season": ["images/news/new-recital-hall-season.jpg", "16:9", "An elegant empty recital hall with a black grand piano on stage under a soft spotlight, wooden acoustic panels, rows of seats"],
};

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error("Missing GEMINI_API_KEY. Add it to .env.local (get one at https://aistudio.google.com/apikey).");
  process.exit(1);
}

const api = "https://generativelanguage.googleapis.com/v1beta";
const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

async function pickModel() {
  if (process.env.GEMINI_IMAGE_MODEL) return process.env.GEMINI_IMAGE_MODEL;
  const res = await fetch(`${api}/models?pageSize=200`, { headers: { "x-goog-api-key": key } });
  if (!res.ok) throw new Error(`Could not list models (${res.status}): ${await res.text()}`);
  const { models = [] } = await res.json();
  const candidates = models
    .filter((m) => /image/i.test(m.name) && !/imagen/i.test(m.name) && m.supportedGenerationMethods?.includes("generateContent"))
    .map((m) => m.name.replace("models/", ""));
  // Prefer "pro" image models, then newest version numbers.
  candidates.sort((a, b) => Number(/pro/.test(b)) - Number(/pro/.test(a)) || b.localeCompare(a, undefined, { numeric: true }));
  if (!candidates.length) throw new Error("No Gemini image model is available for this key.");
  return candidates[0];
}

async function generate(model, name, [out, aspectRatio, subject]) {
  const file = join("public", out);
  if (!force && existsSync(file)) return console.log(`• ${name}: exists, skipping`);

  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(`${api}/models/${model}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${subject}. ${STYLE}` }] }],
        generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio } },
      }),
    });
    if (res.ok) {
      const json = await res.json();
      const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
      if (part) {
        mkdirSync(dirname(file), { recursive: true });
        await sharp(Buffer.from(part.inlineData.data, "base64"))
          .resize({ width: 2400, withoutEnlargement: true })
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(file);
        return console.log(`✓ ${name} → ${file}`);
      }
      console.warn(`  ${name}: no image returned (${json.candidates?.[0]?.finishReason ?? "unknown"}), retrying…`);
    } else {
      const body = await res.text();
      if (res.status === 400 || res.status === 403) throw new Error(`${name}: ${res.status} ${body}`);
      console.warn(`  ${name}: HTTP ${res.status}, retrying…`);
    }
    await new Promise((r) => setTimeout(r, 4000 * attempt));
  }
  console.error(`✗ ${name}: failed after 3 attempts`);
  process.exitCode = 1;
}

const model = await pickModel();
console.log(`Using ${model}\n`);
const queue = Object.entries(shots).filter(([name]) => !only.length || only.includes(name));
const workers = Array.from({ length: 3 }, async () => {
  for (let next; (next = queue.shift()); ) await generate(model, next[0], next[1]);
});
await Promise.all(workers);
