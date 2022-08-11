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

//Variables para capitulo 60 en adelante(CANVAS)
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const lienzo = mapa.getContext("2d")

//Variables globales
let ataqueJugador=[]
let ataquesDragonEnemigo
let ataqueEnemigo=[]
let resultado
let vidasJugador = 3
let vidasEnemigo = 3
let dragones = []
let dragonesEnemigos = []
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
let intervalo
let mapabackground= new Image()
mapabackground.src='/mokepon/img/pueblo.jpg'
let dragonJugadorObj
let jugadorId = null
let enemigoId = null
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -300
let anchoMaximoMapa=350
alturaQueBuscamos = anchoDelMapa*600/1600
if(anchoMaximoMapa>anchoDelMapa){
    anchoDelMapa=anchoMaximoMapa-80
}
mapa.width=anchoDelMapa
mapa.height=alturaQueBuscamos

//CLASES
class Dragon{
    constructor(nombre,img,vida,fotoMapa,id = null){
        this.id = id
        this.nombre = nombre
        this.img = img
        this.vida = vida
        this.ataques = []
        this.ancho = 120
        this.alto = 120
        this.x = aleatorio(0,mapa.width-this.ancho)
        this.y = aleatorio(0,mapa.height-this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX=0
        this.velocidadY=0
    }

    pintarDragon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
//OBJETOS
let objChimuelo= new Dragon('Chimuelo','./img/chimuelo.png',5,'/mokepon/img/chimueloMapa.png')
let objRompecraneos = new Dragon('Rompecraneos','./img/Vanidoso.png',5,'/mokepon/img/Rompecraneos.png')
let objRatigueya = new Dragon('Ratigueya', './img/ratigueya.png',5,'/mokepon/img/ratigueyaMapa.png')

const CHIMUELO_ATAQUES=[
    {nombre:'💦', id:'btn-agua'},
    {nombre:'💦',id:'btn-agua'},
    {nombre:'💦',id:'btn-agua'},
    {nombre:'🏔️',id:'btn-tierra'},
    {nombre:'🔥',id:'btn-fuego'},
]

objChimuelo.ataques.push(...CHIMUELO_ATAQUES)


const ROMPECRANEOS_ATQUES=[
    {nombre:'🔥',id:'btn-fuego'},
    {nombre:'🔥',id:'btn-fuego'},
    {nombre:'🔥',id:'btn-fuego'},
    {nombre:'💦', id:'btn-agua'},
    {nombre:'🏔️',id:'btn-tierra'},

]
objRompecraneos.ataques.push(...ROMPECRANEOS_ATQUES)

const RATIGUEYA_ATAQUES = [
    {nombre:'🏔️',id:'btn-tierra'},
    {nombre:'🏔️',id:'btn-tierra'},
    {nombre:'🏔️',id:'btn-tierra'},
    {nombre:'💦', id:'btn-agua'},
    {nombre:'🔥',id:'btn-fuego'},
]

objRatigueya.ataques.push(...RATIGUEYA_ATAQUES)

dragones.push(objChimuelo,objRompecraneos,objRatigueya)

function iniciarJuego(){
    
    sectionreiniciarJuego.style.display='none'
    sectionSeleccionarAtaque.style.display='none'
    sectionVerMapa.style.display='none'

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

    //Back NodeJS
    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            if(res.ok){
                res.text()
                .then(function (respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
            }
        })
}
function seleccdragon(){
    
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

    //Back NodeJS
    seleccionarDragonBack(idImgJugador)

    extraerAtaques(idImgJugador)

    sectionVerMapa.style.display='flex'
    //MAPA(CANVAS)
    iniciarMapa()
}

function seleccionarDragonBack(idImgJugador){
    fetch(`http://localhost:8080/dragon/${jugadorId}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: idImgJugador
        })
})
        

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
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques(){
    fetch(`http://localhost:8080/dragon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaquesEnemigo, 50)
}

function obtenerAtaquesEnemigo(){
    fetch(`http://localhost:8080/dragon/${enemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({ataques}){
                        if(ataques.length === 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
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

function seleccdragonEnemigo(enemigo){
    spandragonEnemigo.innerHTML= enemigo.nombre
    imgDragonEnemigo.innerHTML= `<img src="${enemigo.img}" />`
    ataquesDragonEnemigo =enemigo.ataques
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
    clearInterval(intervalo)
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

//CANVAS
function pintarCanvas(){

    dragonJugadorObj.x=dragonJugadorObj.x + dragonJugadorObj.velocidadX
    dragonJugadorObj.y=dragonJugadorObj.y + dragonJugadorObj.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapabackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    dragonJugadorObj.pintarDragon()
    enviarPosicion(dragonJugadorObj.x,dragonJugadorObj.y)

    dragonesEnemigos.forEach(function(dragon){
        dragon.pintarDragon()
        revisarColision(dragon)
    })
    
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8080/dragon/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res){
        if(res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    dragonesEnemigos = enemigos.map(function(enemigo){
                        let dragonEnemigo = null
                        const dragonNombre  = enemigo.dragon.nombre || ""
                        if(dragonNombre === "Chimuelo"){
                            dragonEnemigo= new Dragon('Chimuelo','./img/chimuelo.png',5,'/mokepon/img/chimueloMapa.png', enemigo.id)
                        }else if (dragonNombre === "Rompecraneos"){
                            dragonEnemigo = new Dragon('Rompecraneos','./img/Vanidoso.png',5,'/mokepon/img/Rompecraneos.png', enemigo.id)
                        }else if(dragonNombre === "Ratigueya"){
                            dragonEnemigo = new Dragon('Ratigueya', './img/ratigueya.png',5,'/mokepon/img/ratigueyaMapa.png', enemigo.id)
                        }

                        dragonEnemigo.x = enemigo.x
                        dragonEnemigo.y = enemigo.y
                        return dragonEnemigo

                    })
                })
        }
    })
}




function moverDerecha(){
    dragonJugadorObj.velocidadX=5
}
function moverIzquierda(){
    dragonJugadorObj.velocidadX=-5
}
function moverAbajo(){
    dragonJugadorObj.velocidadY=5
}
function moverArriba(){
    dragonJugadorObj.velocidadY=-5
}

function detenerMovimiento(){
    dragonJugadorObj.velocidadX=0
    dragonJugadorObj.velocidadY=0
}
function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;  
        case 'ArrowRight':
            moverDerecha()
            break;  
        case 'ArrowLeft':
            moverIzquierda()
            break;
        default:
            break;
    }
}

function iniciarMapa(){
    //CANVAS
    dragonJugadorObj = obtenerObjetoDragon(idImgJugador)
    intervalo=setInterval(pintarCanvas,50)

    //TECLAS
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup',detenerMovimiento)
}

function obtenerObjetoDragon(){
    for (let i = 0; i < dragones.length; i++) {
        if(idImgJugador==dragones[i].nombre){
            return dragones[i]
        }        
    }
}
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    const arribaDragon = dragonJugadorObj.y
    const abajoDragon = dragonJugadorObj.y + dragonJugadorObj.alto
    const derechaDragon = dragonJugadorObj.x + dragonJugadorObj.ancho
    const izquierdaDragon = dragonJugadorObj.x
    if(
        abajoDragon < arribaEnemigo ||
        arribaDragon > abajoEnemigo ||
        derechaDragon < izquierdaEnemigo ||
        izquierdaDragon > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo )
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display='flex'
    sectionVerMapa.style.display='none'
    //alert("Hay colisión " + enemigo.nombre)
    seleccdragonEnemigo(enemigo)
}
window.addEventListener('load', iniciarJuego)