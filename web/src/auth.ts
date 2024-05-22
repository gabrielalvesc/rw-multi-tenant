import { createDbAuthClient, createAuth } from '@redwoodjs/auth-dbauth-web'

const dbAuthClient = createDbAuthClient()

const TOKEN_CACHE_TIME = 5000
const DEFAULT_DATE_STRING = '1970-01-01T00:00:00'
export const CREDENTIALS = 'same-origin'
const credentials = CREDENTIALS
const authUrl = globalThis.RWJS_API_URL + '/auth'
let getTokenPromise
let lastTokenCheckAt = new Date(DEFAULT_DATE_STRING)
let cachedToken

export const HTTP_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTH_PROVIDER: 'auth-provider',
  AUTHORIZATION: 'Authorization',
}

export const MEDIA_TYPE = {
  APPLICATION_JSON: 'application/json',
}

export const METHODS = {
  POST: 'POST',
}

const resetAndFetch = async function (url, params) {
  resetTokenCache()
  return fetch(url, params)
}
const isTokenCacheExpired = () => {
  const now = new Date()
  return now.getTime() - lastTokenCheckAt.getTime() > TOKEN_CACHE_TIME
}
const resetTokenCache = () => {
  lastTokenCheckAt = new Date(DEFAULT_DATE_STRING)
  cachedToken = null
}

dbAuthClient.login = async (attributes) => {
  const response = await resetAndFetch(authUrl, {
    credentials,
    method: METHODS.POST,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      ...attributes,
      method: 'login',
    }),
  })
  return await response.json()
}

dbAuthClient.forgotPassword = async (username) => {
  const response = await resetAndFetch(authUrl, {
    credentials,
    method: METHODS.POST,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: MEDIA_TYPE.APPLICATION_JSON,
    },
    body: JSON.stringify({
      username,
      method: 'forgotPassword',
    }),
  })
  return await response.json()
}

dbAuthClient.getToken = async () => {
  if (getTokenPromise) {
    return getTokenPromise
  }
  if (isTokenCacheExpired()) {
    getTokenPromise = fetch(`${authUrl}?method=getToken`, {
      credentials,
    })
      .then((response) => response.text())
      .then((tokenText) => {
        lastTokenCheckAt = new Date()
        getTokenPromise = null
        cachedToken = tokenText.length === 0 ? null : tokenText
        return cachedToken
      })
    return getTokenPromise
  }
  return cachedToken
}

dbAuthClient.logout = async () => {
  await resetAndFetch(authUrl, {
    credentials,
    method: METHODS.POST,
    body: JSON.stringify({
      method: 'logout',
    }),
  })
  return true
}

dbAuthClient.resetPassword = async (attributes) => {
  const response = await resetAndFetch(authUrl, {
    credentials,
    method: METHODS.POST,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: MEDIA_TYPE.APPLICATION_JSON,
    },
    body: JSON.stringify({
      ...attributes,
      method: 'resetPassword',
    }),
  })
  return await response.json()
}

dbAuthClient.signup = async (attributes) => {
  const response = await resetAndFetch(authUrl, {
    credentials,
    method: METHODS.POST,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: MEDIA_TYPE.APPLICATION_JSON,
    },
    body: JSON.stringify({
      ...attributes,
      method: 'signup',
    }),
  })
  return await response.json()
}

dbAuthClient.getUserMetadata = async () => {
  return await dbAuthClient.getToken()
}

dbAuthClient.validateResetToken = async (resetToken) => {
  const response = await resetAndFetch(authUrl, {
    credentials,
    method: METHODS.POST,
    headers: {
      [HTTP_HEADERS.CONTENT_TYPE]: MEDIA_TYPE.APPLICATION_JSON,
    },
    body: JSON.stringify({
      resetToken,
      method: 'validateResetToken',
    }),
  })
  return await response.json()
}

dbAuthClient.type = 'dbAuth'

export const { AuthProvider, useAuth } = createAuth(dbAuthClient)
