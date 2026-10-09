// ========================================
// DELETE STUDENT JAVASCRIPT
// ========================================


// ========================================
// LOAD STUDENTS WHEN PAGE OPENS
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    loadStudents
);


// ========================================
// DELETE BY FIELD
// ========================================

async function deleteByField() {

    const type =
        document.getElementById("deleteType").value;

    const value =
        document.getElementById("deleteValue")
            .value
            .trim();


    // Check value
    if (!value) {

        showMessage(
            "error",
            "Please enter a value to delete."
        );

        return;
    }


    // Confirmation
    const confirmed = confirm(
        `Are you sure you want to delete student(s) using ${type}: ${value}?`
    );


    if (!confirmed) {

        return;

    }


    try {

        let url;


        // ========================================
        // BUILD DELETE URL
        // ========================================

        if (type === "id") {

            url =
                `/students/${encodeURIComponent(value)}`;

        }

        else if (type === "name") {

            url =
                `/students/search/name/${encodeURIComponent(value)}`;

        }

        else if (type === "age") {

            url =
                `/students/search/age/${encodeURIComponent(value)}`;

        }

        else if (type === "course") {

            url =
                `/students/search/course/${encodeURIComponent(value)}`;

        }

        else if (type === "email") {

            url =
                `/students/search/email/${encodeURIComponent(value)}`;

        }


        // ========================================
        // SEND DELETE REQUEST
        // ========================================

        const response = await fetch(url, {

            method: "DELETE"

        });


        // Convert response to JSON
        const data = await response.json();


        // ========================================
        // SUCCESS
        // ========================================

        if (response.ok) {

            showMessage(
                "success",
                data.message
            );


            // Clear input
            document.getElementById(
                "deleteValue"
            ).value = "";


            // Refresh table
            loadStudents();

        }


        // ========================================
        // ERROR
        // ========================================

        else {

            showMessage(
                "error",
                data.message ||
                "Student could not be deleted."
            );

        }


    } catch (error) {

        console.error(
            "DELETE ERROR:",
            error
        );


        showMessage(
            "error",
            "Could not connect to the server."
        );

    }

}


// ========================================
// DELETE ALL STUDENTS
// ========================================

async function deleteAllStudents() {


    const confirmed = confirm(

        "WARNING!\n\n" +

        "This will permanently delete ALL students.\n\n" +

        "Are you sure you want to continue?"

    );


    if (!confirmed) {

        return;

    }


    // Second confirmation
    const secondConfirm = confirm(

        "FINAL CONFIRMATION:\n\n" +

        "Delete ALL student records?"

    );


    if (!secondConfirm) {

        return;

    }


    try {


        // ========================================
        // SEND DELETE REQUEST
        // ========================================

        const response = await fetch(
            "/students",
            {
                method: "DELETE"
            }
        );


        // Convert response to JSON
        const data = await response.json();


        // ========================================
        // SUCCESS
        // ========================================

        if (response.ok) {

            showMessage(
                "success",
                data.message
            );

            loadStudents();

        }


        // ========================================
        // ERROR
        // ========================================

        else {

            showMessage(
                "error",
                data.message
            );

        }


    } catch (error) {

        console.error(
            "DELETE ALL ERROR:",
            error
        );


        showMessage(
            "error",
            "Could not connect to the server."
        );

    }

}


// ========================================
// LOAD ALL STUDENTS
// ========================================

async function loadStudents() {

    try {

        const response =
            await fetch("/students");


        const students =
            await response.json();


        // Check if there are no students
        if (
            !response.ok ||
            students.length === 0
        ) {

            document.getElementById(
                "studentTable"
            ).innerHTML = `

                <div class="empty">
                    No student records found.
                </div>

            `;

            return;

        }


        // ========================================
        // CREATE TABLE
        // ========================================

        let html = `

            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Age</th>

                        <th>Course</th>

                        <th>Email</th>

                    </tr>

                </thead>

                <tbody>

        `;


        // Add students
        students.forEach(student => {

            html += `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.age}</td>

                    <td>${student.course}</td>

                    <td>${student.email}</td>

                </tr>

            `;

        });


        html += `

                </tbody>

            </table>

        `;


        document.getElementById(
            "studentTable"
        ).innerHTML = html;


    } catch (error) {

        console.error(
            "LOAD STUDENTS ERROR:",
            error
        );


        document.getElementById(
            "studentTable"
        ).innerHTML = `

            <div class="empty">
                Could not load student records.
            </div>

        `;

    }

}


// ========================================
// SHOW MESSAGE
// ========================================

function showMessage(type, text) {

    const message =
        document.getElementById("message");


    message.textContent = text;


    message.className =
        `message ${type}`;

}