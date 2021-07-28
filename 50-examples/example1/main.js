//获取元素
const panels = document.querySelectorAll(".panel");

//绑定事件 处理事件
//forEach() 方法对数组的每个元素执行一次给定的函数。

for (let i = 0; i < panels.length; i++) {
    //事件处理
    panels[i].onclick = function () {
        for (let i = 0; i < panels.length; i++) {
            //干掉其他人
            panels[i].classList.remove("active");


        }
        panels[i].classList.add("active");
    }
}
