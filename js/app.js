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
function showStudents(arrayOfStudents, numToShowFrom, numToShowTo) {
    hideAllStudents();
    //then show specific students
    for (var i = numToShowFrom; i < numToShowTo; i ++) {
        if (arrayOfStudents[i]){
        arrayOfStudents[i].style.display = 'block';
        }
    }   
}
//Hide all records except for the first 10 onload
showStudents(students,0,10);

//Create a pagination div
var paginationDiv = document.createElement("DIV");
function createPaginationDiv(numOfPages){ 
    var pageDiv = document.getElementsByClassName("page")[0];
    pageDiv.appendChild(paginationDiv);
    paginationDiv.className = "pagination";
    //Create the pagination ul
    var paginationUl = document.createElement("UL");
    paginationDiv.appendChild(paginationUl);
    //Create the correct number of li items
    for (var i = 1; i <= numOfPages; i++) {
        //Populate the li items with the page numbers
        var el = document.createElement("LI");
        paginationUl.appendChild(el);
        el.innerHTML = "<a href=# id=" + i + ">" + i + "</a>";
    }
}
//Create initial pagination div
createPaginationDiv(studentPages);
//Write a function that delivers 10 at a time based on the page numbers
function deliverPaginatedResults(studentArray, pageNum) {
    var fromNumber = pageNum * 10 - 10 + 1;
    var toNumber = pageNum * 10;
    if (pageNum == 1) {
        showStudents(studentArray,0,10);
    } else {
        showStudents(studentArray,fromNumber, toNumber);
    }
}

//Trigger the page switching function whenever we click a specific anchor with a specific id
paginationDiv.children[0].addEventListener("click", function (e){
        deliverPaginatedResults(students, e.target.id);
});

//Find the student's record containing the name
function searchStudents(){
    //Hide all of the li items in the student-list
    hideAllStudents();
    var searchBox = document.getElementById("search-input");
    var searchValue = searchBox.value.toLowerCase();
    
    if (searchValue.length === 0) {        
        deliverPaginatedResults(students, 1);
        if (errorMessage) {
            console.log(errorMessage);
            parentUl.removeChild(errorMessage);
        }
    } else {    
    var details = []
    //Search the li item to find the record either by name or email address - make sure it is case insensitive
    //populate the details array to make sure we're just searching the right fields
    for (var i = 0; i < students.length; i++) {
        var detailsDiv = students[i].children[0];
        details.push(detailsDiv.children[1]);
        details.push(detailsDiv.children[2]);
    }
    //loop over that array, and look for the search value and put it's parent element in a new array
    var showCurrentStudents = [];
    for (var i = 0; i < details.length; i++) {
     if (details[i].textContent.includes(searchValue)) {
         var detailDiv = details[i].parentElement;
         var studentLi = detailDiv.parentElement;
         //Show the li 
         if (showCurrentStudents.indexOf(studentLi) > 0){
         }else {
             showCurrentStudents.push(studentLi);
         }
         
        } 
    }
    if (showCurrentStudents.length === 0) {
        var parentUl = document.getElementsByClassName("student-list")[0]; 
        if (document.getElementById("errorID")){
            parentUl.removeChild(errorID);
        }
        var errorMessage = document.createElement("LI");
        errorMessage.id = "errorID";
        errorMessage.innerHTML = "Sorry, no students containing " + searchValue + " were found.";
        parentUl.appendChild(errorMessage);
    }
    //remove and refresh the pagination div with the new showStudents array
        var pageNumbers = document.getElementsByClassName("pagination");
        if (pageNumbers[0]) {
              pageNumbers[0].parentNode.removeChild(pageNumbers[0]);
            //create the new variable
            var studentNewPages = Math.ceil(showCurrentStudents.length / 10);
            if (studentNewPages > 1) {
                createPaginationDiv(studentNewPages);
            }
            showStudents(showCurrentStudents,0, 10);
            paginationDiv.children[0].addEventListener("click", function (e){
            deliverPaginatedResults(showCurrentStudents, e.target.id);
            });
        }
    }
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
    searchInput.addEventListener("keyup", searchStudents);
}

addSearchDiv();



    

//EXCEEDS ITEMS
//Include simple animations when transitioning between pages.
//As the user types in the search box, dynamically filter the student listings as you type (using onchange)
//If no matches are found, include a message in the HTML to tell the user there are no matches.
