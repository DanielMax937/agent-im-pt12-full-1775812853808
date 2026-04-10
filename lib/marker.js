const fs = require('fs');
const path = require('path');

const RUN_ID = '1775812895341';

function findMarkerFilename(rootDir) {
  const names = fs.readdirSync(rootDir);
  const prefix = `.kanban-e2e-${RUN_ID}-`;
  const match = names.find((name) => name.startsWith(prefix) && name.endsWith('.txt'));
  if (!match) {
    throw new Error(`Kanban E2E marker not found (expected ${prefix}*.txt in repo root)`);
  }
  return match;
}

function getMarkerToken() {
  const rootDir = path.join(__dirname, '..');
  const markerPath = path.join(rootDir, findMarkerFilename(rootDir));
  return fs.readFileSync(markerPath, 'utf8').trim();
}

module.exports = { getMarkerToken };
