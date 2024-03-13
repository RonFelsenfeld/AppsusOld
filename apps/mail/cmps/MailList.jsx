const { useParams } = ReactRouter
const { Link } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onReadMail }) {
  const { folder } = useParams()

  return (
    <ul className="mail-list clean-list">
      {mails.map(mail => (
        <li key={mail.id} onClick={() => onReadMail(mail.id)}>
          <Link to={`/mail/${folder}/${mail.id}`}>
            <MailPreview mail={mail} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
