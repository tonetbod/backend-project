// ========================================
// PATCH - UPDATE ALL STUDENTS
// ========================================


// Get HTML elements

const patchForm =
    document.getElementById("patchForm");

const nameInput =
    document.getElementById("name");

const ageInput =
    document.getElementById("age");

const courseInput =
    document.getElementById("course");

const emailInput =
    document.getElementById("email");

const patchBtn =
    document.getElementById("patchBtn");

const message =
    document.getElementById("message");


// ========================================
// PATCH FORM SUBMIT
// ========================================

patchForm.addEventListener(
    "submit",
    async function (event) {

        // Prevent page refresh

        event.preventDefault();


        // Get values

        const name =
            nameInput.value.trim();

        const age =
            ageInput.value.trim();

        const course =
            courseInput.value;

        const email =
            emailInput.value.trim();


        // ========================================
        // VALIDATE DATA
        // ========================================

        if (
            !name ||
            !age ||
            !course ||
            !email
        ) {

            showMessage(
                "error",
                "Please fill in all fields."
            );

            return;
        }


        // ========================================
        // CONFIRM ACTION
        // ========================================

        const confirmed = confirm(
            "WARNING!\n\n" +
            "You are about to update ALL students " +
            "in the database.\n\n" +
            "Do you want to continue?"
        );


        if (!confirmed) {

            return;
        }


        // Disable button

        patchBtn.disabled = true;

        patchBtn.textContent =
            "Updating All Students...";


        hideMessage();


        try {


            // ========================================
            // SEND PATCH REQUEST
            // ========================================

            const response = await fetch(
                "/students",
                {

                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        age: parseInt(age),

                        course: course,

                        email: email

                    })

                }
            );


            // ========================================
            // CONVERT RESPONSE TO JSON
            // ========================================

            const data =
                await response.json();


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
                    data.message ||
                    "Students could not be updated."
                );

            }


        }

        catch (error) {

            console.error(
                "PATCH ERROR:",
                error
            );


            showMessage(
                "error",
                "Could not connect to the server."
            );

        }


        finally {

            // Enable button

            patchBtn.disabled = false;

            patchBtn.textContent =
                "Update All Students";

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

    message.className =
        "message";

}