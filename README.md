## Erjascrang

On-the-fly static typing in Javascript, inspired by Erlang.

#### Why? WHY????

Because I used to be one of _those_ developers -- those weird ___dynamic-typing___ freaks. You can never trust their code not to throw an exception. They come to work wearing cowboy hats. No one is safe from their recklessness.

Then I discovered the joys of declarative programming. I became one of those stiff-necked, obsessive-compulsive ___static-typing___ dudes. Always paranoid, muttering to myself: _"Did they pass me a string, like they said they would? Or did they double-cross me, and pass me an object?"_ 

###### Now I can have multiple personalities and assume both of these identities.

#### Usage

```
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
```

Now, test with:

```
addTwo(4);
addTwo("4");
addTwo(null);
```

###### Don't cross the wires!!!

