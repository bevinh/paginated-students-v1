//Problem: Cannot search or page through students
//Solution: Using progressive enhancement, add a search function and a pagination function

//Gather the students array
var students = document.getElementsByClassName("student-item");
//Gather the number of student-details list items in the page
var numOfStudents = students.length;
//Calculate how many pages there are by figuring out the length and dividing it by 10
var studentPages = Math.ceil(numOfStudents / 10);


//Create a function that shows and hides students

function showStudents(numToShowFrom, numToShowTo) {
    //hide all students
    for (var i = 0; i < students.length; i ++) {
        if (students[i]){
        students[i].style.display = 'none';
        }
    }
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
    showStudents(fromNumber, toNumber);
}

paginationDiv.children[0].addEventListener("click", function (e){
        deliverPaginatedResults(e.target.id);
});






//Create a function that adds the search bar and button to the page
    //Assemble the search bar
    //Assemble the button
    //Append them to the first div with the class of page-header

//Find the student's record containing the name
    //Hide all of the li items in the student-list
    //Search the li item to find the record either by name or email address - make sure it is case insensitive
    //Show the li 
    //if the number of li items returned is more than 10 results paginate them

//EXCEEDS ITEMS
//Include simple animations when transitioning between pages.
//As the user types in the search box, dynamically filter the student listings as you type (using onchange)
//If no matches are found, include a message in the HTML to tell the user there are no matches.
