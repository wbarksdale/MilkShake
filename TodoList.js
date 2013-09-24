var DEBUGGER = false;	

if(DEBUGGER) debugger;


if(DEBUGGER) debugger;
var TodoItem = MilkShake.View.extend({
	init: function(vars){
		this._super();
		this.template_variables = vars;
		this.addSubview(
			new MilkShake.Button(function(e){
				this.superView.removeFromSuperview();
				e.stopPropagation()
			}, "X")
		);
	},
	template: '<li class="todo-item"><%= todoText %></li>',
	css: {
		
	}
});

if(DEBUGGER) debugger;
var TodoList = MilkShake.View.extend({
	init: function(){
		this._super();
	},
	template: '<ul class="todo-list"></ul>'
});

var TodoInputField = MilkShake.View.extend({
	init: function(){
		this._super();
	},
	getValue: function(){
		if(this.view == undefined) 
			throw "view is not defined";

		return this.view.val();
	},
	clear: function(){
		if(this.view == undefined) 
			throw "view is not defined";

		this.view.val('');
	},
	template: "<input type='text' placeholder='Whats there to do?'></input>"
});

var TodoInputItem = MilkShake.View.extend({
	init: function(todoList){
		this._super();

		this.todoList = todoList;
		this.todoInput = new TodoInputField();
		
		this.addSubview(this.todoInput);
		this.addSubview(
			new MilkShake.Button(function(e){
				var todoItem = new TodoItem({todoText: this.todoInput.getValue()});
				this.todoList.addSubview(todoItem);
				this.todoInput.clear();
			}.bind(this), "+")
		);
	},
	template: '<li class="todo-input"></li>'
});
