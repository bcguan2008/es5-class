## Example ##

### ES 6 syntax: ###

```js
Class Person {
    constructor(name) {
        this.name = name
    }
    sayHello() {
        console.log('I am '+ this.name);
    }
}

Class Engineer extends Person {
    constructor(name) {
        super(name);
    }
    sayHello() {
        super();
        console.log('I am coding now');
    }
}

new Engineer('jobs').sayHello()
```

### ES5 version with class: ###

```js
var Person = new Class({
    constructor:function(name,sex){
        this.name = name;
    },
    sayHello:function(){
        console.log('I am '+ this.name);
    }
});

var Engineer = Person.extend({
    constructor:function(name){
        this.$super(name);
    },
    sayHello:function(){
        this.$super();
        console.log('I am coding now');
    }
})

var jobs = new Engineer('jobs')
jobs.sayHello();
/* output: 
I am jobs
I am coding now
*/
```
