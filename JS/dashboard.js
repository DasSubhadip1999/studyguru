

//dom elements
const username = $(".name");
const icon = $(".icon");
const createAssignment = $("article");


createAssignment.hide();

let deleteCount;


let loginType = JSON.parse(localStorage.getItem("usertype"));
let hideOnStudent = (d) => {
    d.hide();
    createAssignment.hide();
}

let showOnTeacher = (d) => {
    d.show();
    createAssignment.show();
}

//create assignments
const assignmentContainer = $(".assignments-details");


//storing assignments to local storage
let storeAssignments = JSON.parse(localStorage.getItem("assignments")) || [];

//variables for assignments
let innerHtml = ``;

let assignmentCount = () => {
    let count = 0;
    for (let value of storeAssignments) {
        if( value != null) {
            count++;
        }
    }
    let assignmentCount = count;
    $("#count").text(assignmentCount);
}

assignmentCount();
//function to update assignments to dom
let updateAssignmentstoDom = () => {
    storeAssignments.forEach( (as) => {
        if(as != null) {
            innerHtml += as.assignmentTemplate;
        }
    })
    assignmentContainer.html(innerHtml);
}

updateAssignmentstoDom();

//assignment template
let makeEachAssignment = (h,s,d,m,i) => {
    deleteCount = storeAssignments.length;
    let assignmentTemplate = `
    <div class="chapters">
        <div class="chapter-icon">
            <img src=${i} alt="">
        </div>
        <div class="main-chapter-body">
            <h4>${h}</h4>
            <p>${s}</p>
            <button class="delete" id=${deleteCount} >Delete</button>
        </div>
        <div class="date-comment">
            <p><span>${d}<span/>&nbsp;<span>${m}<span/></p>
            <p>Comments(5)</p>
        </div>
    </div>
 `
 storeAssignments.push({assignmentTemplate});
 localStorage.setItem("assignments", JSON.stringify(storeAssignments));
 innerHtml += assignmentTemplate;
 assignmentContainer.html(innerHtml);
}

//get assignment data from form
const subjectType = $("#sub-type");
const asHeading = $(".as-heading input");
const asSubheading = $(".as-subheading input");
const dateObj = new Date();
const date = dateObj.getDate();
const month = dateObj.getMonth();

let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

let imageLinks = {
    Biology : "https://thumbs.dreamstime.com/b/biology-hand-drawn-doodles-lettering-education-science-vector-white-background-135246167.jpg",
    English : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy7D3MjcqxdmUzdEBwzKS4NRouYhFjVOuhfLdm6QILb6H2FBESywkvsJdJ5h9h8Hl6z3k&usqp=CAU",
    History : "https://img.freepik.com/free-vector/traditional-indian-symbols-form-india-map-template_1284-52171.jpg?size=338&ext=jpg",
    Mathematics : "https://img.freepik.com/free-psd/top-view-numbers-rulers-mathematics_23-2148458903.jpg?w=900&t=st=1660836190~exp=1660836790~hmac=0d1f9ca74a50b0b1e6d04ab8c4895dffffa50cd73d6c3fca0c0c4e6950ed46f3"
}


$("#form").submit( (e) => {
    e.preventDefault();
    let heading = asHeading.val();
    let subhead = asSubheading.val();
    if(subhead.length && heading.length) {
        let img = imageLinks[`${subjectType.val()}`]
        makeEachAssignment(heading,subhead,date,monthArr[month],img);
        $("#form").trigger("reset");
        deleteFunc();
        assignmentCount();
    }else{
        alert("Please fill all details")
    }
})

//deleting assignments
let deleteFunc = () => {
    let deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach( (btn) => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.remove();
            let idx = btn.getAttribute("id");
            delete storeAssignments[idx];
            localStorage.removeItem("assignments");
            localStorage.setItem("assignments", JSON.stringify(storeAssignments));
            assignmentCount();
        });
    })
}

deleteFunc();


if(loginType != undefined) {
    if(loginType.user == "Student") {
        icon.text(loginType.em[0])
        username.text(loginType.em.slice(0,11));
        let deleteBtn = $(".main-chapter-body button");
        hideOnStudent(deleteBtn);
    }else if(loginType.user =="Teacher") {
        icon.text(loginType.em[0])
        username.text(loginType.em);
        let deleteBtn = $(".main-chapter-body button");
        showOnTeacher(deleteBtn);
    }
}
    

//log out button
const logOut = $(".fa-right-from-bracket");

logOut.click( () => {
    location.href = "index.html";
    localStorage.removeItem("usertype");
})

//hide and show subject details on click
const subjectDetails = $(".subject-details");
const subjectHideBtn = $(".about .fa-angle-up");


subjectHideBtn.click( () => {
    subjectDetails.toggleClass("hide");
    subjectHideBtn.toggleClass("rotate");
    assignmentContainer.toggleClass("height");
})