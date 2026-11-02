/**
 * Testimonial Migration, Unpublish & Privacy Scrub Script
 * 
 * Safety & Privacy Architecture:
 * 1. Default mode is DRY RUN (simulates changes, modifies nothing).
 * 2. Unpublishes legacy published public-form submissions (turns them into drafts so they do not show live).
 * 3. Removes the stray 'approved' field from all testimonials (since schema no longer has it).
 * 4. Removes legacy 'email' fields from all testimonials (privacy compliance).
 * 5. Targeted safe deletion: allows deleting only drafts, legacy unapproved submissions, or explicit IDs.
 *    Never deletes approved published reviews unless explicitly named.
 * 
 * Usage:
 *   Dry Run (Default):
 *     node scripts/migrate-testimonials.js
 *   Unpublish Legacy Public Submissions (Dry Run):
 *     node scripts/migrate-testimonials.js --unpublish-legacy-public
 *   Unpublish Legacy Public Submissions (Execute):
 *     node scripts/migrate-testimonials.js --unpublish-legacy-public --execute
 *   Execute Safe Field Cleanup (unsets 'approved' & 'email'):
 *     node scripts/migrate-testimonials.js --execute
 *   Targeted Delete:
 *     node scripts/migrate-testimonials.js --delete-drafts
 *     node scripts/migrate-testimonials.js --delete-legacy-unapproved
 *     node scripts/migrate-testimonials.js --delete-ids=id1,id2
 */

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Helper to load env variables from Frontend/.env or .env.local
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

// Load env files
loadEnvFile(path.join(rootDir, "Frontend", ".env.local"));
loadEnvFile(path.join(rootDir, "Frontend", ".env"));
loadEnvFile(path.join(rootDir, ".env"));

// Command-line flag parsing
const args = process.argv.slice(2);
const isExecute = args.includes("--execute");
const isUnpublishLegacy = args.includes("--unpublish-legacy-public");
const isDeleteDrafts = args.includes("--delete-drafts");
const isDeleteLegacyUnapproved = args.includes("--delete-legacy-unapproved");
const isDeleteAllPublic = args.includes("--delete-public-submissions");

const deleteIdsArg = args.find((a) => a.startsWith("--delete-ids="));
const explicitDeleteIds = deleteIdsArg
  ? deleteIdsArg.split("=")[1].split(",").map((s) => s.trim()).filter(Boolean)
  : [];

const isDeleteMode =
  isDeleteDrafts ||
  isDeleteLegacyUnapproved ||
  explicitDeleteIds.length > 0 ||
  isDeleteAllPublic;

const isDryRun = !isExecute;

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  "n2y8hmqi";

const dataset =
  process.env.SANITY_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  "production";

const token = process.env.SANITY_WRITE_TOKEN;

console.log("==================================================");
console.log("  Sanity Testimonials Migration & Safety Tool");
console.log("==================================================");
console.log(`Mode:      ${isExecute ? "EXECUTE (Live mutations)" : "DRY RUN (Simulation only)"}`);
console.log(`Action:    ${isDeleteMode ? "DELETE" : isUnpublishLegacy ? "UNPUBLISH LEGACY" : "CLEANUP (Stray fields)"}`);
console.log(`Project:   ${projectId}`);
console.log(`Dataset:   ${dataset}`);
console.log("--------------------------------------------------");

// Resolve Sanity client module
let createClient;
try {
  const sanityClientPath = path.join(
    rootDir,
    "Frontend",
    "node_modules",
    "@sanity",
    "client",
    "dist",
    "index.js"
  );
  const mod = await import(pathToFileURL(sanityClientPath).href);
  createClient = mod.createClient;
} catch {
  const mod = await import("@sanity/client");
  createClient = mod.createClient;
}

