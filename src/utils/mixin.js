export default methods => {
  return target => {
    Object.assign(target.prototype, methods);
  }
}

/**
 * 字符串填充函数
 * @param  {string} value      目标字符串
 * @param  {array} position 需要填充的位置
 * @param  {string} padstr   填充字符串
 * @return {string}          返回目标字符串
 */
export const padStr = (value, position, padstr, inputElement) => {
  position.forEach((item, index) => {
    if (value.length > item + index) {
      value = value.substring(0, item + index) + padstr + value.substring(item + index)
    }
  })
  value = value.trim();
  // 解决安卓部分浏览器插入空格后光标错位问题
  requestAnimationFrame(() => {
    inputElement.setSelectionRange(value.length, value.length); 
  })
  return value;
}
/**
 * 
 * @param {Element} el 需要开启touchmove的事件
 */
export const openScroll = function (el) {
  el.addEventListener('touchstart', function () {
      var top = el.scrollTop;
      var totalScroll = el.scrollHeight;
      var currentScroll = top + el.offsetHeight
      if (top === 0) {
          el.scrollTop = 1
      } else if (currentScroll === totalScroll) {
          el.scrollTop = top - 1
      }
  }, {passive: true})
  el.addEventListener('touchmove', function (evt) {
    if (el.offsetHeight < el.scrollHeight) { evt._isScroller = true }
  }, {passive: true})
};
/**
 * 
 * @param {string} 参数转Json
 */
export const parseQueryString = function (url) {
  var regUrl = /^[^?]+\?([\w\W]+)$/
  var regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g
  var arrUrl = regUrl.exec(url)
  var ret = {}
  if (arrUrl && arrUrl[1]) {
    var strPara = arrUrl[1]
    var result
    while ((result = regPara.exec(strPara)) != null) {
      ret[result[1]] = result[2]
    }
  }
  return ret
}

