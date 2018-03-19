// Show up to ten students per page based on the page number
// Requires page number and student list as parameters
function showPage(pageNumber, list) {
	// Calculate the length of the list
	let studentCount = list.children.length;

	// Hide all students on the page
	for (let index = 0; index < studentCount; index++) {
		list.children[index].style.display = "none";
	}
	
	// Calculate range of students to display
	let upperBound = pageNumber * 10;
	let lowerBound = upperBound - 10;
	if(upperBound > studentCount) {
		upperBound = studentCount;
	}
	
	// Display students for this page
	for (var index = lowerBound; index < upperBound; index++) {
		list.children[index].style.display = "block";
	}
}

// Creates a list of all page links, requires student list as a parameter
function appendPageLinks(list) {
	// Calculate the length of the list
	let studentCount = list.children.length;

	// Calculate number of required Page Links
	// If there is a remainder when dividing by ten, then add one to the page count, otherwise don't
	const links = (studentCount % 10) ? parseInt(studentCount / 10) + 1 : parseInt(studentCount / 10);

	// Build pagination links
	let div = document.createElement('div');
	div.className = "pagination";
	let ul = document.createElement('ul');
	for (let index = 1; index <= links; index++) {
		let li = document.createElement('li');
		let a = document.createElement('a');
		a.href = "#";
		a.textContent = index;
		// Always setting index one as active by default
		if(index === 1) {
			a.className = "active";
		}
		li.appendChild(a);
		ul.appendChild(li);
	}
	div.appendChild(ul);

	// If pagination links already exist, then delete them
	let pagination = document.querySelector(".pagination");
	if(pagination !== null) {
		pagination.parentNode.removeChild(pagination);
	}

	// Add pagination links
	let studentPage = document.querySelector(".page");
	studentPage.appendChild(div);

	// Use click events to call the showPage function with a page number
	pagination = document.querySelector(".pagination");
	pagination.addEventListener('click', (event) => {
		// Make sure an anchor tag was clicked
		if(event.target.tagName == 'A') {
			// Capture the page number text from the anchor tag
			let pageNumber = event.target.textContent;
			// Update the student list to the new page index
			showPage(pageNumber, list);
			
			// Remove active status of old link
			let anchor = pagination.getElementsByClassName("active");
			anchor[0].className = anchor[0].className.replace("active", "");
			// Set link status as active
			event.target.className = "active";
		}
	});
}

// Build and attach a searchbox to the top of the page
function buildSearchBox() {
	// Build an input and search button 
	let div = document.createElement('div');
	div.className = "student-search";
	let input = document.createElement('input');
	input.placeholder="Search for students...";
	div.appendChild(input);
	let button = document.createElement('button');
	button.textContent = "Search";
	div.appendChild(button);
	
	// Attach to page-header div
	let pageHeader = document.querySelector(".page-header");
	pageHeader.appendChild(div);
	
	// Add event listener for the button to call the searchList function
	button.addEventListener('click', searchList);
}

// Search function to retrieve student list based on search parameters
function searchList() {
}

// Render the Students Page
function renderPaginationFilter() {
	let studentList = document.querySelector(".student-list");
	buildSearchBox();
	showPage(1, studentList);
	appendPageLinks(studentList);
}

renderPaginationFilter();
