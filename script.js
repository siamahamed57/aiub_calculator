let allCourseData = []; // Array to store all course data

function calculateCGPA() {
    // Get references to form elements
    const courseName = document.getElementById('course-name').value;
    const credit = parseFloat(document.getElementById('credit').value);
    const grade = parseFloat(document.getElementById('grade').value);
    const result = document.getElementById('result');

    // Validate input
    if (!isNaN(credit) && !isNaN(grade) && courseName.trim() !== '') {
        let totalCredits = 0;
        let totalPoints = 0;
        let duplicateFound = false; // Flag to indicate if duplicate course name is found

        // Check for duplicate course name
        allCourseData.forEach(function(course) {
            if (course.name.toLowerCase() === courseName.toLowerCase()) {
                duplicateFound = true;
            }
        });

        if (duplicateFound) {
            alert("Course '" + courseName + "' was already added.");
            return;
        }

        // Calculate cumulative values considering existing courses
        allCourseData.forEach(function(course) {
            totalCredits += course.credit;
            totalPoints += course.credit * course.grade;
        });

        // Update total values with new course
        totalCredits += credit;
        totalPoints += credit * grade;

        // Add new course data to allCourseData
        allCourseData.push({ name: courseName, credit: credit, grade: grade });

        // Calculate CGPA
        const cgpa = totalPoints / totalCredits;

        // Clear previous results and update with new calculations
        result.innerHTML = "";
        result.innerHTML += "<p>Your Total Credit Hours: " + totalCredits.toFixed(2) + "</p>";
        result.innerHTML += "<p>Your CGPA: " + cgpa.toFixed(2) + "</p>";

        // Create and populate the table
        const table = document.createElement('table');
        const tableHead = document.createElement('thead');
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = "<th>Course Name</th><th>Credit Hours</th><th>Grade</th>";
        tableHead.appendChild(tableRow);
        table.appendChild(tableHead);

        const tableBody = document.createElement('tbody');
        allCourseData.forEach(function(course) {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = "<td>" + course.name + "</td><td>" + course.credit + "</td><td>" + course.grade + "</td>";
            tableBody.appendChild(tableRow);
        });
        table.appendChild(tableBody);

        result.appendChild(table);

        // Clear input fields for new entries
        document.getElementById('course-name').value = '';
        document.getElementById('grade').value = '';
    } else {
        alert("Please enter valid course name, credit hours, and grade.");
    }
}
