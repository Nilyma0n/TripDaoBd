import fs from "fs";
import path from "path";
import vm from "vm";
import dotenv from "dotenv";
import pool from "../config/db.js";

dotenv.config();

const DRY_RUN = process.argv.includes("--dry-run");

const ROOT_DIR = path.resolve(process.cwd(), "..");

const DESTINATION_FILE = path.join(
  ROOT_DIR,
  "client",
  "src",
  "data",
  "mock",
  "destinations.ts"
);

console.log("");
console.log("==============================================");
console.log("TripDaoBD Destination Seeder");
console.log("==============================================");
console.log("");

function cleanTypeScript(source) {
  let code = source;

  // --------------------------------------------------
  // 1. Remove TypeScript type-only imports
  // --------------------------------------------------

  code = code.replace(
    /import\s+type\s+[\s\S]*?from\s+["'][^"']+["'];?/g,
    ""
  );

  // --------------------------------------------------
  // 2. Convert normal image imports into strings
  // --------------------------------------------------

  code = code.replace(
    /import\s+([A-Za-z_$][\w$]*)\s+from\s+["']([^"']+)["'];?/g,
    (_, variableName, importPath) => {
      return `const ${variableName} = ${JSON.stringify(importPath)};`;
    }
  );

  // --------------------------------------------------
  // 3. Remove remaining side-effect imports
  // --------------------------------------------------

  code = code.replace(
    /import\s+["'][^"']+["'];?/g,
    ""
  );

  // --------------------------------------------------
  // 4. Remove export keywords
  // --------------------------------------------------

  code = code.replace(
    /\bexport\s+default\s+/g,
    ""
  );

  code = code.replace(
    /\bexport\s+/g,
    ""
  );

  // --------------------------------------------------
  // 5. Replace typed createDestination function
  // --------------------------------------------------

  code = code.replace(
    /const\s+createDestination\s*=\s*\([\s\S]*?\)\s*:\s*Destination\s*=>\s*\(\{/,
    "const createDestination = (data) => ({"
  );

  // --------------------------------------------------
  // 6. Remove type annotation from destinations array
  // --------------------------------------------------

  code = code.replace(
    /const\s+destinations\s*:\s*Destination\[\]\s*=/,
    "const destinations ="
  );

  // --------------------------------------------------
  // 7. Remove simple TypeScript assertions
  // --------------------------------------------------

  code = code.replace(
    /\s+as\s+const\b/g,
    ""
  );

  code = code.replace(
    /\s+as\s+Destination\b/g,
    ""
  );

  return code;
}

function extractDestinations(source) {
  console.log("Reading destinations.ts...");
  console.log("");

  const cleaned = cleanTypeScript(source);

  const sandbox = {
    console,
  };

  vm.createContext(sandbox);

  try {
    vm.runInContext(
      `
      ${cleaned}

      globalThis.__TRIPDAO_DESTINATIONS__ = destinations;
      `,
      sandbox,
      {
        filename: "destinations.ts",
      }
    );
  } catch (error) {
    throw new Error(
      `Could not evaluate destinations.ts:
${error.message}`
    );
  }

  const destinations =
    sandbox.__TRIPDAO_DESTINATIONS__;

  if (!Array.isArray(destinations)) {
    throw new Error(
      "Could not find exported destinations array."
    );
  }

  return destinations;
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function safeNumber(value, fallback = 0) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

function safeBoolean(value) {
  return value === true ? 1 : 0;
}

function normalizeImage(image) {
  if (!image) {
    return null;
  }

  if (typeof image === "string") {
    return image;
  }

  return String(image);
}

function normalizeDestination(destination) {
  return {
    id: destination.id,

    slug: destination.slug,

    name: destination.name,

    district: destination.district,

    division: destination.division,

    category: destination.category,

    short_description:
      destination.shortDescription || "",

    description:
      destination.description || "",

    hero_image:
      normalizeImage(destination.heroImage),

    latitude:
      destination.latitude !== undefined
        ? safeNumber(destination.latitude, null)
        : null,

    longitude:
      destination.longitude !== undefined
        ? safeNumber(destination.longitude, null)
        : null,

    map_url:
      destination.mapUrl || null,

    best_season:
      destination.bestSeason || null,

    opening_hours:
      destination.openingHours || null,

    entry_fee:
      destination.entryFee !== undefined
        ? safeNumber(destination.entryFee, 0)
        : 0,

    estimated_duration:
      destination.estimatedDuration || null,

    rating:
      safeNumber(destination.rating, 0),

    total_reviews:
      Math.max(
        0,
        Math.floor(
          safeNumber(
            destination.totalReviews,
            0
          )
        )
      ),

    featured:
      safeBoolean(destination.featured),

    popular:
      safeBoolean(destination.popular),

    images:
      safeArray(destination.images),

    highlights:
      safeArray(destination.highlights),

    activities:
      safeArray(destination.thingsToDo),

    reviews:
      safeArray(destination.reviews),
  };
}

async function upsertDestination(
  connection,
  destination
) {
  const sql = `
    INSERT INTO destinations (
      slug,
      name,
      district,
      division,
      category,
      short_description,
      description,
      hero_image,
      latitude,
      longitude,
      map_url,
      best_season,
      opening_hours,
      entry_fee,
      estimated_duration,
      rating,
      total_reviews,
      featured,
      popular
    )
    VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?
    )

    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      district = VALUES(district),
      division = VALUES(division),
      category = VALUES(category),
      short_description = VALUES(short_description),
      description = VALUES(description),
      hero_image = VALUES(hero_image),
      latitude = VALUES(latitude),
      longitude = VALUES(longitude),
      map_url = VALUES(map_url),
      best_season = VALUES(best_season),
      opening_hours = VALUES(opening_hours),
      entry_fee = VALUES(entry_fee),
      estimated_duration = VALUES(estimated_duration),
      rating = VALUES(rating),
      total_reviews = VALUES(total_reviews),
      featured = VALUES(featured),
      popular = VALUES(popular)
  `;

  const values = [
    destination.slug,
    destination.name,
    destination.district,
    destination.division,
    destination.category,
    destination.short_description,
    destination.description,
    destination.hero_image,
    destination.latitude,
    destination.longitude,
    destination.map_url,
    destination.best_season,
    destination.opening_hours,
    destination.entry_fee,
    destination.estimated_duration,
    destination.rating,
    destination.total_reviews,
    destination.featured,
    destination.popular,
  ];

  await connection.execute(
    sql,
    values
  );

  const [rows] =
    await connection.execute(
      `
        SELECT id
        FROM destinations
        WHERE slug = ?
        LIMIT 1
      `,
      [destination.slug]
    );

  if (!rows.length) {
    throw new Error(
      `Could not retrieve destination ID for ${destination.slug}`
    );
  }

  return rows[0].id;
}

async function replaceImages(
  connection,
  destinationId,
  destination
) {
  await connection.execute(
    `
      DELETE FROM destination_images
      WHERE destination_id = ?
    `,
    [destinationId]
  );

  const images =
    safeArray(destination.images);

  let inserted = 0;

  for (
    let index = 0;
    index < images.length;
    index++
  ) {
    const imageUrl =
      normalizeImage(images[index]);

    if (!imageUrl) {
      continue;
    }

    await connection.execute(
      `
        INSERT INTO destination_images (
          destination_id,
          image_url,
          alt_text,
          sort_order
        )
        VALUES (?, ?, ?, ?)
      `,
      [
        destinationId,
        imageUrl,
        `${destination.name} image ${index + 1}`,
        index + 1,
      ]
    );

    inserted++;
  }

  return inserted;
}

async function replaceHighlights(
  connection,
  destinationId,
  destination
) {
  await connection.execute(
    `
      DELETE FROM destination_highlights
      WHERE destination_id = ?
    `,
    [destinationId]
  );

  const highlights =
    safeArray(destination.highlights);

  let inserted = 0;

  for (
    let index = 0;
    index < highlights.length;
    index++
  ) {
    const highlight =
      String(
        highlights[index] || ""
      ).trim();

    if (!highlight) {
      continue;
    }

    await connection.execute(
      `
        INSERT INTO destination_highlights (
          destination_id,
          highlight,
          sort_order
        )
        VALUES (?, ?, ?)
      `,
      [
        destinationId,
        highlight,
        index + 1,
      ]
    );

    inserted++;
  }

  return inserted;
}

async function replaceActivities(
  connection,
  destinationId,
  destination
) {
  await connection.execute(
    `
      DELETE FROM destination_activities
      WHERE destination_id = ?
    `,
    [destinationId]
  );

  const activities =
    safeArray(destination.activities);

  let inserted = 0;

  for (
    let index = 0;
    index < activities.length;
    index++
  ) {
    const activity =
      String(
        activities[index] || ""
      ).trim();

    if (!activity) {
      continue;
    }

    await connection.execute(
      `
        INSERT INTO destination_activities (
          destination_id,
          activity,
          sort_order
        )
        VALUES (?, ?, ?)
      `,
      [
        destinationId,
        activity,
        index + 1,
      ]
    );

    inserted++;
  }

  return inserted;
}

async function insertReviews(
  connection,
  destinationId,
  destination
) {
  const reviews =
    safeArray(destination.reviews);

  let inserted = 0;

  for (const review of reviews) {
    if (
      !review ||
      typeof review !== "object"
    ) {
      continue;
    }

    const userName =
      review.userName ||
      review.user_name ||
      "Anonymous";

    const rating =
      safeNumber(review.rating, 0);

    const comment =
      review.comment || "";

    if (
      !comment ||
      rating < 1 ||
      rating > 5
    ) {
      continue;
    }

    const reviewDate =
      review.reviewDate ||
      review.review_date ||
      null;

    const [existing] =
      await connection.execute(
        `
          SELECT id
          FROM destination_reviews
          WHERE destination_id = ?
            AND user_name = ?
            AND rating = ?
            AND comment = ?
          LIMIT 1
        `,
        [
          destinationId,
          userName,
          rating,
          comment,
        ]
      );

    if (existing.length) {
      continue;
    }

    await connection.execute(
      `
        INSERT INTO destination_reviews (
          destination_id,
          user_id,
          user_name,
          rating,
          comment,
          review_date
        )
        VALUES (?, NULL, ?, ?, ?, ?)
      `,
      [
        destinationId,
        userName,
        rating,
        comment,
        reviewDate,
      ]
    );

    inserted++;
  }

  return inserted;
}

async function main() {
  let source;

  try {
    source =
      fs.readFileSync(
        DESTINATION_FILE,
        "utf8"
      );
  } catch (error) {
    throw new Error(
      `Could not read destinations.ts:
${error.message}`
    );
  }

  // ----------------------------------------------
  // Extract raw destinations
  // ----------------------------------------------

  const rawDestinations =
    extractDestinations(source);

  console.log(
    `Found ${rawDestinations.length} destinations.`
  );

  console.log("");

  // ----------------------------------------------
  // Validate source count
  // ----------------------------------------------

  if (rawDestinations.length !== 141) {
    throw new Error(
      `Expected 141 destinations, but found ${rawDestinations.length}.`
    );
  }

  // ----------------------------------------------
  // Normalize destinations
  // ----------------------------------------------

  const destinations =
    rawDestinations.map(
      normalizeDestination
    );

  console.log(
    "✓ Destination structure validated."
  );

  // ----------------------------------------------
  // Preview statistics
  // ----------------------------------------------

  const withImages =
    destinations.filter(
      (destination) =>
        destination.images.length > 0
    ).length;

  const withHighlights =
    destinations.filter(
      (destination) =>
        destination.highlights.length > 0
    ).length;

  const withActivities =
    destinations.filter(
      (destination) =>
        destination.activities.length > 0
    ).length;

  const withReviews =
    destinations.filter(
      (destination) =>
        destination.reviews.length > 0
    ).length;

  const totalImageRows =
    destinations.reduce(
      (total, destination) =>
        total +
        destination.images.length,
      0
    );

  const totalHighlightRows =
    destinations.reduce(
      (total, destination) =>
        total +
        destination.highlights.length,
      0
    );

  const totalActivityRows =
    destinations.reduce(
      (total, destination) =>
        total +
        destination.activities.length,
      0
    );

  const totalReviewRows =
    destinations.reduce(
      (total, destination) =>
        total +
        destination.reviews.length,
      0
    );

  console.log("");

  console.log(
    "----------------------------------------------"
  );

  console.log("Seed Preview");

  console.log(
    "----------------------------------------------"
  );

  console.log(
    `Destinations       : ${destinations.length}`
  );

  console.log(
    `With images        : ${withImages}`
  );

  console.log(
    `Image rows         : ${totalImageRows}`
  );

  console.log(
    `With highlights    : ${withHighlights}`
  );

  console.log(
    `Highlight rows     : ${totalHighlightRows}`
  );

  console.log(
    `With activities    : ${withActivities}`
  );

  console.log(
    `Activity rows      : ${totalActivityRows}`
  );

  console.log(
    `With reviews       : ${withReviews}`
  );

  console.log(
    `Review rows        : ${totalReviewRows}`
  );

  console.log(
    `First destination  : ${destinations[0].name}`
  );

  console.log(
    `Last destination   : ${
      destinations[
        destinations.length - 1
      ].name
    }`
  );

  console.log(
    "----------------------------------------------"
  );

  console.log("");

  // ----------------------------------------------
  // Dry run
  // ----------------------------------------------

  if (DRY_RUN) {
    console.log(
      "✓ DRY RUN completed successfully."
    );

    console.log(
      "No database records were changed."
    );

    console.log("");

    return;
  }

  // ----------------------------------------------
  // Database seed
  // ----------------------------------------------

  const connection =
    await pool.getConnection();

  try {
    await connection.beginTransaction();

    let destinationCount = 0;
    let imageCount = 0;
    let highlightCount = 0;
    let activityCount = 0;
    let reviewCount = 0;

    for (
      const destination
      of destinations
    ) {
      const destinationId =
        await upsertDestination(
          connection,
          destination
        );

      imageCount +=
        await replaceImages(
          connection,
          destinationId,
          destination
        );

      highlightCount +=
        await replaceHighlights(
          connection,
          destinationId,
          destination
        );

      activityCount +=
        await replaceActivities(
          connection,
          destinationId,
          destination
        );

      reviewCount +=
        await insertReviews(
          connection,
          destinationId,
          destination
        );

      destinationCount++;

      if (
        destinationCount % 25 === 0 ||
        destinationCount ===
          destinations.length
      ) {
        console.log(
          `Processed ${destinationCount}/${destinations.length}`
        );
      }
    }

    await connection.commit();

    console.log("");

    console.log(
      "=============================================="
    );

    console.log(
      "✓ DESTINATION SEED COMPLETED"
    );

    console.log(
      "=============================================="
    );

    console.log("");

    console.log(
      `Destinations inserted/updated : ${destinationCount}`
    );

    console.log(
      `Images inserted              : ${imageCount}`
    );

    console.log(
      `Highlights inserted          : ${highlightCount}`
    );

    console.log(
      `Activities inserted          : ${activityCount}`
    );

    console.log(
      `Reviews inserted             : ${reviewCount}`
    );

    console.log("");
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}

main()
  .catch((error) => {
    console.error("");

    console.error(
      "✗ Destination seed failed."
    );

    console.error(
      error.message
    );

    console.error("");

    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });