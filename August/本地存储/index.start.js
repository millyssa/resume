// 创建所需的常量
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');


//数据库初始设置
// 为我们创建一个 db 对象的实例来存储打开的数据库
let db;
//窗口加载事件处理函数
//当整个页面及所有依赖资源如样式表和图片都已完成加载时，将触发load事件
window.onload = function () {
    // 打开我们的数据库； 如果它不存在，则创建它
    // (see onupgradeneeded below)
    //创建了request变量，目的是打开 notes数据库的1版本，则后续代码将为您创建
    let request = window.indexedDB.open('notes', 1);

    // onerror 处理程序表示数据库打开失败
    request.onerror = function () {
        console.log('Database failed to open');
    };

    // onsuccess 处理程序表示数据库打开成功
    request.onsuccess = function () {
        console.log('Database opened successfully');

        // 将打开的数据库对象存储在 db 变量中。
        db = request.result;
        //运行一个名为displayData()的自定义函数，它把数据库中的数据显示在<ul>
        // 运行 displayData() 函数以显示 IDB 中已有的注释
        displayData();
    };


    // 如果尚未完成，请设置数据库表
    request.onupgradeneeded = function (e) {
        // Grab a reference to the opened database
        let db = e.target.result;

        // 创建一个对象 Store 来存储你的笔记（基本上就像一个表）
        //包括一个自动递增的键
        let objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });

        //定义 objectStore 将包含哪些数据项
        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('body', 'body', { unique: false });

        console.log('Database setup complete');
    };

    //创建一个 onsubmit 处理程序，以便在提交表单时运行 addData() 函数
    form.onsubmit = addData;
    //定于了addDate的功能
    // Define the addData() function
    function addData(e) {
        // prevent default - we don't want the form to submit in the conventional way
        //在事件对象上运行以停止以传统方式实际提交的表单
        e.preventDefault();

        // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
        //创建一个表示要输入数据库的记录的对象，并使用表单输入中的值填充它。请注意，我们不必明确包含一个id值,这是自动填充的。
        let newItem = { title: titleInput.value, body: bodyInput.value };

        // open a read/write db transaction, ready for adding the data
        //打开对象存储的readwrite事务。此事务对象允许我们访问对象存储，以便我们可以对其执行某些操作，例如添加新记录
        let transaction = db.transaction(['notes'], 'readwrite');

        // call an object store that's already been added to the database
        //使用该IDBTransaction.objectStore()方法访问对象库，将结果保存在  objectStore 变量中
        let objectStore = transaction.objectStore('notes');

        // Make a request to add our newItem object to the object store

        var request = objectStore.add(newItem);
        request.onsuccess = function () {
            // Clear the form, ready for adding the next entry
            titleInput.value = '';
            bodyInput.value = '';
        };

        // Report on the success of the transaction completing, when everything is done
        transaction.oncomplete = function () {
            console.log('Transaction completed: database modification finished.');

            // update the display of data to show the newly added item, by running displayData() again.
            displayData();
        };

        transaction.onerror = function () {
            console.log('Transaction not opened due to error');
        };
    }



    // Define the displayData() function
    function displayData() {
        // Here we empty the contents of the list element each time the display is updated
        // If you ddn't do this, you'd get duplicates listed each time a new note is added
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        // Open our object store and then get a cursor - which iterates through all the
        // different data items in the store
        let objectStore = db.transaction('notes').objectStore('notes');
        objectStore.openCursor().onsuccess = function (e) {
            // Get a reference to the cursor
            let cursor = e.target.result;

            // If there is still another data item to iterate through, keep running this code
            if (cursor) {
                // Create a list item, h3, and p to put each data item inside when displaying it
                // structure the HTML fragment, and append it inside the list
                let listItem = document.createElement('li');
                let h3 = document.createElement('h3');
                let para = document.createElement('p');

                listItem.appendChild(h3);
                listItem.appendChild(para);
                list.appendChild(listItem);

                // Put the data from the cursor inside the h3 and para
                h3.textContent = cursor.value.title;
                para.textContent = cursor.value.body;

                // Store the ID of the data item inside an attribute on the listItem, so we know
                // which item it corresponds to. This will be useful later when we want to delete items
                listItem.setAttribute('data-note-id', cursor.value.id);

                // Create a button and place it inside each listItem
                let deleteBtn = document.createElement('button');
                listItem.appendChild(deleteBtn);
                deleteBtn.textContent = 'Delete';

                // Set an event handler so that when the button is clicked, the deleteItem()
                // function is run
                deleteBtn.onclick = deleteItem;

                // Iterate to the next item in the cursor
                cursor.continue();
            } else {
                // Again, if list item is empty, display a 'No notes stored' message
                if (!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'No notes stored.'
                    list.appendChild(listItem);
                }
                // if there are no more cursor items to iterate through, say so
                console.log('Notes all displayed');
            }
        };
    }

    //当按下音符的删除按钮时，音符将被删除
    // Define the deleteItem() function
    function deleteItem(e) {
        // retrieve the name of the task we want to delete. We need
        // to convert it to a number before trying it use it with IDB; IDB key
        // values are type-sensitive.
        let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

        // open a database transaction and delete the task, finding it using the id we retrieved above
        let transaction = db.transaction(['notes'], 'readwrite');
        let objectStore = transaction.objectStore('notes');
        let request = objectStore.delete(noteId);

        // report that the data item has been deleted
        transaction.oncomplete = function () {
            // delete the parent of the button
            // which is the list item, so it is no longer displayed
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            console.log('Note ' + noteId + ' deleted.');

            // Again, if list item is empty, display a 'No notes stored' message
            if (!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = 'No notes stored.';
                list.appendChild(listItem);
            }
        };
    }
};