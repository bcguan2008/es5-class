## Example ##

### ES 6 syntax: ###

```js
Class Pet {
	constructor(name) {
		this._name = name
	}
	speak() {
		console.log(this._name + ' says...')
	}
}
Class Dog extends Pet {
	constructor(name) {
		super(name)
	}
	woof() {
		return 'Woof, woof!'
	}
	speak() {
		super.speak()
		console.log(this.woof() + " I'm a dog, pet me!")
	}
}
Class Cat extends Pet {
	meow() {
		return 'Meow ~~'
	}
	speak() {
		super.speak()
		console.log(this.meow() + " I'm a cat, go away!")
	}
}
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
