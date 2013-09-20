/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
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
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();

MilkShake = {
	ViewController: function(){
		this.addSubview = function(subView){
			subView.superView = this;
			this.rootView.append(subView.render());
		}
		this.extend = function(obj){
			if(!_.has(obj, "rootView"))
				throw "required property exception [rootView]"

			function F() {}
			F.prototype = _.extend(this, obj);
			return new F
		}
	},
	View: function(vars){

		this.render = function(){
			// render the view from the template
			// and create a jquery dom element
			if(this.template_variables == undefined)
				this.template_variables = {};
			var html = _.template(this.template, this.template_variables)
			var parsed = $.parseHTML(html);
			this.view = $(parsed);

			// render any subviews
			for(var i = 0; i < this.subViews.length; i++)
				this.view.append(this.subViews[i].render())

			// return the newly created view
			for(var i = 0; i < this.eventHandlers.length; i++){
				debugger;
				console.log(i);
				this.view.on(this.eventHandlers[i][0], this.eventHandlers[i][1]);
			}

			return this.view;
		}

		this.eventHandlers = [];

		this.bind = function(event, fun){
			if(this.view == undefined){
				// if the view is defined, go ahead and bind the event
				this.eventHandlers.push([event, fun.bind(this)])
			} else {
				// Otherwise aggregate the events
				this.eventHandlers.push([event, fun.bind(this)])
				this.view.on(event, fun)
			}
		}

		this.addSubview = function(subView){
			subView.superView = this;
			this.subViews.push(subView);
		}

		this.removeSubview = function(subView){
			var index = this.subViews.indexOf(subView);
			console.log(this.subViews[index])
			this.subViews[index].view.remove();
			if(index > -1)
				this.subViews.splice(index, 1);

		}

		this.removeFromSuperview = function(){
			this.superView.removeSubview(this)
		}

		this.extend = function(obj){
			if(!_.has(obj, "template"))
				throw "required property exception [window]"

			// Extend
			fun = function(vars) {
				this.template_variables = vars;
				this.subViews = [];
			}

			fun.prototype = _.extend(this, obj);
			return fun
		}
	}
}