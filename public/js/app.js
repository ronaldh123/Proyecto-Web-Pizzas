const carrito = document.getElementById('carrito');
const pizzas = document.getElementById('lista-pizza');
const listaPizzas = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners () {
    pizzas.addEventListener('click', comprarPizza);
    carrito.addEventListener('click', eliminarPizza);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

function comprarPizza(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const pizza = e.target.parentElement.parentElement;
        leerDatosPizza(pizza);
    }
}

function leerDatosPizza(pizza) {
    const infoPizza = {
        imagen: pizza.querySelector('img').src,
        titulo: pizza.querySelector('h4').textContent,
        precio: pizza.querySelector('.precio span').textContent,
        id: pizza.querySelector('a').getAttribute('date-id')
    }
    insertarCarrito(infoPizza);
}

function insertarCarrito(pizza) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${pizza.imagen}" width=100>
        </td>
        <td>${pizza.titulo}</td>
        <td>${pizza.precio}</td>
        <td>
            <a href="#" class="borrar-pizza" data-id="${pizza.id}">X</a>
        </td>
    `;
    listaPizzas.appendChild(row);
    guardarPizzaLocalStorage(pizza);
}


function eliminarPizza(e) {
    e.preventDefault();

    let pizza,
    pizzaId;
    if(e.target.classList.contains('borrar-pizza')){
        e.target.parentElement.parentElement.remove();
        pizza = e.target.parentElement.parentElement;
        pizzaId = pizza.querySelector('a').getAttribute('data-id');
    }
    eliminarPizzaLocalStorage(pizzaId);
}

function vaciarCarrito() {
    while(listaPizzas.firstChild){
        listaPizzas.removeChild(listaPizzas.firstChild);

    }

    vaciarLocalStorage();
    return false;
}

function guardarPizzaLocalStorage(pizza) {
    let pizzas;
    pizzas = obtenerPizzasLocalStorage();
    pizzas.push(pizza);
    localStorage.setItem('pizzas', JSON.stringify(pizzas))
}

function obtenerPizzasLocalStorage() {
    let pizzasLS;

    if(localStorage.getItem('pizzas') === null){
        pizzasLS = [];
    } else {
        pizzasLS = JSON.parse(localStorage.getItem('pizzas'));
    }
    return pizzasLS;
}

function leerLocalStorage() {
    let pizzasLS;

    pizzasLS = obtenerPizzasLocalStorage();

    pizzasLS.forEach(function(pizza){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${pizza.imagen}" width=100>
            </td>
            <td>${pizza.titulo}</td>
            <td>${pizza.precio}</td>
            <td>
                <a href="#" class="borrar-pizza" data-id="${pizza.id}">X</a>
            </td>
        `;
        listaPizzas.appendChild(row);
    });

}

function eliminarPizzaLocalStorage(pizza) {
    let pizzasLS;

    pizzasLS = obtenerPizzasLocalStorage();

    pizzasLS.forEach(function(pizzasLS, index){
        if(pizzasLS.id === pizza) {
            pizzasLS.splice(index, 1)
        }
    });

    localStorage.setItem('cafes', JSON.stringify(cafesLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}
