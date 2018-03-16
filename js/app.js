const studentList = document.querySelector(".student-list");
const studentCount = studentList.children.length;
const pageLinks = document.querySelector(".pagination");

// Show ten students on a page based on the page number
function showPage(pageNumber) {

	// Hide all students on the page
	for (let index = 0; index < studentCount; index++) {
		studentList.children[index].style.display = "none";
	}
	
	// Calculate range of students to display
	let upperBound = pageNumber * 10;
	let lowerBound = upperBound - 10;
	if(upperBound > studentCount) {
		upperBound = studentCount;
	}
	
	// Display students for this page
	for (var index = lowerBound; index < upperBound; index++) {
		studentList.children[index].style.display = "block";
	}
}

function appendPageLinks() {
	// Calculate number of required Page Links
	// If there is a remainder when dividing by ten, then add one to the page count, otherwise don't
	const links = (studentCount % 10) ? parseInt(studentCount / 10) + 1 : parseInt(studentCount / 10);

	// Build page links
	let html = "";
	html += '<ul>';
	for (let index = 1; index <= links; index++) {
		html += '<li>';
		html += '<a href="#">' + index + '</a>';
		html += '</li>';
	}
	html += '</ul>';

	// Add page links
	pageLinks.innerHTML = html;
	
}

showPage(1);

appendPageLinks();
