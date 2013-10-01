
// Main app functionality
$(function(){
	var TodoVC = new MilkShake.ViewController($("#container"));
	var todoList = new TodoList();

	// Add the input item view
	todoList.addSubview(new TodoInputItem(todoList));

	// data
	var todos = ["Take out the trash","Do Laundry","Feed the dog"];
	var todoItems = [];

	// create the todo item views
	for(var i = 0; i < todos.length; i++)
		todoItems.push(new TodoItem({todoText: todos[i]}));

	// add the craeted views to the todoList
	for(var i = 0; i < todoItems.length; i++){
		todoList.addSubview(todoItems[i]);
	}

	// add the todolist as a subview to themain view controller
	TodoVC.addSubview(todoList);
});
