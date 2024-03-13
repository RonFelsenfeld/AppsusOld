const { useState, useEffect } = React
const { useParams } = ReactRouter

import { emailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'

export function MailDetails() {
  const [mail, setMail] = useState(null)
  const { mailId } = useParams()

  useEffect(() => {
    if (mailId) loadMail()
  }, [])

  function loadMail() {
    emailService
      .get(mailId)
      .then(setMail)
      .catch(err => {
        console.log('Had issues loading email', err)
      })
  }

  if (!mail) return <div>loading details...</div>
  const { subject, body, from, sentAt } = mail
  return (
    <section className="mail-details">
      <span className="mail-from">{from}</span>
      <span className="mail-sent-at">{utilService.formatDate(sentAt)}</span>
      <h1 className="mail-subject">{subject}</h1>
      <p className="mail-body">{body}</p>
    </section>
  )
}
