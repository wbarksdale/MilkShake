(function(){
	MilkShake = {};

	// test if something is a function
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	MilkShake.Class = function(){};

	MilkShake.Class.extend = function(prop) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop) {
		  // Check if we're overwriting an existing function
		  prototype[name] = typeof prop[name] == "function" &&
		    typeof _super[name] == "function" && fnTest.test(prop[name]) ?
		    (function(name, fn){
		      return function() {
		        var tmp = this._super;
		       
		        // Add a new ._super() method that is the same method
		        // but on the super-class
		        this._super = _super[name];
		       
		        // The method only need to be bound temporarily, so we
		        // remove it when we're done executing
		        var ret = fn.apply(this, arguments);        
		        this._super = tmp;
		       
		        return ret;
		      };
		    })(name, prop[name]) :
		    prop[name];
		}

		// The dummy class constructor
		function Class() {
		  // All construction is actually done in the init method
		  if ( !initializing && this.init )
		    this.init.apply(this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = MilkShake.Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};

	MilkShake.ViewController = MilkShake.Class.extend({
		init: function(rv){
			this.rootView = rv;
		},
		addSubview: function(subView){
			subView.superView = this;
			this.rootView.append(subView.render());
		}
	});
	
	MilkShake.View = MilkShake.Class.extend({
		init: function(){
			this.subViews = [];
			this.eventHandlers = [];
			this.template_variables = {};
		},
		render: function(){
			// render the view from the template
			// and create a jquery dom element
			if(this.template_variables == undefined)
				this.template_variables = {};

			var html = _.template(this.template, this.template_variables)
			var parsed = $.parseHTML(html);
			this.view = $(parsed);

			// render any subviews
			for(var i = 0; i < this.subViews.length; i++){
				this.view.append(this.subViews[i].render())
			}

			// return the newly created view
			for(var i = 0; i < this.eventHandlers.length; i++){
				this.view.on(this.eventHandlers[i][0], this.eventHandlers[i][1]);
			}
			return this.view;
		},
		bind: function(event, fun){
			if(this.view == undefined){
				// if the view is defined, go ahead and bind the event
				this.eventHandlers.push([event, fun.bind(this)])
			} else {
				// Otherwise aggregate the events
				this.eventHandlers.push([event, fun.bind(this)])
				this.view.on(event, fun)
			}
		},
		addSubview: function(subView){
			subView.superView = this;
			this.subViews.push(subView);

			// render the view immediately if
			// this view is already in view
			if(this.view != undefined){
				this.view.append(subView.render());
			}
		},
		removeSubview: function(subView){
			var index = this.subViews.indexOf(subView);
			console.log(this.subViews[index])
			this.subViews[index].view.remove();
			if(index > -1){
				this.subViews[index]
				this.subViews.splice(index, 1);
			}
		},
		removeFromSuperview: function(){
			this.superView.removeSubview(this)
		}
	});

	MilkShake.Button = MilkShake.View.extend({
		init: function(onClick, label){
			this._super();
			this.eventHandlers.push(["click", onClick.bind(this)])
			this.template = "<div class='btn'><%= label %></div>"
			this.template_variables = {label: label}
		}
	})
})();