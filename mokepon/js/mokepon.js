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

    let btndragon = document.getElementById('btn-dragon')
    btndragon.addEventListener('click', seleccdragon)
    
    let btnFuego=document.getElementById('btn-fuego')
    btnFuego.addEventListener('click',ataqueFuego)
    let btnAgua=document.getElementById('btn-agua')
    btnAgua.addEventListener('click',ataqueAgua)
    let btnTierra=document.getElementById('btn-tierra')
    btnTierra.addEventListener('click',ataqueTierra)

    let btnReiniciar = document.getElementById('btn-reiniciar')
    btnReiniciar.addEventListener('click',reiniciarJuego)
}
function seleccdragon(){
    
    let sectionSeleccionarAtaque = document.getElementById('selecc-ataque')
    sectionSeleccionarAtaque.style.display='flex'
    let sectionSeleccionardragon = document.getElementById('selecc-dragon')
    sectionSeleccionardragon.style.display='none'
    let chimuelo = document.getElementById('chimuelo')
    let rompecraneos = document.getElementById('rompecraneos')
    let ratigueya = document.getElementById('ratigueya')
    let spandragonJugador = document.getElementById('dragon-jugador')
    let imgDragonJugador = document.getElementById('img-dragon-jugador')

    if(chimuelo.checked){
        alert('Seleccionaste a CHIMUELO')
        spandragonJugador.innerHTML = 'CHIMUELO'
        imgDragonJugador.innerHTML = '<img src="./img/chimuelo.png" />'
    }else if(rompecraneos.checked){
        alert('Seleccionaste a ROMPECRÁNEOS')
        spandragonJugador.innerHTML = 'ROMPECRÁNEOS'
        imgDragonJugador.innerHTML = '<img src="./img/Vanidoso.png" />'
    }else if(ratigueya.checked){
        alert('Seleccionaste a RATIGUEYA')
        spandragonJugador.innerHTML = 'RATIGUEYA'
        imgDragonJugador.innerHTML = '<img src="./img/ratigueya.png" />'
    }else{
        alert('Selecciona una dragon para iniciar el juego')
        reiniciarJuego()
    }

    seleccdragonEnemigo()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function seleccdragonEnemigo(){
    let dragonEnemigoAleatorio = aleatorio(1,3)
    let spandragonEnemigo = document.getElementById('dragon-enemigo')
    let imgDragonEnemigo = document.getElementById('img-dragon-enemigo')

    if(dragonEnemigoAleatorio==1){
        spandragonEnemigo.innerHTML = 'CHIMUELO'
        imgDragonEnemigo.innerHTML = '<img src="./img/chimuelo.png" />'
    }else if(dragonEnemigoAleatorio == 2){
        spandragonEnemigo.innerHTML = 'ROMPECRÁNEOS'
        imgDragonEnemigo.innerHTML = '<img src="./img/Vanidoso.png" />'
    }else if(dragonEnemigoAleatorio == 3){
        spandragonEnemigo.innerHTML = 'RATIGUEYA'
        imgDragonEnemigo.innerHTML = '<img src="./img/ratigueya.png" />'
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
    let sectionMensajes = document.getElementById('resultado')
    let ataquesJugador = document.getElementById('ataques-jugador')
    let ataquesEnemigo = document.getElementById('ataques-enemigo')
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
    
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
    let sectionMensajes = document.getElementById('resultado')
    sectionMensajes.innerHTML = resultadoFinal

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