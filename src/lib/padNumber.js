// http://stackoverflow.com/a/2998822/3837223
export default function padNumber(num, size) {
  const s = "000000000" + num;
  return s.substr(s.length - size);
}
