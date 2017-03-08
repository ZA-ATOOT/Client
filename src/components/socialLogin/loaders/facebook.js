const facebookSDKLoader = (d, cid, appId, fn, err) => {
  return new Promise((resolve, reject) => {
  const id = 'fb-client'
  const fjs = d.getElementsByTagName('script')[0]
  let js

  if (d.getElementById(id)) {
    return
  }

  js = d.createElement('script')
  js.id = id
  js.src = '//connect.facebook.net/en_US/all.js'

  js.onload = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: appId,
        xfbml: true,
        version: 'v2.8'
      })
      
      window.FB.getLoginStatus(function(response) {
        if(response.status == "connected"){
          FB.api(`/${response.authResponse.userID}`,{ fields: 'first_name,picture,last_name'},
            function (userResponse) {
              if (userResponse && !userResponse.error) {
                resolve(userResponse)
              }
            });
        } else {
         resolve(response)
        }
      })
    }
  }
  fjs.parentNode.insertBefore(js, fjs)
})
}

export default facebookSDKLoader
