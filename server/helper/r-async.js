
class Rasync {
  static async forEachLimit(collectionInput, limit, itretee) {
    const collection = [...collectionInput];
    const length = collection.length;
    let output = [];
    for(let i = 0; i < length / limit; i++) {
      output = [...output,  ...await Promise.all(Rasync.__getForEachItretee(collection.splice(0, limit), itretee))];
    }
    return output;
  }

  static __getForEachItretee(collection, itretee) {
    const collectionFunctions = [];
    for(let i = 0; i < collection.length; i++) {
      collectionFunctions.push(itretee.call(this, collection[i]));
    }
    return collectionFunctions;
  }

  static async forEach(collection, itretee) {
    return await Promise.all(Rasync.__getForEachItretee(collection, itretee));
  }
}

module.exports = Rasync;
