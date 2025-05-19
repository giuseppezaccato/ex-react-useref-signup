
// 🔍 Esercizio: Form di Registrazione Sviluppatori
// !💡 Premessa: Stai sviluppando un form di registrazione per una piattaforma dedicata ai giovani 
// sviluppatori web. Gli utenti devono iscriversi indicando le loro competenze e specializzazioni.

//  !📌 MILESTONE 1: Form con Campi Controllati
//  Campi richiesti:
//  - Nome completo (input di testo)
//  - Username (input di testo)
//  - Password (input di tipo password)
//  - Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")
//  - Anni di esperienza (input di tipo number)
//  - Descrizione sviluppatore (textarea)

//  Validazione al submit:
//  - Tutti i campi devono essere compilati
//  - Gli anni di esperienza devono essere positivi
//  - La specializzazione deve essere selezionata

//  Al submit valido: console.log dei dati del form


//  !📌 MILESTONE 2: Validazione in Tempo Reale
//  Costanti per la validazione:

// const letters = "abcdefghijklmnopqrstuvwxyz"
// const numbers = "0123456789"
// const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"


//  Validazione in tempo reale per:
//  1. Username:
//     - Solo caratteri alfanumerici
//     - Minimo 6 caratteri
//     - No spazi o simboli

//  2. Password:
//     - Minimo 8 caratteri
//     - Almeno 1 lettera
//     - Almeno 1 numero
//     - Almeno 1 simbolo

//  3. Descrizione:
//     - Tra 100 e 1000 caratteri
//     - No spazi iniziali o finali

//  Mostra feedback di validazione:
//  - Messaggio di errore (rosso) per campi non validi
//  - Messaggio di successo (verde) per campi validi


//  !📌 MILESTONE 3: Ottimizzazione con Campi Non Controllati
//  Analisi richiesta:
//  1. Identificare i campi che non necessitano aggiornamenti in tempo reale
//  2. Convertire i campi appropriati usando useRef()
//  3. Assicurarsi che la validazione funzioni ancora al submit


//  !🎯 BONUS: Migliorare l'Esperienza Utente
//  Implementare:
//  1. Focus automatico sul campo Nome al mount del componente
//  2. Pulsante "Reset" per pulire tutti i campi:
//     - Reset degli input controllati allo stato iniziale
//     - Pulizia degli input non controllati usando refs
//  3. Pulsante fisso in basso a destra per tornare all'inizio del form

import { useState, useRef, useEffect, useMemo } from 'react'

//task costanti per la validazione
const letters = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"

