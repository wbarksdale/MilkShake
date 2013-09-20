// Create classes
var Main = new MilkShake.ViewController().extend({ 
	rootView: $("#container")
})

var TodoItem = new MilkShake.View().extend({
	template: $("#todo-item").html(),
});

var TodoList = new MilkShake.View().extend({
	template: $("#todo-list").html()
});

// Instantiate objects
var todoList = new TodoList();

var todos = ["Take out the trash","Do Laundry","Feed the dog"];
var todoItems = [];
for(var i = 0; i < todos.length; i++)
	todoItems.push(new TodoItem({todoText: todos[i]}));

for(var i = 0; i < todoItems.length; i++){
	todoItems[i].bind("click.todo-item", function(e){
		this.removeFromSuperview();
		e.stopPropagation()
	});
	todoList.addSubview(todoItems[i]);
}

Main.addSubview(todoList);


