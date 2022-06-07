/* global var */
var personajes;


//window on load function. Obtiene los personajes de la api

async function obtenerPersonajes() {
    await fetch('http://ddragon.leagueoflegends.com/cdn/11.24.1/data/es_ES/champion.json')
        .then(response => response.json())
        .then(data => personajes = data.data);
    console.log(personajes);
    personajeSelect();

    //Añadir evento a los buttons
    let form = document.querySelector("#form");
    form.addEventListener("submit", controlarSubmit);
    form.addEventListener("reset", controlarReset);
    
}
//consigue la imagen de la carpeta
function obtenerImagen(nomPsj) {
    let imageObjectURL = `./src/sprites/campeonesMD/${nomPsj}_0.jpg`;
    crearDiv(imageObjectURL);
}

//submit button
function controlarSubmit(event) {
    event.preventDefault();
    controlarReset();

    const inputNombre = event.target.nombre.value;
    const optionNombre = event.target.selecionapersj.value;
    const optionRol = event.target.selecionaRol.value;
    
    let nomPsj = "";
    let rolPsj = "";

    if(inputNombre !== ""){
        nomPsj = inputNombre;
        seleccionarPersonaje(nomPsj);
    }else if(optionNombre !== ""){
        nomPsj = optionNombre;
        seleccionarPersonaje(nomPsj);
    }else if(optionRol !== ""){
        rolPsj = optionRol;
        seleccionarRol(rolPsj);
    }
}

function controlarReset(){
    var divPersonajes = document.querySelector("#personajes");
    
    if (divPersonajes !== null) {
        while(divPersonajes.firstChild){
            divPersonajes.removeChild(divPersonajes.lastChild);
        }
    } 
}
/*
Funcion que muestra todos los personajes que hay con ese rol
*/
function seleccionarRol(rolPsj){
    Object.entries(personajes).map(psj => {
        if (psj[1].tags[0] === rolPsj) {
            let nomPsj = psj[1].name;
            const urlImg = `./sprites/campeonesMD/${nomPsj}_0.jpg`;
            crearDiv(urlImg, psj[1]);
        }
    });
}

/*Funcion que muestra el personaje en concreto*/
function seleccionarPersonaje(nomPsj){
    Object.entries(personajes).map(psj => {
        if (psj[1].name === nomPsj) {
            const urlImg = `./sprites/campeonesMD/${nomPsj}_0.jpg`;
            crearDiv(urlImg, psj[1]);
        }
    });
}
/*funcion que contiene la imagen de cada personaje*/
function crearDiv(imageObject, nomPsj) {
    let divPersonajes = document.querySelector("#personajes");
    let divCajas = document.createElement("div");
    let img = document.createElement("img");
    let divInfo = document.createElement("div");
    let divNB = document.createElement("div");
    let divBotones =document.createElement("div");
    let divBotontxt1=document.createElement("div");
    let divBotontxt2=document.createElement("div");
    img.setAttribute("src", imageObject);

    let nombrePer = document.createElement("p");
    nombrePer.innerHTML = nomPsj.name.bold();
    

    //texto de joke y laugh
    let txt1 = document.createElement("p");
    let txt2 = document.createElement("p");
    txt1.innerHTML = "Burla";
    txt2.innerHTML = "Risa";
    
    //boton verde
    let inputBurla = document.createElement("input");
    inputBurla.setAttribute("type", "button");
    inputBurla.classList.add("botonBurla");
    inputBurla.setAttribute("id", nomPsj.name);
    inputBurla.addEventListener("click", playBurla);
    
    
    
    //boton rojo
    let inputRisa = document.createElement("input");
    inputRisa.setAttribute("type", "button");
    inputRisa.classList.add("botonRisa");
    inputRisa.setAttribute("id", nomPsj.name);
    inputRisa.addEventListener("click", playRisa);
    

    //de mayor a menor los divs de la zona de personajes
    divPersonajes.appendChild(divCajas);
    divCajas.appendChild(img);
    divCajas.appendChild(divInfo)
    divInfo.appendChild(divNB);
    divNB.appendChild(nombrePer); 
    divNB.appendChild(divBotones)
    divBotones.appendChild(divBotontxt1);
    divBotones.appendChild(divBotontxt2);
    divBotontxt1.appendChild(txt1);
    divBotontxt1.appendChild(inputBurla);
    divBotontxt2.appendChild(txt2)
    divBotontxt2.appendChild(inputRisa);
}

function playBurla(event){
    new Audio(`./sonidos/sounds/burla/${event.target.id}.joke.wav`).play();
}

function playRisa(event){
    let risa;
        risa = new Audio(`./sonidos/sounds/risa/${event.target.id}.laugh1.wav`);
        risa.play();
       
}

/*Funcion que rellena el select del formulario para los personajes*/
function personajeSelect() {
    var selecionapersj = document.querySelector("#selecionapersj");
    Object.entries(personajes).map(psj => {
        var option = document.createElement("option");
        option.setAttribute("id", psj[1].name);
        option.setAttribute("name", psj[1].name);
        option.setAttribute("value", psj[1].name);
        option.innerText = psj[1].name;
        selecionapersj.appendChild(option);
    });
}


window.onload = obtenerPersonajes();
