document.addEventListener("DOMContentLoaded", function () {

    const adminComplaints = document.getElementById("adminComplaints");

    // Get complaints from localStorage
    let savedComplaints = JSON.parse(
        localStorage.getItem("complaints")
    ) || [];


    // Display statistics
    function updateStats() {

        const total = savedComplaints.length;

        const pending = savedComplaints.filter(function (complaint) {
            return complaint.status === "Pending";
        }).length;

        const inProgress = savedComplaints.filter(function (complaint) {
            return complaint.status === "In Progress";
        }).length;

        const resolved = savedComplaints.filter(function (complaint) {
            return complaint.status === "Resolved";
        }).length;


        document.getElementById("totalCount").textContent = total;
        document.getElementById("pendingCount").textContent = pending;
        document.getElementById("progressCount").textContent = inProgress;
        document.getElementById("resolvedCount").textContent = resolved;

    }


    // Display complaints
    function displayComplaints() {

        adminComplaints.innerHTML = "";

        savedComplaints.forEach(function (complaint, index) {

            const card = document.createElement("div");

            card.className = "admin-card";

            card.innerHTML = `
                <h2>${complaint.category}</h2>

                <p>
                    <strong>Location:</strong>
                    ${complaint.location}
                </p>

                <p>
                    <strong>Problem:</strong>
                    ${complaint.problem}
                </p>

                <p>
                    <strong>Reported by:</strong>
                    ${complaint.name}
                </p>

                <p>
                    <strong>Status:</strong>
                </p>

                <select class="statusSelect" data-index="${index}">

                    <option value="Pending"
                        ${complaint.status === "Pending" ? "selected" : ""}>
                        Pending
                    </option>

                    <option value="In Progress"
                        ${complaint.status === "In Progress" ? "selected" : ""}>
                        In Progress
                    </option>

                    <option value="Resolved"
                        ${complaint.status === "Resolved" ? "selected" : ""}>
                        Resolved
                    </option>

                </select>

                ${
                    complaint.status === "Resolved"
                    ? `<button class="deleteBtn" data-index="${index}">
                            🗑 Delete Resolved Problem
                       </button>`
                    : ""
                }
            `;

            adminComplaints.appendChild(card);

        });


        // Status change
        const statusSelects =
            document.querySelectorAll(".statusSelect");


        statusSelects.forEach(function (select) {

            select.addEventListener("change", function () {

                const index = this.getAttribute("data-index");

                savedComplaints[index].status = this.value;


                // Save updated status
                localStorage.setItem(
                    "complaints",
                    JSON.stringify(savedComplaints)
                );


                // Update statistics
                updateStats();

                // Refresh cards so delete button appears/disappears
                displayComplaints();

                alert("Status updated successfully!");

            });

        });


        // Delete resolved problem
        const deleteButtons =
            document.querySelectorAll(".deleteBtn");


        deleteButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index = this.getAttribute("data-index");


                // Safety check
                if (savedComplaints[index].status !== "Resolved") {

                    alert("Only resolved problems can be deleted.");

                    return;

                }


                // Confirmation
                const confirmDelete = confirm(
                    "Are you sure you want to delete this resolved problem?"
                );


                if (confirmDelete) {

                    // Remove complaint
                    savedComplaints.splice(index, 1);


                    // Save updated complaints
                    localStorage.setItem(
                        "complaints",
                        JSON.stringify(savedComplaints)
                    );


                    // Update dashboard
                    updateStats();
                    displayComplaints();


                    alert("Resolved problem deleted successfully!");

                }

            });

        });

    }


    // Initial display
    updateStats();
    displayComplaints();

});