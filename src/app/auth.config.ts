import { AuthConfig } from 'angular-oauth2-oidc'

export const auth: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId: '1093585970787-n344bp77albsj5hine8lb994nvb9dkmj.apps.googleusercontent.com',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false
}
