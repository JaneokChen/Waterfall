/*
1、程序主逻辑
  （1）获取DOM节点
      - 获取所有要展示的图片 getElementsByClassName('wf-item')
  （2）变量声明
      - oItemsLen 保存要展示的图片的数量
      - _arr 保存5列图片的长度
  （3）函数调用
      - 调用图片位置设置函数 setImgPos

2、定义函数
    - 定义图片位置设置函数  setImgPos
      - 调用数组最小值索引获取函数 getMinIdx
    - 定义数组最小值索引获取函数  getMinIdx
 */

;(function(doc) {
  var oItems = doc.getElementsByClassName('wf-item'), //获取doc元素中所有class名称中包含wf-item的元素
      oItemsLen = oItems.length, //获取oItems数组的长度
      _arr = []; //声明一个空数组
  var init = function() { //声明一个名为init的函数
    setImgPos(); //调用setImgPos函数
  }

  function setImgPos() {//声明setImgPos函数
    var item; //声明一个名为item的变量，用于遍历oItem数组对象
    for (let i = 0; i < oItemsLen; i++) { //遍历oItem数组对象
      item = oItems[i]; //把当前循环遍历到的数组元素 存储到item变量中
      item.style.width = '232px'; //把oItem数组的每一个子元素的宽度设置为232px

      if (i<5) { //当遍历到的是oItem数组的前5个元素时，设置各元素的位置
           /*设置当前元素的上外边距边界与其包含块上边界的偏移*/
          _arr.push(item.offsetHeight); //获取到当前元素的高度，并将其存储到_arr数组中
          item.style.top = '0'; //把当前元素的上外边距边界与其包含块上边界之间的偏移  设置为0
          /*设置当前元素的左外边距边界与其包含块左边界的偏移*/
          if ((i+1)%5 ===1) { //取模？？？？  当遍历到的是oItem数组的第1个元素时
            item.style.left = '0'; //把偏移量设置为0
          }else{ //当遍历到的是oItem数组的第2-5个元素时
            item.style.left = i * (232 + 10) + 'px';  //把偏移量设置为i*(列宽+列间距)px。
          }
      }else{ //当遍历到的是oItem数组的非前5个元素时，设置各元素的位置
        minIdx = getMinIdx(_arr); //把保存了前五个元素的高度的数组_arr传入getMinIdx函数，以获取到_arr数组中最小值的索引(0-4)
        console.log(minIdx);
        item.style.left = oItems[minIdx].offsetLeft + 'px'; //通过oItems[minIdx]获得其位置上保存的元素，再通过.offsetLeft获取其左上角相对与父节点的左边界偏移的像素值。把该值赋给当前遍历到的元素的style.left属性。令oItems[minIdx]与item位于同一列。
        item.style.top = (_arr[minIdx] + 10) + 'px'; // 通过_arr[minIdx]获取minIdx索引上保存的元素高度，再加上行间距10。将结果赋值给当前遍历到的元素的style.top属性。把item放在oItems[minIdx]的正下方，距离为10px。
        _arr[minIdx] += (item.offsetHeight + 10); //把item的高度+间距10，保存到_arr数组中minIdx索引对应的位置。作为minIdx列最新的高度。
      }
    }
  }

  /*声明getMinIdx函数，获取_arr数组中的最小值 */
  function getMinIdx(arr) {
    return [].indexOf.call(arr, Math.min.apply(null, arr));
  }
  window.onload = function(){
    init();
  }
})(document);
