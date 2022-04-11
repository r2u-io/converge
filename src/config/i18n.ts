import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ChainedBackend from 'i18next-chained-backend'
import HttpBackend from 'i18next-http-backend'

const i18nInstance = i18next.createInstance()

i18nInstance
  .use(ChainedBackend)
  .use(LanguageDetector)
  .init({
    debug: false,
    react: {
      useSuspense: false
    },
    fallbackLng: 'en',
    supportedLngs: ['pt', 'en', 'es'],
    preload: ['pt', 'en', 'es'],
    interpolation: {
      escapeValue: false
    },
    load: 'all',
    backend: {
      backends: [HttpBackend],
      backendOptions: [
        {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
          allowMultiloading: true
        }
      ]
    }
  })

export default i18nInstance
