//Problem: Cannot search or page through students
//Solution: Using progressive enhancement, add a search function and a pagination function

//Gather the students array
var students = document.getElementsByClassName("student-item");
//Gather the number of student-details list items in the page
var numOfStudents = students.length;
//Calculate how many pages there are by figuring out the length and dividing it by 10
var studentPages = Math.ceil(numOfStudents / 10);

//Create a function that hides all students
function hideAllStudents() {
    for (var i = 0; i < students.length; i ++) {
        if (students[i]){
        students[i].style.display = 'none';
        }
    }
}
//Create a function that shows and hides students
function showStudents(numToShowFrom, numToShowTo) {
    hideAllStudents();
    //then show specific students
    for (var i = numToShowFrom; i < numToShowTo; i ++) {
        if (students[i]){
        students[i].style.display = 'block';
        }
    }   
}
//Hide all records except for the first 10 onload
showStudents(0,10);

//Create a pagination div
var paginationDiv = document.createElement("DIV");
var pageDiv = document.getElementsByClassName("page")[0];
pageDiv.appendChild(paginationDiv);
paginationDiv.className = "pagination";
//Create the pagination ul
var paginationUl = document.createElement("UL");
paginationDiv.appendChild(paginationUl);
//Create the correct number of li items
for (var i = 1; i <= studentPages; i++) {
    //Populate the li items with the page numbers
    var el = document.createElement("LI");
    paginationUl.appendChild(el);
    el.innerHTML = "<a href=# id=" + i + ">" + i + "</a>";
}
//Write a function that delivers 10 at a time based on the page numbers
function deliverPaginatedResults(pageNum) {
    var fromNumber = pageNum * 10 - 10 + 1;
    var toNumber = pageNum * 10;
    if (pageNum == 1) {
        showStudents(0,10);
    } else {
        showStudents(fromNumber, toNumber);
    }
}

//Trigger the page switching function whenever we click a specific anchor with a specific id
paginationDiv.children[0].addEventListener("click", function (e){
        deliverPaginatedResults(e.target.id);
});

//Find the student's record containing the name
function searchStudents(){
    //Hide all of the li items in the student-list
    hideAllStudents();
    var searchBox = document.getElementById("search-input");
    var searchValue = searchBox.value.toLowerCase();
    var details = []
    //Search the li item to find the record either by name or email address - make sure it is case insensitive
    //populate the details array to make sure we're just searching the right fields
    for (var i = 1; i < students.length; i++) {
        var detailsDiv = students[i].children[0];
        details.push(detailsDiv.children[1]);
        details.push(detailsDiv.children[2]);
    }
    //loop over that array, and look for the search value
    for (var i = 0; i < details.length; i++) {
     if (details[i].textContent.includes(searchValue)) {
         var detailDiv = details[i].parentElement;
         var studentLi = detailDiv.parentElement;
         //Show the li 
         studentLi.style.display = "block";
        } 
    }
   
    
    //if the number of li items returned is more than 10 results paginate them
}

//Create a function that adds the search input and button to the page
function addSearchDiv(){
    //Get the parent div
    var pageHeader = document.getElementsByClassName("page-header")[0];
    //Assemble the search div
    var searchDiv = document.createElement("DIV");
    searchDiv.className = "student-search";
    //Assemble the search input
    var searchInput = document.createElement("INPUT");
    searchInput.id = "search-input";
    searchInput.type = "text";
    searchInput.placeholder = "Search for students....";
    //Assemble the button
    var searchButton = document.createElement("BUTTON");
    searchButton.innerHTML = "Search";
    //Append them to the first div with the class of page-header
    pageHeader.appendChild(searchDiv);
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
    searchButton.addEventListener("click", searchStudents);
}

addSearchDiv();



    

//EXCEEDS ITEMS
//Include simple animations when transitioning between pages.
//As the user types in the search box, dynamically filter the student listings as you type (using onchange)
//If no matches are found, include a message in the HTML to tell the user there are no matches.
