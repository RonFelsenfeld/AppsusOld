const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { MailDetails } from './apps/mail/cmps/MailDetails.jsx'

import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
import { EditNote } from './apps/note/cmps/EditNote.jsx'

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          <Route path="/mail/:folder" element={<MailIndex />}>
            <Route path="/mail/:folder/:mailId" element={<MailDetails />} />
          </Route>

          <Route path="/note" element={<NoteIndex />} >
          {/* <Route path="/note/edit/:noteId" element={<EditNote />} /> */}

          </Route>
        </Routes>
      </section>
    </Router>
  )
}
