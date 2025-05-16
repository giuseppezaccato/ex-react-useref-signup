
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

const letters = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"


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

import { useState, useRef } from 'react'

function App() {

  //task input controllati 
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [spec, setSpec] = useState('')
  const [exp, setExp] = useState('')
  const [desc, setDesc] = useState('')

  const handleSub = (e) => {
    e.preventDefault(); //evitiamo page refresh

    //*gestione validazione? (IF)
    if (
      !fullName.trim() || !userName.trim() || !password.trim() || !spec.trim() || exp <= 0 || !desc.trim()
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
        <label htmlFor="nome">Nome Completo</label>
        <input
          id='nome'
          type="text"
          placeholder='Nome Completo'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />

        {/* Username (input di testo) */}
        <label htmlFor="username">Username</label>
        <input
          id='username'
          type="text"
          placeholder='Username'
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />

        {/* Password (input di tipo password) */}
        <label htmlFor="password">Password</label>
        <input
          id='password'
          type="password"
          placeholder='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend") */}
        <label htmlFor="spec">Specializzazione</label>
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

        {/* Anni di esperienza (input di tipo number) */}
        <label htmlFor="exp">Anni Di Esperienza</label>
        <input
          id='exp'
          type="number"
          placeholder='anni di exp'
          value={exp}
          onChange={e => setExp(e.target.value)}
        />

        {/* Descrizione sviluppatore (textarea) */}
        <label htmlFor="desc">Descrizione sviluppatore</label>
        <textarea
          id='desc'
          type="textarea"
          placeholder='descrizione'
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />

        <button
          type="submit"
        />
      </form>


    </div >
  )
}

export default App