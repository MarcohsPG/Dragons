//Variables globales
let ataqueJugador
let ataqueEnemigo
let resultado
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego(){
    let sectionreiniciarJuego = document.getElementById('reiniciar')
    sectionreiniciarJuego.style.display='none'
    let sectionSeleccionarAtaque = document.getElementById('selecc-ataque')
    sectionSeleccionarAtaque.style.display='none'

    let btnMascota = document.getElementById('btn-mascota')
    btnMascota.addEventListener('click', seleccMascota)
    
    let btnFuego=document.getElementById('btn-fuego')
    btnFuego.addEventListener('click',ataqueFuego)
    let btnAgua=document.getElementById('btn-agua')
    btnAgua.addEventListener('click',ataqueAgua)
    let btnTierra=document.getElementById('btn-tierra')
    btnTierra.addEventListener('click',ataqueTierra)

    let btnReiniciar = document.getElementById('btn-reiniciar')
    btnReiniciar.addEventListener('click',reiniciarJuego)
}
function seleccMascota(){
    
    let sectionSeleccionarAtaque = document.getElementById('selecc-ataque')
    sectionSeleccionarAtaque.style.display='block'
    let sectionSeleccionarMascota = document.getElementById('selecc-mascota')
    sectionSeleccionarMascota.style.display='none'
    let hipodoge = document.getElementById('hipodoge')
    let capipepo = document.getElementById('capipepo')
    let ratigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-jugador')

    if(hipodoge.checked){
        alert('Seleccionaste a HIPODOGE')
        spanMascotaJugador.innerHTML = 'HIPODOGE'
    }else if(capipepo.checked){
        alert('Seleccionaste a CAPIPEPO')
        spanMascotaJugador.innerHTML = 'CAPIPEPO'
    }else if(ratigueya.checked){
        alert('Seleccionaste a RATIGUEYA')
        spanMascotaJugador.innerHTML = 'RATIGUEYA'
    }else{
        alert('Selecciona una mascota para iniciar el juego')
        reiniciarJuego()
    }

    seleccMascotaEnemigo()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function seleccMascotaEnemigo(){
    let mascotaEnemigoAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if(mascotaEnemigoAleatorio==1){
        spanMascotaEnemigo.innerHTML = 'HIPODOGE'
    }else if(mascotaEnemigoAleatorio == 2){
        spanMascotaEnemigo.innerHTML = 'CAPIPEPO'
    }else if(mascotaEnemigoAleatorio == 3){
        spanMascotaEnemigo.innerHTML = 'RATIGUEYA'
    }
}

function ataqueFuego(){
    ataqueJugador='FUEGO'
    ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador='AGUA'
    ataqueAleatorioEnemigo()

}
function ataqueTierra(){
    ataqueJugador='TIERRA'
    ataqueAleatorioEnemigo()

}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)
    if(ataqueAleatorio==1){
        ataqueEnemigo = 'FUEGO'
    }else if(ataqueAleatorio==2){
        ataqueEnemigo = 'AGUA'
    }else{
        ataqueEnemigo = 'TIERRA'
    }
    combate()
}

function crearMensaje(){
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML ='Tu mascota atacó con '+ataqueJugador+ ', la mascota del enemigo atacó con '+ataqueEnemigo+' => '+resultado
    sectionMensajes.appendChild(parrafo)
}

function combate(){
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    if (ataqueEnemigo == ataqueJugador) {
        resultado='EMPATE'
    } else if (
        (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') ||
        (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') ||
        (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA')
      ) {
        resultado='GANASTE'
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
      } else {
        resultado='PERDISTE'
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
      }

      crearMensaje()

      revisarVidas()

}

function revisarVidas(){
    if(vidasEnemigo == 0){
        crearMensajeFinal("🥳 GANASTE 🥳")
    }else if(vidasJugador == 0){
        crearMensajeFinal("😞 PERDISTE 😞")
    }
}

function crearMensajeFinal(resultadoFinal){
    let sectionreiniciarJuego = document.getElementById('reiniciar')
    sectionreiniciarJuego.style.display='block'
    let sectionMensajes = document.getElementById('mensajes')
    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultadoFinal
    sectionMensajes.appendChild(parrafo)

    let btnFuego=document.getElementById('btn-fuego')
    btnFuego.disabled = true
    let btnAgua=document.getElementById('btn-agua')
    btnAgua.disabled = true
    let btnTierra=document.getElementById('btn-tierra')
    btnTierra.disabled = true
}

function reiniciarJuego(){
    location.reload()
}

window.addEventListener('load', iniciarJuego)