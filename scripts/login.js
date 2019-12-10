//elements
let registerEmailTextBox = document.getElementById("registerEmailTextBox");
let registerPasswordTextBox = document.getElementById(
  "registerPasswordTextBox"
);
let registerButton = document.getElementById("registerButton");

let logInEmailTextBox = document.getElementById("logInEmailTextBox");
let logInPasswordTextBox = document.getElementById("logInPasswordTextBox");
let logInButton = document.getElementById("logInButton");

let logOutButton = document.getElementById("logOutButton");

// DEO  - added section element handles here
const login = document.getElementById("login");
const landing = document.getElementById("landing");
const play = document.getElementById("play");
let appUser = {};

//register button
registerButton.addEventListener("click", () => {
  let email = registerEmailTextBox.value;
  let password = registerPasswordTextBox.value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
    });
});

//log in button
logInButton.addEventListener("click", () => {
  let email = logInEmailTextBox.value;
  let password = logInPasswordTextBox.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
    });
  //redirect();
});

//log out button
logOutButton.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(function() {})
    .catch(function(error) {
      // An error happened.
    });
});

//function redirect() {
//  window.location.href = "home.html";
//}

// DEO added an auth listener
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      // a user has signed in
      login.style.display = 'none';
      landing.style.display = 'block';
      appUser = new User(user.uid);
      }
  else {
      // no user is signed in
      login.style.display = 'block';
      landing.style.display = 'none';
      play.style.display = 'none';
      appUser = {};
  }
});

// clicks the logout button
function simulateClickLogout() {
  let event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
  });
       
  let cancelled = !logOutButton.dispatchEvent(event);
  if (cancelled) {
      // A handler called preventDefault
  }
}

// DEO - force logout on load
simulateClickLogout();
