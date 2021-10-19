const boxes= document.querySelectorAll('.box');

// 滚动事件
window.addEventListener('scroll',()=>{
    const triggleBottom=window.innerHeight*4/5;

    boxes.forEach(box=>{
        const boxTop=box.getBoundingClientRect().top;
        if(boxTop<triggleBottom){
            box.classList.add('show');
        }else{
            box.classList.remove("show")
        }
    })
})