//VARIABLES PARA APLICAR DRY
//iniciarJuego
const sectionreiniciarJuego = document.getElementById('reiniciar')
const btndragon = document.getElementById('btn-dragon')

const btnReiniciar = document.getElementById('btn-reiniciar')
const contenedorTarjetas=document.getElementById('contenedor-tarjetas')


//seleccDragon
const sectionSeleccionarAtaque = document.getElementById('selecc-ataque')
const sectionSeleccionardragon = document.getElementById('selecc-dragon')
const contenedorAtaques = document.getElementById('contenedor-ataques')

//seleccDragonEnemigo
const spandragonJugador = document.getElementById('dragon-jugador')
const imgDragonJugador = document.getElementById('img-dragon-jugador')
const spandragonEnemigo = document.getElementById('dragon-enemigo')
const imgDragonEnemigo = document.getElementById('img-dragon-enemigo')
//combate
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

//crearMensaje
const sectionMensajes = document.getElementById('resultado')
const ataquesJugador = document.getElementById('ataques-jugador')
const ataquesEnemigo = document.getElementById('ataques-enemigo')

//crearMensajeFinal (se repiten las variables)

//Variables globales
let ataqueJugador=[]
let ataquesDragonEnemigo
let ataqueEnemigo=[]
let resultado
let vidasJugador = 3
let vidasEnemigo = 3
let dragones = []
let opcionDeDragones
let idImgJugador
let chimuelo 
let rompecraneos 
let ratigueya
let opcionAtaque
let btnFuego
let btnAgua
let btnTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victorias=0
let derrotas=0

//CLASES
class Dragon{
    constructor(nombre,img,vida){
        this.nombre = nombre
        this.img = img
        this.vida = vida
        this.ataques = []
    }
}
//OBJETOS
let objChimuelo= new Dragon('Chimuelo','./img/chimuelo.png',5)
let objRompecraneos = new Dragon('Rompecraneos','./img/Vanidoso.png',5)
let objRatigueya = new Dragon('Ratigueya', './img/ratigueya.png',5)

//ARRAY DE OBJETOS

objChimuelo.ataques.push(
    {nombre:'💦', id:'btn-agua'},
    {nombre:'💦',id:'btn-agua'},
    {nombre:'💦',id:'btn-agua'},
    {nombre:'🏔️',id:'btn-tierra'},
    {nombre:'🔥',id:'btn-fuego'},

)
objRompecraneos.ataques.push(
    {nombre:'🔥',id:'btn-fuego'},
    {nombre:'🔥',id:'btn-fuego'},
    {nombre:'🔥',id:'btn-fuego'},
    {nombre:'💦', id:'btn-agua'},
    {nombre:'🏔️',id:'btn-tierra'},

)
objRatigueya.ataques.push(
    {nombre:'🏔️',id:'btn-tierra'},
    {nombre:'🏔️',id:'btn-tierra'},
    {nombre:'🏔️',id:'btn-tierra'},
    {nombre:'💦', id:'btn-agua'},
    {nombre:'🔥',id:'btn-fuego'},

)

dragones.push(objChimuelo,objRompecraneos,objRatigueya)

function iniciarJuego(){
    
    sectionreiniciarJuego.style.display='none'
    sectionSeleccionarAtaque.style.display='none'

    dragones.forEach((dragon)=>{
        opcionDeDragones = `
        <input type="radio" name="dragon"  id=${dragon.nombre}>
            <label for=${dragon.nombre} class="tarjeta-dragon"><p>${dragon.nombre}</p> <img src=${dragon.img} alt=${dragon.nombre}></label>
        `
        contenedorTarjetas.innerHTML += opcionDeDragones

        chimuelo = document.getElementById('Chimuelo')
        rompecraneos = document.getElementById('Rompecraneos')
        ratigueya = document.getElementById('Ratigueya')
    })

    btndragon.addEventListener('click', seleccdragon)
    
    btnReiniciar.addEventListener('click',reiniciarJuego)
}
function seleccdragon(){
    
    sectionSeleccionarAtaque.style.display='flex'
    sectionSeleccionardragon.style.display='none'

    if(chimuelo.checked){
        spandragonJugador.innerHTML = chimuelo.id
        idImgJugador = chimuelo.id
        muestraImgDragonJugador()
    }else if(rompecraneos.checked){
        spandragonJugador.innerHTML = rompecraneos.id
        idImgJugador = rompecraneos.id
        muestraImgDragonJugador()
    }else if(ratigueya.checked){
        spandragonJugador.innerHTML = ratigueya.id
        idImgJugador = ratigueya.id
        muestraImgDragonJugador()
    }else{
        alert('Selecciona una dragon para iniciar el juego')
        reiniciarJuego()
    }

    extraerAtaques(idImgJugador)
    seleccdragonEnemigo()
}

