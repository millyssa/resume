let progress = document.getElementById("progress");
let prev = document.getElementById("prev");
let next = document.querySelector("#next");
let circles = document.querySelectorAll(".circle");

//全局变量
let currentActive = 1;
next.addEventListener("click", () => {
    currentActive++;
    if (currentActive > circles.length) {
        currentActive = circles.length
    }
    update();
})
prev.addEventListener("click", () => {
    currentActive--;
    if (currentActive < 1) {
        currentActive = 1
    }
    update();
})
function update() {
    //item当前值，index索引
    circles.forEach((item, index) => {
        // 索引号从0开始 小于激活的当前值
        if (index < currentActive) {
            item.classList.add("active");

        } else {
            item.classList.remove("active");
        }

    })
    progress.style.width = (currentActive - 1) / (circles.length - 1) * 100 + "%";
    if (currentActive === 1) {
        prev.disabled = true;
    } else if (currentActive === 4) {
        next.disabled = true;

    } else {
        prev.disabled = false;
        next.disabled = false;
    }
}
