// CJK titles without spaces must wrap on thumbnails and vertical covers (#97).
import test from 'node:test';
import assert from 'node:assert/strict';
import { wrapTitle } from '../src/publish.mjs';

test('a Chinese title wraps into lines of at most max code points (#97)', () => {
  const lines = wrapTitle('今天我们来做一个游戏的完整教程，非常有趣的内容，一定要看一看', 12).split('\n');
  assert.ok(lines.length <= 3);
  assert.ok(lines.every((l) => [...l].length <= 12), `line too long: ${JSON.stringify(lines)}`);
  assert.ok(lines.length > 1, 'the title must actually wrap');
});

test('a Japanese title with kana and kanji wraps the same way (#97)', () => {
  const lines = wrapTitle('ゲームを作る完全チュートリアルとても面白い内容です', 12).split('\n');
  assert.ok(lines.length <= 3 && lines.length > 1);
  assert.ok(lines.every((l) => [...l].length <= 12));
});

test('a CJK title longer than three lines ends in an ellipsis (#97)', () => {
  const lines = wrapTitle('今天我们来做一个游戏'.repeat(6), 12).split('\n');
  assert.equal(lines.length, 3);
  assert.ok(lines[2].endsWith('…'));
  assert.ok([...lines[2]].length <= 12);
});

test('space-separated titles wrap exactly as before (#97)', () => {
  assert.equal(wrapTitle('Short title here for the thing', 12), 'Short title\nhere for the\nthing');
  assert.equal(wrapTitle('The Last Lighthouse Keeper: A', 12), 'The Last\nLighthouse\nKeeper: A');
  assert.equal(wrapTitle('The Last Lighthouse Keeper: A Story About Courage', 12), 'The Last\nLighthouse\nKeeper: A…');
});
