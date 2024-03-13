const { useState, useEffect } = React
const { useParams } = ReactRouter
const { Outlet } = ReactRouterDOM

import { emailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const { mailId } = useParams()

  useEffect(() => {
    loadMails()
  }, [])

  function loadMails() {
    emailService
      .query()
      .then(setMails)
      .catch(err => console.log('Had issues with loading mails'))
  }

  if (!mails) return <div>loading...</div>
  return (
    <section className="mail-index">
      {!mailId && <MailList mails={mails} />}

      <Outlet></Outlet>
    </section>
  )
}
