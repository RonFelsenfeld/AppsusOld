const { useState, useEffect, Fragment } = React
const { useParams } = ReactRouter
const { Outlet, useSearchParams } = ReactRouterDOM

import { emailService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [mails, setMails] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromParams(searchParams)
  )

  const { mailId } = useParams()

  useEffect(() => {
    loadMails()
    setSearchParams(filterBy)
  }, [filterBy])

  function loadMails() {
    emailService
      .query(filterBy)
      .then(mails => {
        setMails(mails)
        calcUnread()
      })
      .catch(err => console.error('Had issues with loading mails', err))
  }

  function calcUnread() {
    emailService
      .getUnreadCount(filterBy)
      .then(setUnreadCount)
      .catch(err => console.error('Had issues with calculating unread mails'))
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
      .catch(err => console.err('Had issues with reading mail:', err))
  }

  function onSetFilter(fieldsToUpdate) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
  }

  if (!mails) return <div>loading...</div>

  const { folder, txt, labels } = filterBy
  return (
    <section className="mail-index">
      <MailFolderList onSetFilter={onSetFilter} filterBy={{ folder }} />

      {!mailId && (
        <Fragment>
          <div>
            <MailList mails={mails} onReadMail={onReadMail} />
            <p>Unread: {unreadCount}</p>
          </div>
        </Fragment>
      )}

      <Outlet></Outlet>
    </section>
  )
}
