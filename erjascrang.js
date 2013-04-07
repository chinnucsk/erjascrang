var Erjascrang = function(init) {
  init.call(this);

  // default to using JS's built-in types. Override by re-assigning
  // this.types() in your Erjascrang declaration.
  this.types = {
    "b": function(x) { return typeof x == 'boolean' },
    "o": function(x) { return typeof x == 'object' },
    "n": function(x) { return typeof x == 'number' },
    "u": function(x) { return typeof x == 'undefined' },
    "s": function(x) { return typeof x == 'string' },

    // wildcard type, will match anything
    "$": function(x) { return true },
  };

  // return an object with all compiled methods with added type
  // checking.
  this.compile = function() {
    var result = {};
    var normalizedMethodNames = [];

    for(var methodName in this) {
      for(var t in this.types) {
        var matcher = new RegExp("_" + t + "$");

        if(methodName.match(matcher)) {
          var normalized = methodName.replace(matcher, "");
          if(normalizedMethodNames.indexOf(normalized) == -1) {
            normalizedMethodNames.push(normalized);
          }
        }
      }
    }

    for(var n=0; n<normalizedMethodNames.length; n++) {
      var name = normalizedMethodNames[n];
      var source = this;

      result[name] = function(x) {
        for(var i in source.types) {
          if(source.types[i](x)) {
            if(source[name + "_" + i]) {
              return source[name + "_" + i].call(this, x);
            }
          }
        }
        if(source[name + "_$"]) {
          return source[name + "_$"].call(this, x);
        } else {
          return undefined;
        }
      }
    };

    return result;
  };
};

// testing erjascrang
//
// write erjascrang function declarations
var erjascrang = new Erjascrang(function() {
  this.addTwo_s = function(s) { return this.addTwo(parseInt(s)); }
  this.addTwo_n = function(n) { return n+2; }
  this.addTwo_$ = function(n) { return 0; }
});

// compile
var compiled = erjascrang.compile();

// merge compiled methods into current scope
for(var m in compiled) {
  this[m] = compiled[m];
}
