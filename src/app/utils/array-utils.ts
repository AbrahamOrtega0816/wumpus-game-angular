export default class ArrayUtils {

  getIndexesFromSize(lines: any) {
    let array = [];

    for (let i = 0; i < lines; i++) {
      array.push(i);
    }

    return array;
  }

  getIndexes(lines: any, columns: any) {
    let array = [];

    for (let i = 0; i < lines; i++) {
      for (let j = 0; j < columns; j++) {
        array.push([i, j]);
      }
    }

    return array;
  }

  copy(array: any = []) {
    let copy = [];

    for (let i = 0; i < array?.length; i++) {
      copy.push(array[i]);
    }

    return copy;
  }

  equals(array1: any, array2: any) {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] != array2[i]) {
        return false;
      }
    }

    return true;
  }

  search(array: any, value: any) {
    for (let i = 0; i < array.length; i++) {
      if (this.equals(array[i], value)) {
        return array[i];
      }
    }
  }

  contains(array: any, value: any) {
    for (let i = 0; i < array.length; i++) {
      if (this.equals(array[i], value)) {
        return true;
      }
    }

    return false;
  }

  removeByValue(array: any, value: any) {
    var index = array.indexOf(value);

    if (index > -1) {
      array.splice(index, 1);
    }
  }

  removeByValues(array: any, values: any) {
    let filtered: any = [];

    array.forEach((el1: any) => {
      if (!this.contains(values, el1)) {
        filtered.push(el1);
      }
    });

    return filtered;
  }
}
