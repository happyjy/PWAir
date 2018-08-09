var input = document.querySelectorAll('input');
var button = document.querySelectorAll('button');
var log = document.querySelector('p');
// SNS Auth
var provider = new firebase.auth.GoogleAuthProvider();
// var provider = new firebase.auth.FacebookAuthProvider();

var firebaseSignIn = function (event) {
  event.preventDefault(); //안하면 새로고침이 돼요^^

  firebase.auth().signInWithEmailAndPassword(getEmail(), getPassword())
  .then(function(result){
    console.log(result);
    log.innerHTML = "login success";
  })
  .catch((error) => {
    console.log(error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    
  });
};

var firebaseSignInWithGoogle = function (e) {
  e.preventDefault();
  //새로은 팝업이 뜨는것 (이유 웹뷰에소는 ... 가 안된다고?...)
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      console.log("### google Email login success" + result);
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
};

var firebaseSignUp = function () {
  if (exceptionHandler()) return true;
  firebase.auth().createUserWithEmailAndPassword(getEmail(), getPassword()).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  }).then(function (user) {
    console.log(user);
    log.innerText = "The account " + user.email + " has been registered in Authentication";
    clearForm();
  });
};

var firebaseSignOut = function () {
  // 할일 : Sign Out API 찾아서 기능 구현

};

var getEmail = function () {
  return input[0].value;
};

var getPassword = function () {
  return input[1].value;
};

var exceptionHandler = function () {
  if ( getEmail() === "" || getPassword() === "") {
    alert("enter the email and password");
    return true;
  }
  return false;
};

var clearForm = function () {
  input[0].value = "";
  input[1].value = "";
};

window.onload = function () {
  button[0].addEventListener('click', firebaseSignIn);
  button[1].addEventListener('click', firebaseSignInWithGoogle);
  button[2].addEventListener('click', firebaseSignUp);
};
