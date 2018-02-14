export default {
  strToHex: str => {
    const strParse = JSON.stringify(str);
    let hex = '';
    let i = 0;
    const str_len = strParse.length;
    let c = '';

    for (; i < str_len; i += 1) {
      c = strParse.charCodeAt(i);
      hex += c.toString(16);
    }
    return hex;
  },

  hexToStr: hex => {
    let str = '';
    let i = 0;
    const arr_len = hex.length / 2;
    let c = '';

    for (; i < arr_len; i += 1) {
      const chunk = hex.slice(2 * i, 2 * i + 2);
      c = String.fromCharCode(parseInt(chunk, 16));
      str += c;
    }
    return str;
  }
};
