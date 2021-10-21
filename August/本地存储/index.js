// 创建所需的常量const
const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.querySelector('form');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname');

const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');

// 当按钮按下时阻止表单提交(默认行为)
form.addEventListener('submit', function (e) {
    e.preventDefault();
});


// 单击'Say hello'按钮时运行函数
submitBtn.addEventListener('click', function () {
    //将输入的名称存储在网络存储中
    let val = nameInput.value;
    localStorage.setItem('name', val);
    //运行 nameDisplayCheck() 来整理显示
    //个性化问候和更新表单显示
    nameDisplayCheck();
});
// run function when the 'Forget' button is clicked
forgetBtn.addEventListener('click', function () {
    // Remove the stored name from web storage
    localStorage.removeItem('name');
    // run nameDisplayCheck() to sort out displaying the
    // generic greeting again and updating the form display
    nameDisplayCheck();
});

// define the nameDisplayCheck() function
function nameDisplayCheck() {
    // check whether the 'name' data item is stored in web Storage
    if (localStorage.getItem('name')) {
        // If it is, display personalized greeting
        let name = localStorage.getItem('name');
        h1.textContent = 'Welcome, ' + name;
        personalGreeting.textContent = 'Welcome to our website, ' + name + '! We hope you have fun while you are here.';
        // hide the 'remember' part of the form and show the 'forget' part
        forgetDiv.style.display = 'block';
        rememberDiv.style.display = 'none';
    } else {
        // if not, display generic greeting
        h1.textContent = 'Welcome to our website ';
        personalGreeting.textContent = 'Welcome to our website. We hope you have fun while you are here.';
        // hide the 'forget' part of the form and show the 'remember' part
        forgetDiv.style.display = 'none';
        rememberDiv.style.display = 'block';
    }
}

document.body.onload = nameDisplayCheck;