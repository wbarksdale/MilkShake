
var TodoVC = new MilkShake.ViewController($("#container"));
var todoList = new TodoList();

todoList.addSubview(new TodoInputItem(todoList));

var todos = ["Take out the trash","Do Laundry","Feed the dog"];
var todoItems = [];

for(var i = 0; i < todos.length; i++)
	todoItems.push(new TodoItem({todoText: todos[i]}));

for(var i = 0; i < todoItems.length; i++){
	todoList.addSubview(todoItems[i]);
}

TodoVC.addSubview(todoList);


