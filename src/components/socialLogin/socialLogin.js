import React, { PropTypes, Component } from 'react'

import config from './config';

class SocialUser {
  constructor() {
    this._provider = undefined;

    this._profile = {
      id: undefined,
      name: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      profilePicUrl: undefined
    }

    this._token = {
      accessToken: undefined,
      expiresAt: undefined
    }
  }

  set provider(provider) {
    if (config.providers.indexOf(provider) === -1) {
      throw new Error(`Provider ’${provider}’ isn’t supported.`)
    }

    this._provider = provider
  }

  get provider() {
    return this._provider
  }

  set profile(profile) {
    const {id, firstName, lastName, email, name, profilePicURL, ...rest} = profile

    if (Object.keys(rest).length > 0) {
      const keys = Object.keys(rest).join(', ')

      console.warn(`The following keys are not supported and thus won’t be saved: ${keys}`)
    }

    this._profile = {
      id,
      name,
      firstName,
      lastName,
      email,
      profilePicURL
    }
  }

  get profile() {
    return this._profile
  }

  set token(token) {
    const {accessToken, expiresAt, ...rest} = token

    if (Object.keys(rest).length > 0) {
      const keys = Object.keys(rest).join(', ')

      console.warn(`The following keys are not supported and thus won’t be saved: ${keys}`)
    }

    this._token = {
      accessToken,
      expiresAt
    }
  }

  get token() {
    return this._token
  }
}

export default class SocialLogin extends Component {
  static propTypes = {
    appId: PropTypes.string.isRequired,
    callback: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
      PropTypes.node
    ]).isRequired,
    provider: PropTypes.oneOf(config.providers).isRequired,
    version: PropTypes.string
  }

  static defaultProps = {
    version: '2.8'
  }

  constructor(props) {
    super(props)

    this.id = 'sl' + Math.floor(Math.random() * 0xFFFF)
  }

  handleSocialLoginInvokeSuccess = (res) => {
    const {callback, provider} = this.props
    if (res.error) {
      return
    }

    const user = new SocialUser()
    let userProfile
    let token

    userProfile = {
      id: res.id,
      name: res.name,
      firstName: res.first_name,
      lastName: res.last_name,
      email: res.email,
      profilePicURL: res.picture.data.url
    }
    token = {
      accessToken: res.authResponse.accessToken,
      expiresAt: res.authResponse.expiresIn
    }

    user.provider = provider
    user.profile = userProfile
    user.token = token

    callback(user, null)
  }

  handleSocialLoginInvokeFailure = (err) => {
    this.props.callback(null, err)
  }

  handleLogin = (e, obj) => {
    const {appId, provider, version} = this.props
    const handleSuccess = this.handleSocialLoginInvokeSuccess
    window.FB.init({
      appId,
      xfbml: true,
      version: `v${version}`
    })

    // Invoke Facebook Login
    window.FB.login((response) => {
      const loginResponse = response

      window.FB.api('/me', {
        fields: 'email,name,id,first_name,last_name,picture.type(large)'
      }, (profileResponse) => {
        Object.assign(profileResponse, loginResponse)

        handleSuccess(profileResponse)
      })
    }, {
      scope: 'email'
    })
  }

  componentDidMount() {
    const d = document
    const { appId, userId } = this.props;
  }

  render() {
    return (
      <div id={ this.id } onClick={ this.handleLogin }>
        { this.props.children }
      </div>
    )
  }
}