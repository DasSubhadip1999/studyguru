//dom elements
const userTypeStudent = $(".student");
const userTypeTeacher = $(".teacher");
const signup = $(".dont-have-account a");
const heading = $(".user + h1");
const subheading = $(".sub-heading");
const forgotPassword = $(".forgot-password");
const loginSignupBtn = $(".btn");
const googleLogin = $(".google p");
const dontAccount = $(".dont-have-account p");
const vectorArt = $(".vector-art img");
const footerCoptwr = $("footer a");



//variables
let isLoginPageActive = true;
let selectedType = null;

//set user type
class userType {
    setUserType (maincolor,bgcolor,othermain,otherbg) {
        userTypeStudent.css({
            "color" : `${maincolor}`,
            "background-color" : `${bgcolor}`
        });
        userTypeTeacher.css({
            "color" : `${othermain}`,
            "background-color" : `${otherbg}`
        });
    }
}

//set user on click
userTypeStudent.click( () => {
    let getStudentUserType = new userType();
    getStudentUserType.setUserType("white", "#7f56da","rgba(0, 0, 0, 0.573)","");
    selectedType = userTypeStudent.text();
})
userTypeTeacher.click( () => {
    let getTeacherUserType = new userType();
    getTeacherUserType.setUserType("rgba(0, 0, 0, 0.573)","","white","#7f56da");
    selectedType = userTypeTeacher.text();
})

//log sign up data change class
class loginSignupData {
 
    updateDataonClick (lg,hd,subhd,lgsbtn,glogin,dontAcc,vcart,ftcopyLink,ftCopyText) {
        signup.text(`${lg}`);
        heading.text(`${hd}`);
        subheading.text(`${subhd}`);
        forgotPassword.hide();
        loginSignupBtn.text(`${lgsbtn}`);
        googleLogin.text(`${glogin}`);
        dontAccount.text(`${dontAcc}`);
        vectorArt.attr("src",`${vcart}`);
        footerCoptwr.attr("src", `${ftcopyLink}`)
        footerCoptwr.text(`${ftCopyText}`);
    }
}

//update sign up/log in page on click
signup.click( () => {
    if(isLoginPageActive) {
        let updateSignup = new loginSignupData();
        updateSignup.updateDataonClick("Log in","Register please","Welcome! Please enter your details","Sign up","Sign up with google","Already have account?", "Media/signup.jpg","https://www.freepik.com/vectors/sign-up","Sign up vector created by storyset - www.freepik.com")
        isLoginPageActive = false;
    }else{
        let updateLogin = new loginSignupData();
        updateLogin.updateDataonClick("Sign up","Welcome back","Welcome back! Please enter your details","Log in","Log in with google","Dont have account?","Media/login.jpg","https://www.freepik.com/vectors/login","Login vector created by storyset - www.freepik.com")
        isLoginPageActive = true;
    }
})


//do a user registration & verify log in
//global variables for student
let studentData = JSON.parse(localStorage.getItem("Student")) || [];
let studentCount = (studentData[studentData.length -1] != undefined) ?  studentData[studentData.length -1]["userCount"] : 0;

//global variables for teacher
let teacherData = JSON.parse(localStorage.getItem("Teacher")) || [];
let teacherCount = (teacherData[teacherData.length - 1] != undefined) ? teacherData[teacherData.length - 1]["userCount"] : 0;



//register users on click
loginSignupBtn.click( () => {
    let email = $(".email input").val();
    let password = $(".password input").val();
    let selectedTypeAlert = false;

    if(selectedType == null) {
        alert("Please select user Type");
        selectedTypeAlert = true;
    }
    if(email.length && password.length) {
        if(selectedType == "Student") {
            let registerEachStudent = new registerUser();
            registerEachStudent.registerEachUser(studentData, studentCount, email,password, selectedType)
        }
         if(selectedType == "Teacher") {
             let registerEachTeacher = new registerUser();
             registerEachTeacher.registerEachUser(teacherData, teacherCount, email, password, selectedType);
        }
    }else if(!selectedTypeAlert){
        alert("Please fill all details")
    }
})

//register user class
class registerUser {
    
    registerEachUser (userType, userCount, email, password, st) {

    if(loginSignupBtn.text() == "Sign up"){
        if( userType.length > 0) {
            let emailMatch = 0;
            userType.forEach( (user) => {
                if(user.email == email) {
                    emailMatch++;
                }
            })
            if(emailMatch == 0) {
                userCount = userType.length + 1;
                this.signupUser(userType, userCount, email,password, st);
            }else{
                alert("This email id already registered")
            }
        }else{
            userCount = userType.length + 1;
            this.signupUser(userType, userCount, email, password, st);
        }
        
    }else if(loginSignupBtn.text() == "Log in" && userType.length > 0) {
        
        let emailPasswordMatch = 0;
        let emailMatch = 0;
        let passwordDontMatch = 0;
        let emailDontMatch = userType.length;
        userType.forEach( (user) => {
           if(user.email == email ) {
                emailMatch++;
                if(user.password == password) {
                    emailPasswordMatch++;
                }else{
                    passwordDontMatch++;
                }
            }else {
                emailDontMatch--;
            }
        })
        if(emailPasswordMatch > 0) {
            //log in success full section
            identifyUser(st,email);
            alert("log in successfull");
            setTimeout(() => {
                location.href = "dashboard.html";
            },400)
        }else if(emailMatch > 0 && passwordDontMatch > 0) {
            alert(`Please check your password`);
        }else if(emailDontMatch == 0) {
            alert(`This email id is not registered`);
        }
    }else {
        alert(`You are not registered yet ${email}`);
    }
  }

  //sign up user 
  signupUser (userType, userCount, email, password,st) {
    if(email.length && password.length) { 
        userType.push({userCount,email,password});
        localStorage.setItem(`${st}`,JSON.stringify(userType));
        $(".email input").val("");
        $(".password input").val("");
        alert(`Sign up successfull ${email}`)
    }
  }
}

//store data to locat storage to identify which login occurs

let identifyUser = (user,em) => {
    localStorage.setItem("usertype", JSON.stringify({user,em}));
}

//show password on click

let password = $(".password input");
let showHidePass = () => {
    if(password.attr("type") == "password") {
        password.attr("type", "text")
    }else{
        password.attr("type", "password")
    }
}
$(".fa-eye").click( () => {
    showHidePass();
    $(".fa-eye").toggleClass("showpass");
})