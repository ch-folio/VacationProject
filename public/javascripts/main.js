let vacayArray = [];


// define a constructor to create vacation objects
let VacationObject = function (pID, pCity, pState, pCountry, pType, pVideo) {
    this.ID = pID;
    this.City = pCity;
    this.State = pState;
    this.Country = pCountry;
    this.ID = vacayArray.length +1;
    this.Type = pType;
    this.Video = pVideo;
}

// vacayArray.push(new VacationObject("1", "Seattle", "Washington", "USA", "Resort","https://www.earthcam.com/usa/washington/seattle/?cam=seattleskyline"));
// vacayArray.push(new VacationObject("2", "London", "England", "UK", "Museum/historical site","https://www.earthcam.com/world/england/london/abbeyroad/?cam=abbeyroad_uk"));
// vacayArray.push(new VacationObject("3", "Sedona", "Arizona", "USA","Shopping site","https://www.earthcam.com/usa/arizona/sedona/?cam=sedona_gateway"));
// vacayArray.push(new VacationObject("4", "Toronto", "Ontario", "Canada","Undetermined","https://www.earthcam.com/world/canada/toronto/cntower/?cam=cntower1"));


let selectedType = "not selected";

document.addEventListener("DOMContentLoaded", function () {

    createList();

    // add button events ***********************************************************************************
   
    document.getElementById("buttonAdd").addEventListener("click", function () {
       
     let newID = Math.random().toString(16).slice(5) 
 
     let newVacation = new VacationObject( newID, document.getElementById("city").value, document.getElementById("state").value, document.getElementById("country").value, selectedType);

        $.ajax({
            url : '/AddVacation',
            type: "POST",
            data: JSON.stringify(newVacation),
            contentType: "application/json; charset=utf-8",
             success: function (result) {
                console.log(result);
            } 
            
        })
    });
    
        
        document.getElementById("buttonClear").addEventListener("click", function () {
            document.getElementById("city").value = "";
            document.getElementById("state").value = "";
            document.getElementById("country").value = "";
        });

        $(document).bind("change", "#select-type", function (event, ui) {
            selectedType = $('#select-type').val();
        });

        document.getElementById("buttonSortCity").addEventListener("click", function () {
            vacayArray.sort(dynamicSort("City")); 
            createList();
            document.location.href = "index.html#ListAll";

        });

        document.getElementById("buttonSortState").addEventListener("click", function () {
            vacayArray.sort(dynamicSort("State"));
            createList();
            document.location.href = "index.html#ListAll";

        });
        
        document.getElementById("buttonSortCountry").addEventListener("click", function () {
            vacayArray.sort(dynamicSort("Country"));
            createList();
            document.location.href = "index.html#ListAll";

        }); 


        //button on details page to view the live EarthCam 

        document.getElementById("eCam").addEventListener("click", function () {
            window.open(document.getElementById("oneVideo").innerHTML);

        });
        // end of add button events ******************************************************************


        // page before show code *********************************************************************

        $(document).on("pagebeforeshow", "#ListAll", function (event) {
            createList();
        });

        
        
        // need one for details page to fill in the info based on the passed in ID

    $(document).on("pagebeforeshow", "#details", function (event) {
        let localID = localStorage.getItem('parm');

        //force the vacation array to be current
        vacayArray = JSON.parse(localStorage.getItem('vacayArray'));

        document.getElementById("oneCity").innerHTML = "The city is: " + vacayArray[localID - 1].City;
        document.getElementById("oneState").innerHTML = "The state is: " + vacayArray[localID - 1].State;
        document.getElementById("oneCountry").innerHTML = "The country is: " + vacayArray[localID - 1].Country;
        document.getElementById("oneType").innerHTML = "Destination type: " + vacayArray[localID - 1].Type;
        document.getElementById("oneVideo").innerHTML = vacayArray[localID - 1].Video;
    });  
    
});

//end of code that must wait until document has loaded event

  //end of page before show code


    function createList() {
        //clear prior data
        var divVacationList = document.getElementById("divVacationList");
        while (divVacationList.firstChild) {  //remove any old data so don't get duplicates
            divVacationList.removeChild(divVacationList.firstChild);
        };

        var myul = document.createElement('ul');


        vacayArray.forEach(function (oneVacay,) {
            var myLi = document.createElement('li');
            myLi.classList.add('oneVacay');
            myLi.setAttribute("data-parm", oneVacay.ID);
            myLi.innerHTML = oneVacay.ID + ":  " + oneVacay.City + ", " + oneVacay.State + ", " + oneVacay.Country + ",  "  + oneVacay.Type;
            myul.appendChild(myLi);
        });
        divVacationList.appendChild(myul)

        var liList = document.getElementsByClassName("oneVacay");
        Array.from(liList).forEach(function (element) {
            element.addEventListener('click', function () {
                var parm = this.getAttribute("data-parm");
                localStorage.setItem('parm', parm);

                let stringVacayArray = JSON.stringify(vacayArray);
                localStorage.setItem('vacayArray', stringVacayArray);
                document.location.href = "index.html#details";
            });
           
        });
    };
        
    

        function dynamicSort(property) {
            var sortOrder = 1;
    
            if (property[0] === "-") {
                sortOrder = -1;
                property.property.substr(1);
            }
    
                return function (a, b) {
                    if (sortOrder == -1) {
                        return b[property].localeCompare(a[property]);
                    } else {
                        return a[property].localeCompare(b[property]);
                    }
                }
            }
            $.get("/getAllvacayArray", function(data, status){  // AJAX get
                vacayArray = data;  // put the returned server json data into our local array
            })
   