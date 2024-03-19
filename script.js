/************************************** logic of loder hide when page content loade ***************************** */
window.addEventListener("load", () =>{
    document.querySelector(".loader").style.display = "none"
});

/************************************** logic of navBottom sticky in top ****************************************** */
let navBottom = document.querySelector(".navBottom");
window.addEventListener("scroll", (event) =>{
    if(window.scrollY >= 55){
        navBottom.style.position = "fixed";
        navBottom.style.top = "-8.5px";
        navBottom.style.left = "0px";
    }else{
        navBottom.style.position = "static";
    }
});

/* ************************************ logic of send form Data on google sheet *************************************************** */
let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let totalInputs = 0;
    let validateNumber = 0;
    let phoneNumber = event.currentTarget.phone.value;
    let submitBtn = document.querySelector("#submitBtn");

    let inputs = document.querySelectorAll("input, select, textarea");
    for(let items of inputs){
        totalInputs++;

        if(items.classList.contains("parsley-success") == true || (items.value != "" && phoneNumber.length == 10)){
            validateNumber ++;
        }else{
            event.currentTarget.reset()
        }
    }

    if(totalInputs == validateNumber){
        submitBtn.innerHTML = "Please Wate...";
        submitBtn.style.background = "green";
        let studentData = new FormData(form);
        let sheetUrl = 'https://script.google.com/macros/s/AKfycbzmGUAzC5odM96eA42OdeibB5-pWCmo3zVFqBp058hRbvBMR0BpEx8bEnyLNHbQ30IWUQ/exec';
        
        fetch(sheetUrl, {
            method: "post",
            body: studentData
        }).then((responce) => responce.text())
        .then((responceText) => {
            submitBtn.innerHTML = "Submit Now"
            submitBtn.style.background = "#035775";
            swal({
                title: "Successfull",
                icon: "success",
            })
        });

        


    }else{
        swal({
            title: "SOMETHING WANT WRONG !",
            text: "Please Fill Write information",
            icon: "warning",
        })
    }

});



