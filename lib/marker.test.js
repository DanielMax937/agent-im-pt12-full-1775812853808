const fs = require('fs');
const path = require('path');
const { getMarkerToken } = require('./marker');

const RUN_ID = '1775812895341';

describe('pt12 marker', () => {
  test('throws when Kanban E2E marker file is absent', () => {
    const spy = jest.spyOn(fs, 'readdirSync').mockReturnValueOnce([]);
    expect(() => getMarkerToken()).toThrow(
      /Kanban E2E marker not found \(expected \.kanban-e2e-1775812895341-\*\.txt in repo root\)/,
    );
    spy.mockRestore();
  });

  test('reads expected Kanban E2E token from repo root file', () => {
    const rootDir = path.join(__dirname, '..');
    const prefix = `.kanban-e2e-${RUN_ID}-`;
    const markerName = fs
      .readdirSync(rootDir)
      .find((name) => name.startsWith(prefix) && name.endsWith('.txt'));
    expect(markerName).toBeDefined();
    const expected = fs.readFileSync(path.join(rootDir, markerName), 'utf8').trim();
    expect(getMarkerToken()).toBe(expected);
    expect(expected.startsWith(`${RUN_ID}-`)).toBe(true);
  });
});
