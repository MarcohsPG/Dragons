const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }
    asignarDragon(dragon){
        this.dragon = dragon
    }
    actualizarPosicion(x,y){
        this.x=x
        this.y=y
    }
}

class Dragon{
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse",(req,res)=>{
    const id = `${Math.random()}`
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.send(id)
})

app.post("/dragon/:jugadorId",(req,res)=>{
    const jugadorId=req.params.jugadorId || ""
    const nombre = req.body.nombre || ""
    const dragon = new Dragon(nombre)
    const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarDragon(dragon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/dragon/:jugadorId/posicion", (req,res)=>{
    const jugadorId=req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if(jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos= jugadores.filter((jugador)=> jugadorId !== jugador.id)

    res.send({
        enemigos
    })

})

app.listen(8080, () =>{
    console.log("Servidor Funcionando")
})