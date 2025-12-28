import { REMOTE_URLS } from '../constants'

/**
 * Dynamically loads a remote stylesheet
 * @param url - The URL of the stylesheet to load
 * @returns Promise that resolves when the stylesheet is loaded
 */

export const loadRemoteStyles = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const existingLink = document.querySelector(`link[href="${url}"]`)

    if (existingLink) {
      resolve()
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url

    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${url}`))

    document.head.appendChild(link)
  })
}

/**
 * Loads all remote MFE stylesheets
 */
export const loadAllRemoteStyles = async (): Promise<void> => {
  const styleUrls = [
    `${REMOTE_URLS.dashboard}/assets/index.css`,
    `${REMOTE_URLS.inventory}/assets/index.css`,
    `${REMOTE_URLS.analytics}/assets/index.css`,
  ]

  await Promise.all(styleUrls.map(loadRemoteStyles))
}