if (!token) {
  console.log("\n⚠️ Note: SANITY_WRITE_TOKEN is not set in your environment.");
  console.log("Running in read-only public inspection mode...");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-05-01",
  token: token || undefined,
  useCdn: false,
  perspective: "raw", // Fetch both drafts and published documents
});

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function run() {
  try {
    console.log("Fetching all testimonial documents from Sanity (drafts & published)...");
    const docs = await client.fetch(
      `*[_type == "testimonial"]{ _id, _type, clientName, clientRole, quote, rating, approved, email, source, submittedAt }`
    );

    console.log(`Found ${docs.length} total testimonial document(s) in dataset "${dataset}".\n`);

    if (docs.length === 0) {
      console.log("ℹ️ No testimonial documents found in Sanity.");
      return;
    }

    // Categorize documents
    const studioDocs = [];
    const draftPublicDocs = [];
    const legacyPublishedPublicDocs = [];

    for (const doc of docs) {
      const isDraft = doc._id.startsWith("drafts.");
      const isPublicForm = doc.source === "public-form";

      if (isPublicForm) {
        if (isDraft) {
          draftPublicDocs.push(doc);
        } else {
          legacyPublishedPublicDocs.push(doc);
        }
      } else {
        studioDocs.push(doc);
      }
    }

    // 1. Studio Testimonials Section
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📁 1. Studio Testimonials (${studioDocs.length} found):`);
    console.log("   (Created via Studio. Safe and maintained.)");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    for (const doc of studioDocs) {
      const isDraft = doc._id.startsWith("drafts.");
      console.log(`• ID:       ${doc._id}`);
      console.log(`  Client:   ${doc.clientName || "Unnamed"} (${doc.clientRole || "No role"})`);
      console.log(`  Status:   ${isDraft ? "Draft" : "Published"}`);
      if (doc.approved !== undefined) {
        console.log(`  Stray:    'approved' field present (${doc.approved}) -> will be REMOVED`);
      }
      if (doc.email) {
        console.log(`  Privacy:  'email' field present (${doc.email}) -> will be REMOVED`);
      }
      console.log("");
    }

    // 2. Draft Public Form Submissions Section
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📬 2. Unpublished Draft Public Submissions (${draftPublicDocs.length} found):`);
    console.log("   (Created as drafts. Invisible on live site until published in Studio.)");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    for (const doc of draftPublicDocs) {
      console.log(`• ID:       ${doc._id}`);
      console.log(`  Client:   ${doc.clientName || "Unnamed"} (${doc.clientRole || "No role"})`);
      console.log(`  Status:   Unpublished Draft (Pending Moderation)`);
      if (doc.approved !== undefined) {
        console.log(`  Stray:    'approved' field present (${doc.approved}) -> will be REMOVED`);
      }
      if (doc.email) {
        console.log(`  Privacy:  'email' field present (${doc.email}) -> will be REMOVED`);
      }
      console.log("");
    }

    // 3. Legacy Published Public Submissions Section (CRITICAL DETECTION)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`⚠️ 3. Legacy Published Public Submissions (${legacyPublishedPublicDocs.length} found):`);
    if (legacyPublishedPublicDocs.length > 0) {
      console.log("   ⚠️ WARNING: These were published by older form versions (approved == false).");
      console.log("   Because public queries return all published testimonials, these are currently LIVE!");
      console.log("   Use --unpublish-legacy-public to convert them to drafts so they disappear from the live site.");
    } else {
      console.log("   ✅ None found. No unapproved public reviews are published on the live site.");
    }
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    for (const doc of legacyPublishedPublicDocs) {
      console.log(`• ID:       ${doc._id}`);
      console.log(`  Client:   ${doc.clientName || "Unnamed"} (${doc.clientRole || "No role"})`);
      console.log(`  Status:   ⚠️ PUBLISHED LIVE (approved: ${doc.approved ?? "undefined"})`);
      if (doc.approved !== undefined) {
        console.log(`  Stray:    'approved' field present (${doc.approved}) -> will be REMOVED`);
      }
      if (doc.email) {
        console.log(`  Privacy:  'email' field present (${doc.email}) -> will be REMOVED`);
      }
      console.log("");
    }

    // ==========================================
    // ACTION A: UNPUBLISH LEGACY PUBLIC SUBMISSIONS
    // ==========================================
    if (isUnpublishLegacy) {
      console.log("==================================================");
      console.log("  UNPUBLISH LEGACY PUBLIC SUBMISSIONS");
      console.log("==================================================");

      if (legacyPublishedPublicDocs.length === 0) {
        console.log("✅ No published public-form submissions found to unpublish.");
        return;
      }

      console.log(`The following ${legacyPublishedPublicDocs.length} document(s) will be converted from published to drafts:`);
      for (const doc of legacyPublishedPublicDocs) {
        console.log(`  • ${doc._id} (${doc.clientName || "Unnamed"})`);
      }

      if (isDryRun) {
        console.log("\n🔍 DRY RUN ONLY: No changes made.");
        console.log("To execute live, run:");
        console.log("  node scripts/migrate-testimonials.js --unpublish-legacy-public --execute");
        return;
      }

      if (!token) {
        console.error("\n❌ Error: SANITY_WRITE_TOKEN is required to unpublish documents.");
        process.exit(1);
      }

      console.log("\nExecuting unpublish (turning into drafts and deleting published version)...");
      for (const doc of legacyPublishedPublicDocs) {
        const cleanId = doc._id.replace(/^drafts\./, "");
        const draftId = `drafts.${cleanId}`;

        // Create draft version without system fields or stray fields
        const draftDoc = {
          ...doc,
          _id: draftId,
        };
        delete draftDoc._rev;
        delete draftDoc._createdAt;
        delete draftDoc._updatedAt;
        delete draftDoc.approved;
        delete draftDoc.email;

        // Transaction: create draft + delete published
        await client
          .transaction()
          .createOrReplace(draftDoc)
          .delete(cleanId)
          .commit();

        console.log(`  ✓ Converted to draft: ${draftId} (removed live doc ${cleanId})`);
      }

      console.log(`\n✅ Successfully unpublished ${legacyPublishedPublicDocs.length} review(s).`);
      console.log("They are now drafts awaiting moderation in Studio and are hidden from the live site.");
      return;
    }

    // ==========================================
    // ACTION B: TARGETED SAFE DELETE
    // ==========================================
    if (isDeleteMode) {
      console.log("==================================================");
      console.log("  TARGETED DELETION");
      console.log("==================================================");

      let targetDocs = [];

      if (explicitDeleteIds.length > 0) {
        // Explicit list of document IDs (allowed to target any ID explicitly requested)
        targetDocs = docs.filter((d) => explicitDeleteIds.includes(d._id));
        console.log(`Targeting explicit IDs (${explicitDeleteIds.join(", ")}): found ${targetDocs.length}`);
      } else if (isDeleteDrafts) {
        // Target only unpublished public-form drafts
        targetDocs = draftPublicDocs;
        console.log(`Targeting unpublished public-form drafts: found ${targetDocs.length}`);
      } else if (isDeleteLegacyUnapproved) {
        // Target legacy published public submissions that have approved == false
        targetDocs = legacyPublishedPublicDocs.filter((d) => d.approved === false);
        console.log(`Targeting legacy published public submissions with approved == false: found ${targetDocs.length}`);
      } else if (isDeleteAllPublic) {
        // Target ONLY unapproved public submissions (drafts + legacy approved === false)
        // Never target approved published reviews!
        targetDocs = [
          ...draftPublicDocs,
          ...legacyPublishedPublicDocs.filter((d) => d.approved === false),
        ];
        console.log(`Targeting unapproved public submissions (drafts & legacy unapproved): found ${targetDocs.length}`);
      }

      // Safety check: Never delete approved published reviews unless explicitly named in explicitDeleteIds
      targetDocs = targetDocs.filter((d) => {
        const isApprovedPublished =
          !d._id.startsWith("drafts.") && d.approved !== false && d.source !== "public-form";
        if (isApprovedPublished && !explicitDeleteIds.includes(d._id)) {
          console.warn(`  🛡️ SKIPPING approved published review ${d._id} (protection active)`);
          return false;
        }
        return true;
      });

      if (targetDocs.length === 0) {
        console.log("No matching documents found to delete.");
        return;
      }

      console.log(`\n⚠️ The following ${targetDocs.length} document(s) will be PERMANENTLY deleted:`);
      for (const doc of targetDocs) {
        const isDraft = doc._id.startsWith("drafts.");
        console.log(`  • ID: ${doc._id} | ${isDraft ? "Draft" : "Published"} | ${doc.clientName} (${doc.clientRole})`);
      }

      if (!token) {
        console.error("\n❌ Error: SANITY_WRITE_TOKEN is required to execute deletion.");
        process.exit(1);
      }

      console.log("--------------------------------------------------");
      const answer = await askQuestion(
        `Type 'delete' to confirm deletion of these ${targetDocs.length} document(s): `
      );

      if (answer.toLowerCase() !== "delete") {
        console.log("❌ Deletion cancelled by user.");
        return;
      }

      console.log("\nDeleting documents...");
      for (const doc of targetDocs) {
        await client.delete(doc._id);
        console.log(`  ✓ Deleted: ${doc._id} (${doc.clientName})`);
      }

      console.log("\n✅ Deletion complete.");
      return;
    }

    // ==========================================
    // ACTION C: STRAY FIELD CLEANUP (approved & email)
    // ==========================================
    console.log("==================================================");
    console.log("  STRAY FIELD CLEANUP SUMMARY");
    console.log("==================================================");

    const docsWithApproved = docs.filter((d) => d.approved !== undefined);
    const docsWithEmail = docs.filter((d) => Boolean(d.email));
    const docsNeedingCleanup = docs.filter(
      (d) => d.approved !== undefined || Boolean(d.email)
    );

    console.log(`- Documents with stray 'approved' field to be removed: ${docsWithApproved.length}`);
    console.log(`- Documents with legacy 'email' field to be removed:   ${docsWithEmail.length}`);
    console.log(`- Total documents needing field unsets:                ${docsNeedingCleanup.length}`);

    if (docsNeedingCleanup.length > 0) {
      console.log("\nDocuments to be cleaned up:");
      for (const doc of docsNeedingCleanup) {
        const unsets = [];
        if (doc.approved !== undefined) unsets.push("approved");
        if (doc.email) unsets.push("email");
        console.log(`  • ${doc._id} (${doc.clientName || "Unnamed"}) -> unset: [${unsets.join(", ")}]`);
      }
    }

    if (isDryRun) {
      console.log("\n--------------------------------------------------");
      console.log("🔍 DRY RUN COMPLETED (No data was modified).");
      console.log("--------------------------------------------------");
      if (legacyPublishedPublicDocs.length > 0) {
        console.log(`⚠️ ATTENTION: ${legacyPublishedPublicDocs.length} legacy public review(s) are currently PUBLISHED live!`);
        console.log("To convert them to drafts so you can moderate them in Studio:");
        console.log("  node scripts/migrate-testimonials.js --unpublish-legacy-public --execute");
      }
      if (docsNeedingCleanup.length > 0) {
        console.log("\nTo execute stray field removal ('approved' and 'email'):");
        console.log("  npm run migrate:testimonials");
      }
      console.log("==================================================");
      return;
    }

    if (!token) {
      console.error("\n❌ Error: Cannot execute live updates without SANITY_WRITE_TOKEN.");
      process.exit(1);
    }

    console.log("--------------------------------------------------");
    console.log("🚀 EXECUTING STRAY FIELD CLEANUP...");

    let cleanedCount = 0;
    for (const doc of docsNeedingCleanup) {
      const unsets = [];
      if (doc.approved !== undefined) unsets.push("approved");
      if (doc.email) unsets.push("email");

      if (unsets.length > 0) {
        await client.patch(doc._id).unset(unsets).commit();
        console.log(`  ✓ Unset [${unsets.join(", ")}] on ${doc._id}`);
        cleanedCount++;
      }
    }

    console.log("\n✅ Stray field cleanup complete!");
    console.log(`Removed stray fields from ${cleanedCount} document(s).`);
    console.log("No testimonials retain an 'approved' or 'email' field.");
    console.log("==================================================");
  } catch (err) {
    console.error("\n❌ Migration script error:", err.message);
    process.exit(1);
  }
}

run();