function App() {

  //task input controllati 
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [spec, setSpec] = useState('')
  const [exp, setExp] = useState('')
  const [desc, setDesc] = useState('')

  //sarebbe scomodo fare una validazione con un nuovo state concatenato ad useEffect (PER OGNI CAMPO)
  //? const [isUserValid, setIsUserValid] = useState(null)
  //? useEffect(() => {
  //?   ...serie di validazioni
  //?   setIsUserValid(true)
  //? }, [userName])

  //*...si ricorre quindi a useMemo()

  //TODO Validazione in tempo reale per:
  //task  1. Username:
  //     - Solo caratteri alfanumerici
  //     - Minimo 6 caratteri
  //     - No spazi o simboli

  //* variabile "memoized" isUserValid  
  const isUserValid = useMemo(() => {
    //variabile booleana per controllare se l'input contiene o no SOLO caratteri alfanumerici...come?
    //! IMPORTANTE stringa in array => stringa.split("") || [...stringa] 
    //* trasformo in array la stringa input userName(=> `split("")` ) e applico il metodo `every(() =>{})`
    const validCharsNum = userName.split("").every(char =>
      letters.includes(char.toLowerCase()) || numbers.includes(char)
    )

    //* aggiungo validazione a un minimo di 6 caratteri
    return validCharsNum && userName.trim().length >= 6

  }, [userName])//*devo COMUNQUE tenere traccia della stessa dep di prima


  //task  2. Password:
  //     - Minimo 8 caratteri
  //     - Almeno 1 lettera
  //     - Almeno 1 numero
  //     - Almeno 1 simbolo

  //* variabile "memoized" isPassValid 
  const isPassValid = useMemo(() => {
    //*return UNICO con una serie concatenata di condizioni
    return (
      password.trim().length >= 8 &&
      password.split("").some(char => letters.includes(char)) &&
      password.split("").some(char => numbers.includes(char)) &&
      password.split("").some(char => symbols.includes(char))
    )
  }, [password])


  //task  3. Descrizione:
  //     - Tra 100 e 1000 caratteri
  //     - No spazi iniziali o finali

  //* variabile "memoized" isDescValid 
  const isDescValid = useMemo(() => {
    return (
      desc.trim().length >= 100 &&
      desc.trim().length <= 1000


    )
  }, [desc])


  //task callback in onSubmit del form
  const handleSub = (e) => {
    e.preventDefault(); //evitiamo page refresh

    //*gestione validazione? (IF)
    if (
      !fullName.trim()
      || !userName.trim()
      || !password.trim()
      || !spec.trim()
      || exp <= 0
      || !desc.trim()

      //aggiungo la validazione in tempo reale
      || !isUserValid
      || !isPassValid
      || !isDescValid

    ) {
      alert("Attenzione! non hai compilato correttamente tutti i campi!");
      return
    }
    //* se va tutto a buon fine, quindi superato l'IF, stampo un oggetto che contiene tutti gli state
    console.log('Iscrizione Andata a Buon fine', {
      fullName,
      userName,
      password,
      spec,
      exp,
      desc,
    })


  }

  return (
    <div className="container">
      <h1> Web Dev Signup </h1>

      <form
        onSubmit={handleSub}
      >

        {/* Nome completo (input di testo) */}
        <label htmlFor="nome">Nome Completo
          <input
            id='nome'
            type="text"
            placeholder='Nome Completo'
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </label>

        {/* Username (input di testo) */}
        <label htmlFor="username">Username
          <input
            id='username'
            type="text"
            placeholder='Username'
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          {/* validazione in tempo reale */}
          {userName.trim() &&
            <p style={{ color: isUserValid ? "green" : "red" }}>
              {isUserValid ? "user valido" : "6 caratteri alfanumerici richiesti"}
            </p>
          }
        </label>

        {/* Password (input di tipo password) */}
        <label htmlFor="password">Password
          <input
            id='password'
            type="password"
            placeholder='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {password.trim() &&
            <p style={{ color: isPassValid ? "green" : "red" }}>
              {isPassValid ? "password valida" : "8 caratteri richiesti, con almeno 1 simbolo, 1 numero, 1 lettera"}
            </p>
          }
        </label>

        {/* Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend") */}
        <label htmlFor="spec">Specializzazione


          <select
            id='spec'
            name='specializzazioni'
            value={spec}
            onChange={e => setSpec(e.target.value)}
          >
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </label>

        {/* Anni di esperienza (input di tipo number) */}
        <label htmlFor="exp">Anni Di Esperienza

          <input
            id='exp'
            type="number"
            placeholder='anni di exp'
            value={exp}
            onChange={e => setExp(e.target.value)}
          />
        </label>

        {/* Descrizione sviluppatore (textarea) */}
        <label htmlFor="desc">Descrizione sviluppatore</label>
        <textarea
          id='desc'
          type="textarea"
          placeholder='descrizione'
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        {desc.trim() &&
          <p style={{ color: isDescValid ? "green" : "red" }}>
            {isDescValid ? "descrizione valida" : `min 100 caratteri, max 1000 (${desc.trim().length})`}
          </p>
        }

        <button
          type="submit"
        > Conferma
        </button>
      </form>


    </div >
  )
}

export default App