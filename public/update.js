// ========================================
// UPDATE STUDENT JAVASCRIPT
// ========================================


// Get HTML elements
const studentIdInput = document.getElementById("studentId");

const updateForm = document.getElementById("updateForm");

const nameInput = document.getElementById("name");

const ageInput = document.getElementById("age");

const courseInput = document.getElementById("course");

const emailInput = document.getElementById("email");

const updateBtn = document.getElementById("updateBtn");

const message = document.getElementById("message");


// ========================================
// FIND STUDENT
// ========================================

async function findStudent() {

    // Get student ID
    const id = studentIdInput.value.trim();


    // Hide previous message
    hideMessage();


    // Check ID
    if (!id) {

        showMessage(
            "error",
            "Please enter a student ID."
        );

        return;
    }


    try {

        // ========================================
        // GET STUDENT BY ID
        // ========================================

        const response = await fetch(
            `/students/${id}`
        );


        // Convert response to JSON
        const data = await response.json();


        // ========================================
        // STUDENT FOUND
        // ========================================

        if (response.ok) {

            // Put student data into the form
            nameInput.value = data.name;

            ageInput.value = data.age;

            courseInput.value = data.course;

            emailInput.value = data.email;


            // Show update form
            updateForm.classList.remove("hidden");


            showMessage(
                "success",
                `Student ${data.name} found. You can now edit the information.`
            );

        }


        // ========================================
        // STUDENT NOT FOUND
        // ========================================

        else {

            updateForm.classList.add("hidden");

            showMessage(
                "error",
                data.message || "Student not found."
            );

        }


    } catch (error) {

        console.error("FIND ERROR:", error);

        showMessage(
            "error",
            "Could not connect to the server."
        );

    }

}


// ========================================
// UPDATE STUDENT Start
// ========================================

updateForm.addEventListener(
    "submit",
    async function (event) {

        // Prevent page refresh
        event.preventDefault();


        // Get student ID
        const id = studentIdInput.value.trim();


        // Get updated values
        const name = nameInput.value.trim();

        const age = ageInput.value.trim();

        const course = courseInput.value;

        const email = emailInput.value.trim();


        // ========================================
        // VALIDATE DATA
        // ========================================

        if (!id || !name || !age || !course || !email) {

            showMessage(
                "error",
                "Please fill in all fields."
            );

            return;
        }


        // Disable button
        updateBtn.disabled = true;

        updateBtn.textContent = "Updating...";


        try {


            // ========================================
            // SEND PUT REQUEST
            // ========================================

            const response = await fetch(
                `/students/${id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        age: parseInt(age),

                        course: course,

                        email: email

                    })

                }
            );


            // Convert response to JSON
            const data = await response.json();


            // ========================================
            // UPDATE SUCCESSFUL
            // ========================================

            if (response.ok) {

                showMessage(
                    "success",
                    data.message
                );

            }


            // ========================================
            // UPDATE FAILED
            // ========================================

            else {

                showMessage(
                    "error",
                    data.message || "Student could not be updated."
                );

            }


        } catch (error) {

            console.error(
                "UPDATE ERROR:",
                error
            );

            showMessage(
                "error",
                "Could not connect to the server."
            );

        } finally {

            // Enable button
            updateBtn.disabled = false;

            updateBtn.textContent = "Update Student";

        }

    }
);


// ========================================
// SHOW MESSAGE
// ========================================

function showMessage(type, text) {

    message.textContent = text;

    message.className =
        `message ${type}`;

}


// ========================================
// HIDE MESSAGE
// ========================================

function hideMessage() {

    message.textContent = "";

    message.className = "message";

}