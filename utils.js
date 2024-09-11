"use strict";

// check if an element is in an array
export function containsSubArray(array, element) {
	for (let i = 0; i < array.length; i++) {
		if (array[i][0] === element[0] && array[i][1] === element[1]) {
			return true;
		}
	}
	return false;
}

// check if array1 is equal to array2
export function equalArray(array1, array2) {
	if (array1[0] === array2[0] && array1[1] === array2[1]) {
		return true;
	}
	return false;
}
