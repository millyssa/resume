//获取元素
const panels = document.querySelectorAll(".panel");

//绑定事件 处理事件
//classList 是一种更方便的访问元素的类列表的方法。
//forEach() 方法对数组的每个元素执行一次给定的函数。

// for (let i = 0; i < panels.length; i++) {
//     //事件处理
//     panels[i].onclick = function () {
//         for (let i = 0; i < panels.length; i++) {
//             //干掉其他人
//             panels[i].classList.remove("active");


//         }
//         panels[i].classList.add("active");
//     }
// }

panels.forEach((item) => {
    item.addEventListener("click", () => {
        panels.forEach((item) => {
            panels.classList.remove("active");

        })
        panels.classList.add("active");
    });
});


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
