export default (val) => {
  if (isNaN(val) || val == "") {
    val = 1;
  }
  if (val < 1) {
    val = 1;
  }
  val = parseInt(val)
  return val
}
