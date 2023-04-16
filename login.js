function onSignIn(googleUser) {
  // Get the Google ID token and Google access token
  var id_token = googleUser.getAuthResponse().id_token;
  var access_token = googleUser.getAuthResponse().access_token;

  // Send the ID token and access token to your server for verification
  // In this example, we'll send them to the server as query parameters in the URL
  var url = "https://aminfaka.github.io/menu.html?id_token=" + id_token + "&access_token=" + access_token;
  window.location.href = url;
}
