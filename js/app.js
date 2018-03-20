const studentList = document.querySelector(".student-list").children;

// Show up to ten students per page based on the page number
// Requires page number and student list as parameters
function showPage(pageNumber, list) {
	// Calculate the length of the list
	let studentCount = list.length;

	// Hide all students on the page
	for (let index = 0; index < studentCount; index++) {
		list[index].style.display = "none";
	}
	
	// Calculate range of students to display
	let upperBound = pageNumber * 10;
	let lowerBound = upperBound - 10;
	if(upperBound > studentCount) {
		upperBound = studentCount;
	}
	
	// Display students for this page
	for (var index = lowerBound; index < upperBound; index++) {
		list[index].style.display = "block";
	}
}

// Creates a list of all page links, requires student list as a parameter
function appendPageLinks(list) {
	// Calculate the length of the list
	let studentCount = list.length;

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

	// Add pagination links
	removePaginationLinks();
	let studentPage = document.querySelector(".page");
	studentPage.appendChild(div);

	// Use click events to call the showPage function with a page number
	let pagination = document.querySelector(".pagination");
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

// Remove old pagination links if they exist
function removePaginationLinks() {
	// If pagination links already exist, then delete them
	let pagination = document.querySelector(".pagination");
	if(pagination !== null) {
		pagination.parentNode.removeChild(pagination);
	}
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
	
	// Create a message element
	let message = document.createElement('h4');
	message.className = "search-message";
	div.append(message);
}

// Search function to retrieve student list based on search parameters
function searchList() {
	// Get the search value in lowercase
	let searchValue = document.getElementsByTagName('input')[0].value.toLowerCase();
	// Remove the pagination links
	removePaginationLinks();
		
	// Hide all students on the page
	for (let index = 0; index < studentList.length; index++) {
		studentList[index].style.display = "none";
	}

	let matches = [];
	// Test all students on the page for search match
	for (let index = 0; index < studentList.length; index++) {
		// Capture h3 element
		let h3Text = studentList[index].getElementsByTagName("h3")[0].innerHTML.toLowerCase();
		// Capture span element
		let spanText = studentList[index].getElementsByTagName("span")[0].innerHTML.toLowerCase();
		
		// Test if elements contain text from search field
		if(h3Text.indexOf(searchValue) > -1 || spanText.indexOf(searchValue) > -1) {
			matches.push(studentList[index]);
		} 
	}

	// Message for number of students found
	let searchMessage = document.querySelector('.search-message');
	if(matches.length === 0) {
		searchMessage.textContent = "Sorry, no students were found";
	} else {
		searchMessage.textContent = matches.length + " students found";
	}
	if(matches.length > 10) {
		appendPageLinks(matches);
	}
	showPage(1, matches);
	searchValue.value = "";
	
}

// Render the pagination filter content
function renderPaginationFilter(list) {
	buildSearchBox();
	showPage(1, list);
	appendPageLinks(list);
}

renderPaginationFilter(studentList);