function extraerAtaques(idImgJugador){
    let ataques
    for (let i = 0; i < dragones.length; i++) {
        if(idImgJugador==dragones[i].nombre){
            ataques = dragones[i].ataques

        }        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach(ataque => {
        opcionAtaque=`
        <button id=${ataque.id} class="ataques BAtaque"> ${ataque.nombre} </button>
        `
        contenedorAtaques.innerHTML+=opcionAtaque
    });
    btnFuego=document.getElementById('btn-fuego')
    btnAgua=document.getElementById('btn-agua')
    btnTierra=document.getElementById('btn-tierra')

    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque(){
    botones.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{
            if(e.target.textContent === ' 🔥 '){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = 'rgb(158, 0, 0)'
                boton.disabled = true
            }else if(e.target.textContent === ' 💦 '){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = 'rgb(158, 0, 0)'
                boton.disabled = true
            }else{
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = 'rgb(158, 0, 0)'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function muestraImgDragonJugador(){
    dragones.forEach((dragon)=>{
        if(idImgJugador==dragon.nombre){
            imgDragonJugador.innerHTML= `<img src="${dragon.img}" />`;
        }
    })

}
function muestraImgDragonEnemigo(){
    dragones.forEach((dragon)=>{
        if(idImgJugador==dragon.nombre){
            imgDragonJugador.innerHTML= `<img src="${dragon.img}" />`
        }
    })

}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function seleccdragonEnemigo(){
    let dragonEnemigoAleatorio = aleatorio(0,dragones.length-1)
    spandragonEnemigo.innerHTML= dragones[dragonEnemigoAleatorio].nombre
    imgDragonEnemigo.innerHTML= `<img src="${dragones[dragonEnemigoAleatorio].img}" />`
    ataquesDragonEnemigo =dragones[dragonEnemigoAleatorio].ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesDragonEnemigo.length - 1)
    if(ataqueAleatorio==0 || ataqueAleatorio==1){
        ataqueEnemigo.push('FUEGO')
    }else if(ataqueAleatorio==2 || ataqueAleatorio==3){
        ataqueEnemigo.push('AGUA')
    }else{
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function crearMensaje(){
    
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
    
}

function indexAmbosOponente(jugador,enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    
    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i]===ataqueEnemigo[i]){
            indexAmbosOponente(i,i)
            crearMensaje("EMPATE")
        }
        else if (
            (ataqueJugador[i] == 'FUEGO' && ataqueEnemigo[i] == 'TIERRA') ||
            (ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO') ||
            (ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA')
          ) {
            indexAmbosOponente(i,i)
            crearMensaje("GANASTE")
            victorias++
            spanVidasJugador.innerHTML = victorias
          } else {
            indexAmbosOponente(i,i)
            crearMensaje("PERDISTE")
            derrotas++
            spanVidasEnemigo.innerHTML =derrotas
          }
    }

      revisarVidas()

}

function revisarVidas(){
    if(victorias==derrotas){
        crearMensajeFinal("😑 EMPATE 😑")
    }else if(victorias>derrotas){
        crearMensajeFinal("🥳 GANASTE 🥳")
    }else{
        crearMensajeFinal("😞 PERDISTE 😞")
    }
}

function crearMensajeFinal(resultadoFinal){
    sectionreiniciarJuego.style.display='block'
    sectionMensajes.innerHTML = resultadoFinal

    
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)