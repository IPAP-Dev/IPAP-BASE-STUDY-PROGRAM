IPAP BASE STUDY PROGRAM — SAFARI / IPADOS WEB APP
Version 2.0.0
=====================================================

WHAT THIS VERSION ADDS
- The original Heart content remains 400 questions.
- Every existing question now has a permanent immutable ID: HEART-0001 through HEART-0400.
- A migration layer automatically translates the old positional IDs (for example Day 2|Q3-Second|12) into the new permanent IDs.
- Existing local progress can therefore carry forward, including attempts, correct/incorrect totals, Incorrect Bank entries, mastery streaks, removed questions, coverage state, and an in-progress saved quiz.
- Old v1 IPAP3 progress codes / JSON exports remain import-compatible. New transfer codes use the IPAP4 prefix.
- New exports use data schema version 4 and include the immutable-ID scheme metadata.
- Added visible app versioning and controlled service-worker update handling.
- On future hosted releases, the app can show "Application update available" with an "Update app now" button.
- Pressing the update button saves study progress first, activates the new cached application version, then reloads the app.
- The existing localStorage key remains unchanged: heartQuizTrainerAdaptiveProgressV1.

PERMANENT QUESTION-ID RULE — IMPORTANT
The IDs HEART-0001 through HEART-0400 must NEVER be renumbered or reused, even if a question is moved, rewritten, regrouped, or removed.

When new Heart questions are added later, assign new unused IDs after HEART-0400.
For new modules, use a separate permanent prefix, for example:
  PULM-0001
  RENAL-0001
  GI-0001
  NEURO-0001
  PHARM-0001

Once assigned, an ID belongs to that question permanently. This is what allows months or years of historical performance to survive content reorganizations.

FUTURE APPLICATION UPDATE RULE
For every published application-code/content release:
1. Keep the same public HTTPS origin / GitHub Pages address.
2. Keep the localStorage key unchanged unless a deliberate migration is written.
3. Keep all existing permanent question IDs unchanged.
4. Assign new permanent IDs only to genuinely new questions.
5. Increment APP_VERSION in index.html.
6. Increment APP_VERSION / CACHE_NAME in sw.js to the identical value.
7. Update version.json.
8. Deploy all changed files together.

When a previously installed version sees the new service worker, it will offer the in-app update action. User progress is saved before activation/reload.

HOW TO USE ON IPAD
1. Upload ALL contents of this folder to the same folder on a static HTTPS host.
2. Open the resulting https:// address in Safari on the iPad.
3. Confirm Start Quiz works.
4. Optional: Safari Share button -> Add to Home Screen.
5. Launch from the Home Screen thereafter for the app-style experience.

IMPORTANT CROSS-DEVICE LIMITATION
This remains a static web app. Browser-local history survives app-code updates on the SAME HTTPS origin/device, but it does not automatically synchronize between an iPad and a computer. Until a cloud backend/account is added, use the built-in progress code or progress JSON file to transfer progress between devices.

SAFETY BEFORE MAJOR CONTENT RELEASES
Although the migration/update system is designed to preserve progress, export a progress JSON file before a major question-bank expansion. This provides a portable backup independent of browser storage.

FILES
index.html              Main quiz app, 400-question bank, immutable IDs, migration logic, and update UI.
manifest.webmanifest    Web app metadata and Home Screen configuration.
sw.js                   Versioned offline cache and controlled update activation.
version.json             Machine-readable application/data version metadata.
CHANGELOG.txt            Release notes.
icons/                   iPad/Home Screen and PWA icons.
