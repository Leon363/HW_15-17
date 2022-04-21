

//************** HW # 15  */

function displayOccurrences(array) {
    const res = createObjOccurrences (array);
    Object.entries(res).sort((e1, e2) => {
        const res = e2[1] - e1[1];
        return res === 0 ? e1[0].localeCompare(e2[0]) : res;
    }).forEach(e => console.log(`${e[0]} -> ${e[1]}`));
}
//num 1
function createObjOccurrences(array) {
    return array.reduce((result, cur) => {result[cur] = result[cur] === undefined ? 1 : result[cur] + 1; return result}, {});
}


// num 2
function counterABC (arr, ABC) {
    return arr.reduce((res, cnt) => {res[ABC(cnt)] = res[ABC(cnt)] === undefined ? 1 : res[ABC(cnt)] +1; return res}, {});
}

const array100 = ["lmn", "d", "d", "lmn", "a", "lmn", "a", "bc"];
displayOccurrences(array100);

console.log('')
const arr99 = [6.4, 7.3, 6.5, 6.9, 3.8, 3, 3.12];

console.log(counterABC(arr99, element => `number ${Math.floor(element)}`));


console.log('')

const arr98 = ['abcdq', 'lmnr', 'ab', 'dddd', 'qwerty'];
console.log(counterABC(arr98, element => `${element.length} letters`));

const arr97 = [
{age : 25, id : 123, name : "Vasya"}, 
{age : 50, id : 123, name : "Vasya"},
{age : 25, id : 123, name : "Vasya"},
{age : 70, id : 123, name : "Vasya"}]

console.log('')
console.log(counterABC(arr97, element => element.age));
console.log(counterABC(arr97, element => element.id));
console.log(counterABC(arr97, element => element.name));


function createAddress (city, street) {
    return {city, street}
}
function createPerson(id, name, address) {
    return {id, name, address}
}
const persons = [
    createPerson(123, "Vasya", createAddress("Rehovot", "Parshani")),
    createPerson(124, "Olya", createAddress("Rehovot", "Pr.Plaut")),
    createPerson(125, "Tolya", createAddress("Tel-Aviv", "Dizengoff")),
    createPerson(126, "Sara", createAddress("Lod", "Sokolov")),
    createPerson(127, "Sara", createAddress("Rehovot", "Ezra")),
    createPerson(128, "Danil", createAddress("Affula", "Herzel")),
    createPerson(129, "Danila", createAddress("Affula", "Herzel")),
    createPerson(130, "Max", createAddress("Yavne", "Dizengoff")),

] 


console.log(counterABC(persons, element => element.id));
console.log(counterABC(persons, element => element.name));
console.log(counterABC(persons, element => element.address.city));
console.log(counterABC(persons, element => element.address.street));

//***************** hw 16 */

//#1
function Deffered () {
    this.hello = 'Hello';
}
Deffered.prototype.then = function (newValueForHello) {
    return this.hello = newValueForHello(this.hello);
}
Deffered.prototype.resolve = function() {
    return this.hello = 'Hello';
}
const d = new Deffered()
d.then(function (res){console.log('1', res); return 'a'});
d.then(function (res){console.log('2', res); return 'b'});
d.then(function (res){console.log('3', res); return 'c'});
d.resolve('hello');

//#2


Array.prototype.get = function(ind) {
    this[ind] = this[0];
    this.fill(this[0]);
    return this[ind];
}


Array.prototype.set = function(newVal, ind) {
    return this[ind] = newVal;
}


Array.prototype.setVal = function(VallNew) {
    return this.fill(VallNew)
}

const myArray = new Array (3, 3)
console.log(myArray.get(5))
console.log(myArray)
console.log(myArray.set(11, 2))
console.log(myArray)
console.log(myArray.setVal(4))


//************* cw 17 */
class Person {
    #id;
    #name;
    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }
    getId() {
        return this.#id;
    }
    getName() {
        return this.#name;
    }
    toString() {
        return `id: ${this.#id} name: ${this.#name} `;
    }
}
class Employee extends Person {
    #salary;
    constructor(id, name, salary) {
        super(id, name);
        this.#salary = salary;
    } 
    computeSalary() {
        return this.#salary;
    }
    toString() {
        return (super.toString() + `salary : ${this.computeSalary()}`)
    }
}
class Child extends Person {
    #kindergarten;
    constructor(id, name, kindergarten) {
        super(id, name);
        this.#kindergarten = kindergarten;
    }
    getKindergarten() {
        return this.#kindergarten;
    }
    toString() {
        return `${super.toString()} kindergarten: ${this.#kindergarten}`
    }
}
class WageEmployee extends Employee {
    #hours
    #wage
    constructor(id, name, salary, hours, wage) {
        super(id, name, salary);
        this.#hours = hours;
        this.#wage = wage;
    }
    computeSalary() { 
        return super.computeSalary() + this.#hours * this.#wage
    } 
}
//hw 17
const person = [
    new Child(100, 'Olya', 'Shalom'),
    new Child(101, 'Serega', 'Boker'),
    new Child(102, 'Kolya', 'Shalom'),
    new Employee(103, 'Vasya', 1000),
    new WageEmployee(104, 'Tolya', 1000, 10, 100),
    new WageEmployee(108, 'Ivan', 1011, 5, 99),
    new Child(105, 'Vasya', 'Boker'),
    new Child(106, 'Ira', 'Boker'),
    new Child(107, 'Gerda', 'Boker'),
]
//#1
function countOfPersonType(persons, type) {
    return persons.filter(n => n.constructor.name === type).length;
}
console.log(countOfPersonType(person, "WageEmployee"));
//#2
function computeSalaryBudget(persons) {
    const allEmployees = persons.filter(p => !!p.computeSalary);
    const salaryValues = allEmployees.map(p => p.computeSalary());
    return salaryValues.reduce((res,cur) => res+cur);
}
console.log(computeSalaryBudget(person));
//#3
function countChild (persons, kindergarten) {
   return persons.reduce((res, per) => {per.constructor.name === "Child" 
   && per.getKindergarten() === kindergarten 
   && res++; 
   return res}, 0)
}
console.log(countChild (person, "Boker"));

function testOutput(fun, expected) {
    console.log(`function: ${fun.name};  result expected is: ${expected};  result is: ${fun()}`)
}
testOutput(WageEmployee.prototype.computeSalary.bind(person[5]), 2000);
testOutput(computeSalaryBudget.bind(undefined, person), 2500);
testOutput(countChild.bind(undefined, person, "Boker"), 2)

