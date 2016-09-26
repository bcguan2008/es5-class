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
var Pet = Class({
	constructor: function(name) {
		this._name = name
	},
	speak: function() {
		console.log(this._name + ' says...')
	}
})

var Dog = Class.extend(Pet)({
	constructor: function($super, name) {
		$super(name)
	},
	woof: function() {
		return 'Woof, woof!'
	},
	speak: function($super) {
		$super.speak()
		console.log(this.woof() + " I'm a dog, pet me!")
	}
})

var Cat = Class.extend(Pet)({
	// if no constructor provided,
	// default to constructor(...args) { super(...args) }
	meow: function() {
		return 'Meow ~~'
	},
	speak: function($super) {
		$super.speak()
		console.log(this.meow() + " I'm a cat, go away!")
	}
})


var dog = new Dog('Odie')
dog.speak() // Output: Odie says... Woof, woof! I'm a dog, pet me!

var cat = new Cat('Garfield')
cat.speak() // Output: Garfield says... Meow ~~ I'm a cat, go away!
```
