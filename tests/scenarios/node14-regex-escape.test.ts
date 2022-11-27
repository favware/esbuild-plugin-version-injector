import '../../src/StringReplaceAllPolyfill';

describe('Validate RegExp escaping for Node 14', () => {
  test('GIVEN string with RegExp Capture Group THEN removes it from input string', () => {
    const regex = '[VI]{{inject}}[/VI]';
    const inputString = 'This is a test string with a [VI]{{inject}}[/VI] in it.';
    const outputString = 'This is a test string with a replacement in it.';

    expect(inputString.replaceAll(regex, 'replacement')).toEqual(outputString);
  });
});
