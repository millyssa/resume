//简单动画封装obj目标对象 target 目标位置
function animate(obj, target, callback) {
    //先清除以前的定时器，只保留当前的定时器执行
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        //步长值写到定时器的里面
        //把我们步长值改为整数 不要出现小数问题
        let step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft >= target) {
            //停止动画 本质是停止定时器
            clearInterval(obj.timer);
            //回调函数写在定时器结束里面
            if (callback) {
                callback();
            }

        }
        //把每次加1 这个步骤改为慢慢变小的值 步长公式：（目标值-当前的位置）/10

        obj.style.left = obj.offsetLeft + step + 'px';


    }, 300);

}