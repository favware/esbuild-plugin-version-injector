/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
  // eslint-disable-next-line no-extend-native
  String.prototype.replaceAll = function replaceAll(str: string | RegExp, newStr: string | ((substring: string, ...args: any[]) => string)): string {
    // If a regex pattern
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      // @ts-ignore newStr can be both a string or a function returning a string
      return this.replace(str, newStr);
    }

    // If a string
    // @ts-ignore newStr can be both a string or a function returning a string
    return this.replace(new RegExp(str, 'g'), newStr);
  };
}
