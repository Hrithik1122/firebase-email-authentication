// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBEcYg9PzkTjkYcMo_NMtKsEpdZqy6cb1s",
    authDomain: "wellnesshome-19826.firebaseapp.com",
    databaseURL: "https://wellnesshome-19826-default-rtdb.firebaseio.com",
    projectId: "wellnesshome-19826",
    storageBucket: "wellnesshome-19826.appspot.com",
    messagingSenderId: "198460061416",
    appId: "1:198460061416:web:ed47b8eb89404b96a67b5d",
    measurementId: "G-7GB7PWSK5W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()


// Set up our register function 
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  pin = document.getElementById('pin').value
  name = document.getElementById('name').value
  Mobile_no = document.getElementById('mobile').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(pin) == false) {
    alert('Email or Password is Outta Line!!')
    return 
    // Don't continue running the code
  }
  if (validate_field(name) == false || validate_field(Mobile_no) == false 
    ) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }


  
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, pin)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email, 
      name : name,
      pin : pin,
      Mobile_no: Mobile_no,
      
    }

    // Push to Firebase Database
    database_ref.child('User_Master/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  pin = document.getElementById('pin').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(pin) == false) {
    alert('Email or Password is Outta Line!!')
    return 
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, pin)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data

    // var user_data = {
    //   last_login : Date.now()
    // }

    // Push to Firebase Database
    database_ref.child('User_Master/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(pin) {
  // Firebase only accepts lengths greater than 6
  if (pin < 3) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}