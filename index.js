/**
 * isWasm
 */

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * slice
 */

var slice = String.prototype.slice;

/**
 * buffer toString
 */

var buf = Uint8Array.prototype.toString;

/**
 * buffer slice
 */

var bufSlice = Uint8Array.prototype.slice;

/**
 * Whether or not the given `file`
 * is `WebAssembly`.
 *
 * example:
 *
 *        isWasm(<Buffer 00 61 73 6d ... >);
 *        // > true
 *        isWasm(arguments);
 *        // > false
 *        isWasm('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = function (val) {
  if (str.call(val) == '[object ArrayBuffer]') {
    if (WebAssembly && WebAssembly.validate) return WebAssembly.validate(val);
    return '0,97,115,109' == bufSlice.call(slice.call(new Uint8Array(val), 0, 4));
  }
  if (str.call(val) == '[object String]') {
    if (val.includes('data:') && val.includes('AGFzbQ')) return true;
  }
  return !!val && '[object String]' == str.call(val) && "\0asm" == slice.call(val, 0, 4);
}