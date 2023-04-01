// De client id die je hebt gegeven
const CLIENT_ID = '434251851653-2t5vuufp0tu4iv2omko3d8pt40podqrv.apps.googleusercontent.com';

// Laad de Google API-bibliotheek
function loadGoogleAuth() {
  gapi.load('auth2', function() {
    gapi.auth2.init({
      client_id: CLIENT_ID
    });
  });
}

// Inloggen met Google
function googleLogin() {
  gapi.auth2.getAuthInstance().signIn().then(
    function(success) {
      const user = success.getBasicProfile();
      const name = user.getName();
      const email = user.getEmail();
      const imgURL = user.getImageUrl();
      const msg = `Welcome ${name}! You are logged in with ${email}.`;
      document.getElementById('msg-container').innerHTML = msg;
      console.log(`User logged in with email: ${email}`);
      // Voeg hier eventuele verdere logica toe, zoals doorverwijzing naar menu.html
    },
    function(error) {
      console.log(`Error logging in: ${error}`);
    }
  );
}

// Voeg event listeners toe aan de knoppen
window.onload = function() {
  document.getElementById('login-btn').addEventListener('click', googleLogin);
  document.getElementById('guest-btn').addEventListener('click', function() {
    window.location.href = "aminfaka.github.io/menu.html";
  });
}

// Laad de Google API-bibliotheek wanneer de pagina wordt geladen
window.addEventListener('load', loadGoogleAuth);
