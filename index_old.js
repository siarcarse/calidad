/* var numero = 1;
var texto = 1;
var test = () => {
    console.log('estoy dentro de la función');
};
var arreglo = [test, 80, texto, true, false, 123];
console.log(arreglo);
arreglo[0]();
console.log(arreglo); */

var persona = {
    "name-person": 'Juanito',
    lastname: 'Perez Cotapo',
    birthdate: '1980-01-01',
    children: 2,
    cute: false,
    printRut: function() {
        console.log('13.898.203-3');
    }
};
var persona2 = {
    "name-person": 'Pedrito',
    lastname: 'Perez Almarza',
    birthdate: '1980-02-01',
    children: 2,
    cute: false,
    printRut: function() {
        console.log('16.898.203-3');
    }
};
var people = [persona, persona2];
/* for (let i = 0; i < people.length; i++) {
    let persona = people[i];
    console.log(persona.lastname);
} */
people.forEach(persona => {
    console.log(persona.lastname);
});
/* console.log(persona['name-person']);
console.log(persona.name); */
/* console.log(`${persona.name} ${persona.lastname}`);
console.log("'" + persona.name + " " + persona.lastname + "'"); */