const { useState, useEffect, Fragment } = React
const { useParams } = ReactRouter
const { Outlet } = ReactRouterDOM

import { emailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const { mailId } = useParams()

  useEffect(() => {
    loadMails()
    calcUnread()
  }, [])

  function loadMails() {
    emailService
      .query()
      .then(setMails)
      .catch(err => console.log('Had issues with loading mails'))
  }

  function calcUnread() {
    emailService
      .getUnreadCount()
      .then(setUnreadCount)
      .catch(err => console.log('Had issues with calculating unread mails'))
  }

  function onReadMail(mailId) {
    emailService
      .get(mailId)
      .then(mail => {
        if (!mail.isRead) mail.isRead = true
        return mail
      })
      .then(emailService.save)
      .then(updatedMail => {
        setMails(prevMails =>
          prevMails.map(mail =>
            mail.id === updatedMail.id ? updatedMail : mail
          )
        )
        calcUnread()
      })
      .catch(err => console.log('Had issues with reading mail:', err))
  }

  if (!mails) return <div>loading...</div>

  return (
    <section className="mail-index">
      {!mailId && (
        <Fragment>
          <MailList mails={mails} onReadMail={onReadMail} />
          <p>Unread: {unreadCount}</p>
        </Fragment>
      )}
      <Outlet></Outlet>
    </section>
  )
}
