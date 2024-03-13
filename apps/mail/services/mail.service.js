import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const loggedUser = {
  email: 'user@appsus.com',
  fullName: 'Mahatma Appsus',
}

export const emailService = {
  query,
  get,
  remove,
  save,
  getEmptyMail,
  getDefaultCriteria,
}
_createMails()

// For Debug only
window.ms = emailService

function query(filterBy = getDefaultCriteria()) {
  return storageService.query(MAIL_KEY).then(mails => {
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function getEmptyMail() {
  const emptyMail = {
    id: '',
    subject: '',
    body: '',
    isRead: false,
    sentAt: null,
    removedAt: null,
    from: '',
    to: '',
  }
  return emptyMail
}

function getDefaultCriteria() {
  return {
    folder: 'inbox',
    txt: '',
    labels: [],
  }
}

// function getFilterFromParams(searchParams = {}) {
//   const defaultFilter = getDefaultFilter()
//   return {
//     txt: searchParams.get('txt') || defaultFilter.txt,
//     minSpeed: searchParams.get('minSpeed') || defaultFilter.minSpeed,
//     desc: searchParams.get('desc') || defaultFilter.desc,
//   }
// }

////////////////////////////////////////////////////

function _createMail() {
  const newMail = getEmptyMail()

  newMail.id = utilService.makeId()
  newMail.subject = utilService.makeLorem(2)
  newMail.body = utilService.makeLorem(20)
  newMail.sentAt = Date.now()
  newMail.from = `${utilService.makeLorem(1).replaceAll(' ', '')}@mail.com`
  newMail.to = loggedUser.email

  return newMail
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = []
    for (let i = 0; i < 20; i++) {
      mails.push(_createMail())
    }

    utilService.saveToStorage(MAIL_KEY, mails)
  }
}
