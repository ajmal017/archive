/**
 * thanks to: https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
 * @description determine if an array contains one or more items from another array.
 * @param {array} haystack the array to search.
 * @param {array} arr the array providing items to check for in the haystack.
 * @return {boolean} true|false if haystack contains at least one item from arr.
 */
export function doArraysHaveMatchingElement(haystack, arr) {
	return arr.some(v => haystack.indexOf(v) >= 0);
}
