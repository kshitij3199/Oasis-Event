var user1, name, user2, email;
var y_score = document.getElementById('y_score');
var loader = document.getElementsByClassName('fetching')[0];
// var name_space = document.getElementById('name_space');
function signIn() {

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithRedirect(provider);
// firebase.auth().onAuthStateChanged(function(user) {
  
//   if (user) {
//     console.log(user);
//     user1 = user;
//     alert('Hi this is in if user');
//     // redirect();
//   } else {
//     // No user is signed in.
//   }
// });

// var user = firebase.auth().currentUser;
// console.log(user);
// alert(user);
// if (user != null) {
// alert('Hi this is in if user != null');
// // redirect();
// user.providerData.forEach(function (profile) {
//   name = profile.displayName;
//   alert('Hi this is in in if user != null');
//   // redirect();
//   console.log("Sign-in provider: " + profile.providerId);
//   console.log("  Provider-specific UID: " + profile.uid);
//   console.log("  Name: " + profile.displayName);
//   console.log("  Email: " + profile.email);
//   console.log("  Photo URL: " + profile.photoURL);
// });
// }
}


firebase.auth().getRedirectResult().then(function (result) {
  // var user = firebase.auth().currentUser;
  // name = "no name";
  // redirect();
  // if (user != null) {
  //   // alert('Hi this is in if user != null');
  // //   redirect();
  //   user.providerData.forEach(function (profile) {
  //     name = profile.displayName;
  //     // alert('Hi this is in in if user != null');
  //     // redirect();
  //     console.log("Sign-in provider: " + profile.providerId);
  //     console.log("  Provider-specific UID: " + profile.uid);
  //     console.log("  Name: " + profile.displayName);
  //     console.log("  Email: " + profile.email);
  //     console.log("  Photo URL: " + profile.photoURL);
  //   });
  // }
  // This gives you a Google Access Token. You can use it to access the Google API.
  if (result.credential) {
      var token = result.credential.accessToken;
      console.log('token ' + token);
  }
  // The signed-in user info.
  user2 = result.user;
  name = user2.displayName;
  email = user2.email;
  console.log(user2.displayName);
  console.log('user ' + user2);
  if(user2) {
    createUser();
  }
  // if success redirect to
  // $state.go('maps-fullwidth');

  // ...
}).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  console.log(errorCode);
  var errorMessage = error.message;
  // The email of the user's account used.
  console.log(errorMessage);
  var email = error.email;
  console.log(email);
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log(credential);
  // ...
});

// function redirect() {
//   window.location.href = 'https://nikhilphalange.github.io/Oasis-Event/round1.html';
//   createUser();
// }

function createUser() {
  var newUser = 0;
  db.collection("users").where("name","==",name).where("email","==",email)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
    newUser = 1;
  });
  if(newUser == 1) {
      db.collection("users").doc(name).set({
        name: name,
        email: email,
        score: 0,
        chapter_status: 1
      }).then(function() {

            y_score.innerHTML = 0;
            name_space.innerHTML = name;
            loader.style.transform = 'scale(0)';
            console.log("Document successfully written!");
            // var current_url = window.location.href;
            // var new_url = current_url.split("_")[0] + "_" + i + ".html";
            window.location.href = 'nikhilphalange.github.io/chapter_1.html';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
  }   
  else {
      db.collection("users").where("name","==",name).where("email","==",email)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              y_score.innerHTML = doc.data().score;
              loader.style.transform = 'scale(0)';
              window.location.href = 'nikhilphalange.github.io/chapter_' + doc.data().chapter_status + '.html';
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }  
}



