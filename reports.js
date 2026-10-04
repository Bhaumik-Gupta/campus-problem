document.addEventListener("DOMContentLoaded", function () {

    const reportsContainer =
        document.getElementById("reportsContainer");


    // Get complaints from localStorage

    let savedComplaints = JSON.parse(
        localStorage.getItem("complaints")
    ) || [];


    // =========================
    // DISPLAY REPORTS
    // =========================

    function displayReports() {

        reportsContainer.innerHTML = "";


        // If there are no reports

        if (savedComplaints.length === 0) {

            reportsContainer.innerHTML = `
                <div class="no-reports">

                    <h2>No Reports Yet</h2>

                    <p>
                        No campus problems have been reported yet.
                    </p>

                </div>
            `;

            return;
        }


        // Display every report

        savedComplaints.forEach(function (complaint, index) {

            const card =
                document.createElement("div");

            card.className = "report-card";


            // Status class

            let statusClass = "pending";

            if (complaint.status === "In Progress") {
                statusClass = "progress";
            }

            if (complaint.status === "Resolved") {
                statusClass = "resolved";
            }


            // Image

            let imageHTML = "";

            if (complaint.image) {

                imageHTML = `
                    <img
                        src="${complaint.image}"
                        class="report-image"
                        alt="Problem photo"
                    >
                `;

            }


            // Create card

            card.innerHTML = `

                <div class="report-top">

                    <h2>
                        ${complaint.category}
                    </h2>

                    <span class="status ${statusClass}">
                        ${complaint.status}
                    </span>

                </div>


                <div class="report-info">

                    <p>
                        <strong>Location:</strong>
                        ${complaint.location}
                    </p>

                    <p>
                        <strong>Problem:</strong>
                        ${complaint.problem}
                    </p>

                </div>


                ${imageHTML}


                <div class="report-footer">

                    <strong>Reported by:</strong>
                    ${complaint.name}

                </div>

            `;


            reportsContainer.appendChild(card);

        });

    }


    // Display reports when page opens

    displayReports();

});