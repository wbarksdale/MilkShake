MilkShake: A Thick Client Javascript Framework
=============

I am not a huge fan of magic in applications. I like manual mode not automatic. I also hate popping between css, html, and css, remembering class names between these 3 files, making sure not to mispell anything. Frankly I would prefer to move everything into js, and program web apps more like traditional GUI applications. This little diddy was my experiment to see if concepts from iOS (ViewControllers and subviews) could be ported into a thick client javascript framework.

As a proof of concept I implemented a simple crappy looking todo list application.

The idea is that you first create view components and tack on some convenience methods to these views:

> var TodoItem = MilkShake.View.extend({
>	init: function(vars){
>		this._super();
>		this.template_variables = vars;
>		this.addSubview(
>			new MilkShake.Button(function(e){
>				this.superView.removeFromSuperview();
>				e.stopPropagation()
>			}, "X")
>		);
>	},
>	template: '<li class="todo-item"><%= todoText %></li>',
>	css: {
>		min_height: "25px",
>		line_height: "25px",
>		vertical_align: "middle",
>		padding: "10px",
>		background_color: "#FFFFFA",
>		border_style: "solid",
>		border_width: "0px 0px 1px 0px",
>		border_bottom_color: "#CCCCCC"
>	}
> });

All of the code relevant to this view can be edited in one place, you edit the CSS properties right here... no need to hop to another file. Want to edit the html for the view? same deal, the template is right there. Underscore is used for templating, all you have to do is stash your template variables in the property `template_variables`. rendering is handled automatically by the "super" class. 

I also created a simple button class, that is reusable. You could imagine extending this significantly and creating all kinds of view such as switches, segmented controls, sliders, the works....

>   MilkShake.Button = MilkShake.View.extend({
>		init: function(onClick, label){
>			this._super();
>			this.eventHandlers.push(["click", onClick.bind(this)])
>			this.template = "<div class='btn'><%= label %></div>"
>			this.template_variables = {label: label}
>		}
>	});

After creating a few simple classes (found in TodoList.js) the following code is responsible for actually bringing the peices together to create an application.

> // Main app functionality
> $(function(){
>	var TodoVC = new MilkShake.ViewController($("#container"));
>	var todoList = new TodoList();
>
>	todoList.addSubview(new TodoInputItem(todoList));
>
>	var todos = ["Take out the trash","Do Laundry","Feed the dog"];
>	var todoItems = [];
>
>	for(var i = 0; i < todos.length; i++)
>		todoItems.push(new TodoItem({todoText: todos[i]}));
>
>	for(var i = 0; i < todoItems.length; i++){
>		todoList.addSubview(todoItems[i]);
>	}
>
>	TodoVC.addSubview(todoList);
> });

The next steps I would take would be to implement a generic tab bar controller to which buttons could be added that load different view controllers into a container element.

Router functionality ought to also be implemented to preserve the functionality of the back button. alongside the router some formalized notion of models might also be developed similarly to backbone.js

<wfbarksdale@gmail.com>

