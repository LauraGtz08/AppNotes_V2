const fs = require("fs")
const chalk = require("chalk")

const modifyNotes = function(title, newtitle, newbody){
    let notes = loadNotes()
    const beforeNotes = loadNotes()
    console.log("Nota a modificar: ", title)

    notes.forEach(function(elemento){
        if (elemento.title === title){
            elemento.title = newtitle
            elemento.body = newbody
            console.log("....................")
            console.log("                    ")
            console.log("MODIFICANDO NOTAS...")
            console.log("                    ")
            console.log("....................")
            console.log("                    ")
            console.log("[ NOTA MODIFICADA ]")

        }
    })

    if (JSON.stringify(notes) != JSON.stringify(beforeNotes)){
        saveNotes(notes)
    }else{
        console.log("!!!!!!   E R R O R   !!!!!!!")
    }

}

const removeNotes = function(title){
    let notes = loadNotes()
    console.log("Notas existentes: ")
    console.log(notes)
    console.log("...................")
    console.log("                   ")
    console.log("REMOVIENDO NOTAS...")
    console.log("                   ")
    console.log("...................")


    const notas = notes.filter(function(elemento){
        return elemento.title != title
    })

    if(notas.length != notes.length){
        saveNotes(notas)
        console.log("[ NOTA ELIMINADA CON ÉXITO ]")
        console.log("                            ")
        console.log("NOTAS ACTUALES:             ")
        console.log(loadNotes())    
    }else{
        console.log("!!!!!!   E R R O R   !!!!!!!")
    }
}



const readNotes = function(title){
    const notes = loadNotes()
    const foundNote = notes.find(function(elemento){
        return elemento.title === title
    })

    if(foundNote){
        console.log("Title: " + foundNote.title + "Body: " + foundNote.body)
    }

}


const listNotes = function(){
    const notes = loadNotes()
    notes.forEach(function(elemento){
        console.log("Title: "+ elemento.title + " Body: "+ elemento.body)
    })
}


const addNote = function(title, body){
    console.log("This is addNote function")
    // Load notes
    let notes = loadNotes()
    console.log(notes)

    const duplicateNotes = notes.filter(function(elemento){
        return elemento.title === title
    })


    if (duplicateNotes.length === 0){
        note = {
            title:title,
            body:body
        }
        notes.push(note)
        console.log(notes)
        // Save note to file
        saveNotes(notes)
    }else{
        console.log("Note already exist!")
    }

    
    
}

const saveNotes = function(notes){
    //JSON.stringify convierte un objeto JavaScript (note) a un JSON string
    
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json",notesJSON)
}

const loadNotes = function(){
    try{
        dataBuffer = fs.readFileSync("notes.json")
        data = dataBuffer.toString()
        //JSON.parse convierte un JSON string a un objeto JavaScript
        notesJSON = JSON.parse(data)
        console.log(data)
        return notesJSON
    }catch (e){
        console.log("File does not exist!")
        return []
    }
}

module.exports ={
    addNote:addNote,
    listNotes: listNotes,
    readNotes: readNotes,
    removeNotes: removeNotes,
    modifyNotes: modifyNotes
}