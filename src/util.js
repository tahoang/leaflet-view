//copy object properties
var copy = function(dest, source) {
  dest = dest || {};
  if (source) {
    for (var property in source) {
      var value = source[property];
      if (value !== undefined) {
        dest[property] = value;
      }
    }
    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */
    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object
     * is an instance of window.Event.
     */

    var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;

    if (!sourceIsEvt &&
      source.hasOwnProperty && source.hasOwnProperty("toString")) {
      dest.toString = source.toString;
    }
  }
  return dest;
};

export default copy;