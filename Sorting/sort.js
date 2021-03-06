/**
 *
 * @param {number[]} array
 * @returns {number[]} Sorted Array
 */
const SelectionSortArray = (array) => {
	for (let i = 0; i < array.length; i++) {
		for (let j = i; j < array.length; j++) {
			if (array[i] > array[j]) {
				[array[i], array[j]] = [array[j], array[i]];
			}
		}
	}
	return array;
};
