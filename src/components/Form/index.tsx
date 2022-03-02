import React, { useState } from 'react'

import axios from 'axios'
import { useTranslation } from 'react-i18next'

import { useOverlayContext } from '../../contexts/OverlayContext'
import { Container } from './styles'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

const portalId = process.env.NODE_ENV === 'production' ? '8840392' : '20818867'
const formGuid = process.env.NODE_ENV === 'production' ? '' : '03e72006-2762-42fe-ba3f-8bbe4171a399'

const Form: React.FC = () => {
  const { t } = useTranslation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [message, setMessage] = useState('')

  const [sent, setSent] = useState(false)
  const [clicked, setClicked] = useState(false)

  const { formsOpened, closeForms } = useOverlayContext()

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !email) return

    setClicked(true)

    await api.post(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        portalId,
        formGuid,
        fields: [
          {
            name: 'firstname',
            value: name
          },
          {
            name: 'email',
            value: email
          },
          {
            name: 'website',
            value: website
          },
          {
            name: 'phone',
            value: phone
          },
          {
            name: 'message',
            value: message
          }
        ]
      }
    )

    setSent(true)
    setTimeout(closeForms, 2000)
  }

  return (
    <Container onSubmit={handleSubmission} show={formsOpened}>
      <div className='title'>
        <button type='button' onClick={closeForms}>
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 100 100'
            fill='none'
            stroke='currentColor'
            strokeWidth='10'
            strokeLinecap='round'
          >
            <path d='M95,50 h-90 M5,50 l30,-30 M5,50 l30,30' />
          </svg>
        </button>
        <h2>{t('form.title')}</h2>
      </div>
      <label htmlFor='form-name'>
        {t('form.name')}
        <input
          type='text'
          id='form-name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor='form-email'>
        {t('form.email')}
        <input
          type='text'
          id='form-email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor='form-phone'>
        {t('form.phone')}
        <input
          type='text'
          id='form-phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label htmlFor='form-website'>
        {t('form.website')}
        <input
          type='text'
          id='form-website'
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </label>
      <label htmlFor='form-message'>
        {t('form.message')}
        <textarea id='form-message' value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      {sent ? (
        <span>{t('form.sent')}</span>
      ) : (
        <button type='submit' className='submit' disabled={clicked}>
          {clicked ? t('form.sending') : t('form.send')}
        </button>
      )}
    </Container>
  )
}

export default Form
