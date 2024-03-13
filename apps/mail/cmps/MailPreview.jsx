import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
  const { from, subject, sentAt, isRead, body } = mail

  const isReadClass = isRead ? 'read' : ''

  return (
    <article className={`mail-preview grid ${isReadClass}`}>
      <p className="mail-from">{from}</p>
      <p className="mail-subject">{subject}</p>
      <p className="mail-body">{body.substring(0, 20)}...</p>
      <p className="mail-sent-at">{utilService.formatDate(sentAt)}</p>
    </article>
  )
}
