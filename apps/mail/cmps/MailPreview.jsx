export function MailPreview({ mail }) {
  return (
    <article className="mail-preview grid">
      <p className="mail-from">{mail.from}</p>
      <p className="mail-subject">{mail.subject}</p>
      <p className="mail-sent-at">{mail.sentAt}</p>
    </article>
  )
}
