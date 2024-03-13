const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onReadMail }) {
  if (!mails.length) return <div>No mails to show</div>

  return (
    <ul className="mail-list clean-list">
      {mails.map(mail => (
        <li key={mail.id} onClick={() => onReadMail(mail.id)}>
          <Link to={`/mail/${mail.id}`}>
            <MailPreview mail={mail} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
