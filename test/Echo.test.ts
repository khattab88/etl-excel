import { Echo } from '../src/index';

test('Echo', () => {
  expect(Echo('Excel')).toBe('Hello Excel');
});