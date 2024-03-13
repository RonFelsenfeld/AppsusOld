const { useState, useEffect } = React

import { emailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {
  useEffect(() => {
    loadMails()
  }, [])

  function loadMails() {
    emailService.query().then(console.log).catch()
  }

  return (
    <section className="mail-index">
      <MailList />
    </section>
  )
}
