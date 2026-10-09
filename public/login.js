// ========================================
// STUDENT LOGIN JAVASCRIPT
// ========================================


// Get elements from the HTML
const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const loginBtn = document.getElementById("loginBtn");

const message = document.getElementById("message");

const studentInfo = document.getElementById("studentInfo");


// ========================================
// LOGIN FORM
// ========================================

loginForm.addEventListener("submit", async function (event) {

    // Prevent the browser from refreshing the page
    event.preventDefault();


    // Get email from input
    const email = emailInput.value.trim();


    // Hide previous messages
    message.className = "message";

    studentInfo.style.display = "none";

    studentInfo.innerHTML = "";


    // ========================================
    // CHECK EMAIL
    // ========================================

    if (!email) {

        showMessage(
            "error",
            "Please enter your email address."
        );

        return;
    }


    // ========================================
    // DISABLE BUTTON
    // ========================================

    loginBtn.disabled = true;

    loginBtn.textContent = "Logging in...";


    try {


        // ========================================
        // SEND LOGIN REQUEST TO EXPRESS
        // ========================================

        const response = await fetch("/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email: email

            })

        });


        // Convert response to JSON
        const data = await response.json();


        // ========================================
        // LOGIN SUCCESSFUL
        // ========================================

        if (response.ok) {

            showMessage(
                "success",
                data.message
            );


            // Display student information
            showStudentInfo(data.student);


            // Clear email field
            emailInput.value = "";


        } else {


            // ========================================
            // LOGIN FAILED
            // ========================================

            showMessage(
                "error",
                data.message
            );

        }


    } catch (error) {


        console.error("LOGIN ERROR:", error);


        showMessage(
            "error",
            "Could not connect to the server."
        );


    } finally {


        // Enable button again
        loginBtn.disabled = false;

        loginBtn.textContent = "Login";

    }

});


// ========================================
// SHOW MESSAGE
// ========================================

function showMessage(type, text) {

    message.textContent = text;

    message.className = `message ${type}`;

}


// ========================================
// SHOW STUDENT INFORMATION
// ========================================

function showStudentInfo(student) {

    studentInfo.innerHTML = `

        <strong>Welcome, ${student.name}!</strong>

        <br>

        Student ID:
        ${student.id}

        <br>

        Name:
        ${student.name}

        <br>

        Age:
        ${student.age}

        <br>

        Course:
        ${student.course}

        <br>

        Email:
        ${student.email}

    `;


    studentInfo.style.display = "block";

}