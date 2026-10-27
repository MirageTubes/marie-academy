// Downloads the site's stock photography from Pexels (free for commercial use, no attribution required).
//
//   npm run photos            # download any photos that are missing
//   npm run photos -- --force # re-download everything
//
// Needs PEXELS_API_KEY in .env.local (free key: https://www.pexels.com/api).
// To swap a photo, find one on pexels.com and replace its ID below (the number at the end of its URL).

import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

// path in /public → Pexels photo ID (photographer credited for the record)
const photos = {
  "images/hero.jpg": { id: 4250534, by: "Marlon Ribeiro", flip: true }, // mirrored so the dancer sits right of the headline
  "images/about.jpg": { id: 6718450, by: "cottonbro studio" },
  "images/dance.jpg": { id: 8463037, by: "MART PRODUCTION" },
  "images/dance-class.jpg": { id: 5888316, by: "Gustavo Fring" },
  "images/drama.jpg": { id: 6896323, by: "cottonbro studio" },
  "images/drama-class.jpg": { id: 6896184, by: "cottonbro studio" },
  "images/music.jpg": { id: 7097470, by: "cottonbro studio" },
  "images/music-class.jpg": { id: 7714141, by: "Boris Pavlikovsky" },
  "images/camp.jpg": { id: 7667327, by: "Nadezhda Moryak" },
  "images/camp-day.jpg": { id: 5801566, by: "cottonbro studio" },
  "images/admissions.jpg": { id: 8462754, by: "MART PRODUCTION" },
  "images/performances.jpg": { id: 8994700, by: "Инесса" },
  "images/give.jpg": { id: 5154027, by: "Budgeron Bach" },
  "images/contact.jpg": { id: 6713390, by: "cottonbro studio" },
  "images/news/pre-professional-dancers-win-regional.jpg": { id: 21311036, by: "Leung Kwok Tung" },
  "images/news/summer-camp-registration-opens.jpg": { id: 8033897, by: "RDNE Stock project" },
  "images/news/alumna-joins-national-company.jpg": { id: 16108227, by: "Franco Monsalvo" },
  "images/news/new-recital-hall-season.jpg": { id: 18238104, by: "Hoàng Tiến Việt" },
};

const key = process.env.PEXELS_API_KEY;
if (!key) {
  console.error("Missing PEXELS_API_KEY. Add it to .env.local (get one at https://www.pexels.com/api).");
  process.exit(1);
}
const force = process.argv.includes("--force");

for (const [out, { id, by, flip }] of Object.entries(photos)) {
  const file = join("public", out);
  if (!force && existsSync(file)) {
    console.log(`• ${out}: exists, skipping`);
    continue;
  }
  const meta = await fetch(`https://api.pexels.com/v1/photos/${id}`, { headers: { Authorization: key } });
  if (!meta.ok) {
    console.error(`✗ ${out}: Pexels returned ${meta.status}`);
    process.exitCode = 1;
    continue;
  }
  const { src } = await meta.json();
  const img = Buffer.from(await (await fetch(`${src.original}?auto=compress&w=2600`)).arrayBuffer());
  mkdirSync(dirname(file), { recursive: true });
  let pipeline = sharp(img).rotate().resize({ width: 2400, withoutEnlargement: true });
  if (flip) pipeline = pipeline.flop();
  await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(file);
  console.log(`✓ ${out}  (photo by ${by})`);
}
