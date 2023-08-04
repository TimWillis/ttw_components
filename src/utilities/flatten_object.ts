export interface FlatObject {
  [key: string]: any;
}

const flatten_object = (ob: any): FlatObject => {
  let toReturn: FlatObject = {};

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == 'object' && !Array.isArray(ob[i]) && ob[i] !== null) {
      let flatObject = flatten_object(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }

  return toReturn;
};

export default flatten_object;
