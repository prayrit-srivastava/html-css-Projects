function validateRegistrationInputs() {
    // Get input values
    const nameInput = document.getElementById('name-input').value;
    const emailInput = document.getElementById('email-input').value;
    const passwordInput = document.getElementById('password-input').value;
    
    // Check if name is not empty
    if (!nameInput) {
      alert('Please enter your name.');
      return false;
    }
    
    // Check if email is valid
    if (!validateEmail(emailInput)) {
      alert('Please enter a valid email address.');
      return false;
    }
    
    // Check if password meets requirements
    if (!validatePassword(passwordInput)) {
      alert('Please enter a password that is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, and one number.');
      return false;
    }
    
    // Check if profile pic is uploaded
    const profilePreview = document.getElementById('profile-pic-preview');
    if (profilePreview.getAttribute('src') === '#') {
      alert('Please upload a profile picture.');
      return false;
    }
    
    // All inputs are valid
    return true;
  }
  const dropZone = document.querySelector('.drop-zone');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, preventDefaults, false)
});

// Handle file drop
dropZone.addEventListener('drop', handleFileDrop, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleFileDrop(e) {
  const dt = e.dataTransfer;
  const file = dt.files[0];
  uploadProfilePicture(file);
}

function uploadProfilePicture(file) {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please upload a valid image file.');
    return;
  }

  // Preview profile picture
  const profilePicPreview = document.getElementById('profile-pic-preview');
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload= function(e) {
    profilePicPreview.setAttribute('src', e.target.result);
  }

  // Save profile pic to local storage
  localStorage.setItem('profilePic', file);
}
// ```

// 5. Storing user data:
// ```javascript
function registerUser() {
  // Validate inputs
  if (!validateRegistrationInputs()) {
    return;
  }

  // Get input values
  const nameInput = document.getElementById('name-input').value;
  const emailInput = document.getElementById('email-input').value;
  const passwordInput = document.getElementById('password-input').value;

  // Create user object
  const user = {
    name: nameInput,
    email: emailInput,
    password: passwordInput,
    profilePic: localStorage.getItem('profilePic')
  };

  // Save user to local storage
  localStorage.setItem(emailInput, JSON.stringify(user));
}
// ```

// 6. Implementing user verification:
// ```javascript
function sendVerificationEmail(user) {
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  localStorage.setItem(`verificationToken-${user.email}`, token);

  const verificationURL = `https://example.com/verify?email=${user.email}&token=${token}`;

  // Send email with verification URL to user
}
// ```

// 7. Implementing user authentication:
// ```javascript
function loginUser() {
  const emailInput = document.getElementById('email-input').value;
  const passwordInput = document.getElementById('password-input').value;
  
  const user = JSON.parse(localStorage.getItem(emailInput));

  // Check if user exists
  if (!user) {
    alert('Incorrect email or password.');
    return;
  }

  // Check if user is verified
  if (!localStorage.getItem(`verified-${emailInput}`)) {
    alert('Please verify your email before loggingin.');
    return;
  }

  // Check if password is correct
  if (user.password !== passwordInput) {
    alert('Incorrect email or password.');
    return;
  }

  // Login successful
  alert('Login successful.');
}
// ```

// 8. Displaying all users:
// ```javascript
function displayAllUsers() {
  // Get all user keys from local storage
  const keys = Object.keys(localStorage).filter(key => key.includes('@'));

  // Loop through keys and display user data
  keys.forEach(key => {
    const user = JSON.parse(localStorage.getItem(key));
    const status = localStorage.getItem(`verified-${key}`) ? 'Verified' : 'Not Verified';

    // Display user data on dashboard
    // ...
  });
}

// 9. Displaying user profile page:
// ```javascript
function displayUserProfile(userEmail) {
  const user = JSON.parse(localStorage.getItem(userEmail));

  // Display user profile data
  // ...
}