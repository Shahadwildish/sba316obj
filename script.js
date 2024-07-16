// Cache elements using selectElementById and querySelector
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const form = document.getElementById('userForm');
const loadContentButton = document.getElementById('loadContent');
const contentDiv = document.getElementById('content');

// Example function for dynamic content creation
function loadContent() {
    const fragment = document.createDocumentFragment();
    const newContent = document.createElement('p');
    newContent.textContent = 'Here is some dynamically loaded content!';
    fragment.appendChild(newContent);
    contentDiv.appendChild(fragment);
}

// Form validation and submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(span => span.textContent = '');

    // Username validation
    if (usernameInput.value.length < 4) {
        document.getElementById('usernameError').textContent = 'Username must be at least 4 characters long.';
        valid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(usernameInput.value)) {
        document.getElementById('usernameError').textContent = 'Username cannot contain special characters or whitespace.';
        valid = false;
    } else {
        // Check for unique username
        let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (storedUsers.some(user => user.username === usernameInput.value.toLowerCase())) {
            document.getElementById('usernameError').textContent = 'Username is already taken.';
            valid = false;
        }
    }

    // Email validation
    if (!emailInput.value || !emailInput.value.includes('@') || emailInput.value.endsWith('@example.com')) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address that is not from example.com.';
        valid = false;
    }

    // Password validation
    if (passwordInput.value.length < 12) {
        document.getElementById('passwordError').textContent = 'Password must be at least 12 characters long.';
        valid = false;
    } else if (!/[A-Z]/.test(passwordInput.value) || !/[a-z]/.test(passwordInput.value)) {
        document.getElementById('passwordError').textContent = 'Password must include both uppercase and lowercase letters.';
        valid = false;
    } else if (!/\d/.test(passwordInput.value)) {
        document.getElementById('passwordError').textContent = 'Password must include at least one number.';
        valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value)) {
        document.getElementById('passwordError').textContent = 'Password must include at least one special character.';
        valid = false;
    } else if (/password/i.test(passwordInput.value)) {
        document.getElementById('passwordError').textContent = 'Password cannot contain the word "password".';
        valid = false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords must match.';
        valid = false;
    }

    // Terms and Conditions validation
    if (!termsCheckbox.checked) {
        document.getElementById('termsError').textContent = 'You must accept the terms and conditions.';
        valid = false;
    }

    // If all validation checks pass
    if (valid) {
        const newUser = {
            username: usernameInput.value.toLowerCase(),
            email: emailInput.value.toLowerCase(),
            password: passwordInput.value
        };
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        form.reset();
    }
});

// Load content on button click
loadContentButton.addEventListener('click', loadContent);

// BOM properties and methods
console.log(window.innerWidth); // Log the viewport width
console.log(navigator.userAgent); // Log the user agent string
