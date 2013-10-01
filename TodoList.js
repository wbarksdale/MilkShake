var DEBUGGER = false;	

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
		min_height: "25px",
		line_height: "25px",
		vertical_align: "middle",
		padding: "10px",
		background_color: "#FFFFFA",
		border_style: "solid",
		border_width: "0px 0px 1px 0px",
		border_bottom_color: "#CCCCCC"
	}
});

if(DEBUGGER) debugger;
var TodoList = MilkShake.View.extend({
	init: function(){
		this._super();
	},
	template: '<ul class="todo-list"></ul>',
	css: _.extend(
		MilkShake.Styles.border_radius("5px"),
		{
			border_style: "solid",
			border_width: "2px",
			max_width: "400px",
			margin:"auto",
			padding:"0",
			display:"block",
			list_style_type: "none"
		})
});

var TodoInputField = MilkShake.View.extend({
	init: function(){
		this._super();
	},
	getValue: function(){
		if(this.view == undefined) throw "view is not defined";
		return this.view.val();
	},
	clear: function(){
		if(this.view == undefined) throw "view is not defined";
		this.view.val('');
	},
	template: "<input type='text' placeholder='Whats there to do?'></input>",
	css: {
			border_style: "none",
			font_size:"25px",
			min_width: "360px",
	}
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
	template: '<li"></li>',
	css: _.extend({
		display: "block",
		min_height: "25px",
		line_height: "25px",
		vertical_align: "middle",
		padding: "0px",
		background_color: "#FFFFFA",
		border_style: "solid",
		border_width: "0px 0px 1px 0px",
		border_bottom_color: "#CCCCCC",
	},
	MilkShake.Styles.inner_shadow("5px"))
});
