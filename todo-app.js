(function() {

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm(){
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');
        button.setAttribute('disabled', 'true');
        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
       // button.disabled = !input.value.length;


       input.addEventListener('input', function () {
             if (input.value.length === 0) {
                 button.setAttribute('disabled', true);
             }
             else {
                 button.removeAttribute('disabled');
             }
        });

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name, key) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        let todoItems = JSON.parse(localStorage.getItem(key));
        localStorage.setItem('todoItems', JSON.stringify(todoItems));

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success')
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }



    function createTodoApp(container, title, todoItemsDefault, key){
        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItemForm()
        let todoList = createTodoList()

        if (localStorage.getItem(key) !== null) {
        let todoItem = createTodoItem(JSON.parse(localStorage.getItem(key)));
        todoList.append(todoItem.item)
        todoItem.doneButton.addEventListener('click', function(){
            todoItem.item.classList.toggle('list-group-item-success')
        })
        todoItem.deleteButton.addEventListener('click', function(){
            if(confirm('Вы уверены?')){
                todoItem.item.remove()
            }
        })
      }

         if(todoItemsDefault){
            todoItemsDefault.map(item=>{
                let todoItem = createTodoItem(item.name)
                todoList.append(todoItem.item)
                todoItem.doneButton.addEventListener('click', function(){
                   todoItem.item.classList.toggle('list-group-item-success')
               })
               todoItem.deleteButton.addEventListener('click', function(){
                   if(confirm('Вы уверены?')){
                       todoItem.item.remove()
                   }
               })
                if(item.done){
                    todoItem.item.classList.add('list-group-item-success')
                }
            })
         }

        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)

        todoItemForm.form.addEventListener('submit', function(e){

            e.preventDefault();
            if(!todoItemForm.input.value){
                 return
            }

            let todoItem = createTodoItem(todoItemForm.input.value)
            localStorage.setItem(key, JSON.stringify(todoItemForm.input.value))


            todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('list-group-item-success')

            })
            todoItem.deleteButton.addEventListener('click', function(){
                if(confirm('Вы уверены?')){
                    todoItem.item.remove()
                    localStorage.removeItem(key)
                }
            })

            todoList.append(todoItem.item)


            todoItemForm.button.disabled = true

            todoItemForm.input.value = ''

        })
    }
    window.createTodoApp = createTodoApp
})();
