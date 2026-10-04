document.addEventListener("DOMContentLoaded", function () {

    // Cursor shifting
    const fields = document.querySelectorAll(
        'input, select, textarea, button'
    );

    fields.forEach((field, index) => {

        field.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                if (index + 1 < fields.length) {
                    fields[index + 1].focus();
                }

            }

        });

    });


    // Get elements
    const submitBtn = document.getElementById("submitBtn");
    const complaints = document.getElementById("complaints");
    const problemImage = document.getElementById("problemImage");
    const imagePreview = document.getElementById("imagePreview");

    let selectedImage = "";


    // =========================
    // IMAGE PREVIEW
    // =========================

    problemImage.addEventListener("change", function () {

        const file = this.files[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = function (event) {

                selectedImage = event.target.result;

                imagePreview.src = selectedImage;
                imagePreview.style.display = "block";

            };

            reader.readAsDataURL(file);

        }

    });


    // =========================
    // LOAD SAVED COMPLAINTS
    // =========================

    let savedComplaints = JSON.parse(
        localStorage.getItem("complaints")
    ) || [];


    // =========================
    // DISPLAY COMPLAINTS
    // =========================

    function displayComplaints() {

        complaints.innerHTML = "";

        savedComplaints.forEach(function (complaint) {

            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${complaint.category}</h3>

                <p>
                    <strong>Location:</strong>
                    ${complaint.location}
                </p>

                <p>
                    <strong>Problem:</strong>
                    ${complaint.problem}
                </p>

                ${
                    complaint.image
                    ? `
                        <p><strong>Attached Photo:</strong></p>
                        <img
                            src="${complaint.image}"
                            style="
                                max-width: 300px;
                                width: 100%;
                                border-radius: 10px;
                                margin-bottom: 10px;
                            "
                        >
                    `
                    : ""
                }

                <p>
                    <strong>Reported by:</strong>
                    ${complaint.name}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${complaint.status}
                </p>
            `;

            complaints.appendChild(card);

        });

    }


    // Display old complaints when page opens
    displayComplaints();


    // =========================
    // SUBMIT PROBLEM
    // =========================

    submitBtn.addEventListener("click", function () {

        const name =
            document.getElementById("name").value;

        const location =
            document.getElementById("location").value;

        const category =
            document.getElementById("category").value;

        const problem =
            document.getElementById("problem").value;


        // Create complaint object
        const newComplaint = {

            name: name,

            location: location,

            category: category,

            problem: problem,

            image: selectedImage,

            status: "Pending"

        };


        // Add complaint to array
        savedComplaints.push(newComplaint);


        // Save in localStorage
        localStorage.setItem(
            "complaints",
            JSON.stringify(savedComplaints)
        );


        // Display complaints
        displayComplaints();


        alert("Problem submitted successfully!");


        // =========================
        // CLEAR FORM
        // =========================

        document.getElementById("name").value = "";

        document.getElementById("location").value = "";

        document.getElementById("category").value = "None";

        document.getElementById("problem").value = "";

        problemImage.value = "";

        selectedImage = "";

        imagePreview.src = "";

        imagePreview.style.display = "none";

    });

});