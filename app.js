// Frontend prototype with Sample Course Data
// NOTE NEEDS TO BE CONNECTED to BACKEND 
const courses = [
    {
        courseId: "CMSC 495",
        title: "Computer Science Capstone",
        section: "6980",
        schedule: "Online",
        capacity: 25,
        enrolled: 18,
        prerequisiteMet: true
    },
    {
        courseId: "CMSC 335",
        title: "Object-Oriented and Concurrent Programming",
        section: "6380",
        schedule: "Online",
        capacity: 20,
        enrolled: 20,
        prerequisiteMet: true
    },
    {
        courseId: "CMSC 345",
        title: "Software Engineering Principles and Techniques",
        section: "6381",
        schedule: "Online",
        capacity: 30,
        enrolled: 12,
        prerequisiteMet: false
    },
    {
        courseId: "CMSC 320",
        title: "Relational Database Concepts and Applications",
        section: "7380",
        schedule: "Online",
        capacity: 50,
        enrolled: 15,
        prerequisiteMet: true
    }
];

let registeredCourses = [];

// Simulated Login
// NOTE NEEDS TO BE CONNECTED to BACKEND authentication

function loginUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;
    const loginMessage = document.getElementById("login-message");

    if (username === "" || password === "") {
        loginMessage.textContent = "Error: Please enter both username and password.";
        loginMessage.className = "message error";
        return;
    }

    document.getElementById("login-section").classList.add("hidden");

    if (role === "student") {
        document.getElementById("student-dashboard").classList.remove("hidden");
        displayCourses(courses);
        updateRegisteredCourses();
    } else {
        document.getElementById("admin-dashboard").classList.remove("hidden");
        displayAdminCourses();
    }
}

// Logout Function Returns User to Login Screen
function logoutUser() {
    document.getElementById("student-dashboard").classList.add("hidden");
    document.getElementById("admin-dashboard").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("login-message").textContent = "";
    document.getElementById("student-message").textContent = "";
}

// Displays Courses on Student Dashboard
function displayCourses(courseArray) {
    const courseList = document.getElementById("course-list");
    courseList.innerHTML = "";

    if (courseArray.length === 0) {
        courseList.innerHTML = "<p>No Courses Found.</p>";
        return;
    }

    courseArray.forEach(course => {
        const seatsAvailable = course.capacity - course.enrolled;

        const courseCard = document.createElement("div");
        courseCard.className = "course-card";

        courseCard.innerHTML = `
            <h4>${course.courseId}: ${course.title}</h4>
            <p><strong>Section:</strong> ${course.section}</p>
            <p><strong>Schedule:</strong> ${course.schedule}</p>
            <p><strong>Seats Available:</strong> ${seatsAvailable}</p>
            <button onclick="enrollCourse('${course.courseId}')">Enroll</button>
            <button onclick="withdrawCourse('${course.courseId}')">Withdraw</button>
        `;

        courseList.appendChild(courseCard);
    });
}

// Search Courses by Title or Course ID
function searchCourses() {
    const searchValue = document.getElementById("course-search").value.toLowerCase();

    const filteredCourses = courses.filter(course =>
        course.courseId.toLowerCase().includes(searchValue) ||
        course.title.toLowerCase().includes(searchValue)
    );

    displayCourses(filteredCourses);
}

// Enrolls Student Into Course if Requirements Met
function enrollCourse(courseId) {
    const course = courses.find(c => c.courseId === courseId);
    const message = document.getElementById("student-message");

    if (!course) {
        showMessage(message, "Course not found.", "error");
        return;
    }

    if (registeredCourses.includes(courseId)) {
        showMessage(message, "Error: You are already registered for this course.", "error");
        return;
    }

    if (!course.prerequisiteMet) {
        showMessage(message, "Registration failed: Prerequisite requirements are not met.", "error");
        return;
    }

    if (course.enrolled >= course.capacity) {
        showMessage(message, "Registration failed: This section is currently full.", "error");
        return;
    }

    course.enrolled++;
    registeredCourses.push(courseId);

    showMessage(message, `Registration complete for ${course.courseId}: ${course.title}.`, "success");

    displayCourses(courses);
    updateRegisteredCourses();
}

// Withdrawal of Student From Course
function withdrawCourse(courseId) {
    const course = courses.find(c => c.courseId === courseId);
    const message = document.getElementById("student-message");

    if (!registeredCourses.includes(courseId)) {
        showMessage(message, "You are not currently registered for this course.", "error");
        return;
    }

    registeredCourses = registeredCourses.filter(id => id !== courseId);
    course.enrolled--;

    showMessage(message, `You have successfully withdrawn from ${course.courseId}: ${course.title}.`, "success");

    displayCourses(courses);
    updateRegisteredCourses();
}

// Updates Student's Registered Course List.
function updateRegisteredCourses() {
    const registeredList = document.getElementById("registered-list");
    registeredList.innerHTML = "";

    if (registeredCourses.length === 0) {
        registeredList.innerHTML = "<li>No registered courses yet.</li>";
        return;
    }

    registeredCourses.forEach(courseId => {
        const course = courses.find(c => c.courseId === courseId);
        const listItem = document.createElement("li");
        listItem.textContent = `${course.courseId}: ${course.title} - Section ${course.section}`;
        registeredList.appendChild(listItem);
    });
}

// Displays Courses in Administrator Dashboard.
function displayAdminCourses() {
    const adminTable = document.getElementById("admin-course-table");
    adminTable.innerHTML = "";

    courses.forEach(course => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${course.courseId}</td>
            <td>${course.title}</td>
            <td>${course.section}</td>
            <td>${course.capacity}</td>
            <td>${course.enrolled}</td>
        `;

        adminTable.appendChild(row);
    });
}

// Helper function Displaying Success/Error messages
function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}`;
}
