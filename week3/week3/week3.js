//the main function must occur after the page is loaded, hence being inside the wondow.onload event handler.
window.onload = function(){
    var mainForm = document.getElementById("mainForm");
    //all inputs with the class required are looped through 
    var requiredInputs = document.querySelectorAll(".required");
	var x = document.getElementById("tee");


    for (var i=0; i < requiredInputs.length; i++){

		requiredInputs[i].onfocus = function(){
	    this.style.fontWeight = "bold";
	    this.style.backgroundColor = "green";
		x.style.backgroundColor = "white";
		}

		requiredInputs[i].onblur = function(){
			//TODO, 
			//highlight an error if no value
			this.style.fontWeight = "normal";
			this.style.backgroundColor = "red";
			// find parent
			x.style.backgroundColor = "red";
			x.style.fontWeight = "bold";
			// HOW TO CHANGE COLOUR
			// x.style.fontColor = "white";

		}
    }

    //on submitting the form, "empty" checks are performed on required inputs.
    mainForm.onsubmit = function(e){
		//TODO, perform empty checks
		if( document.getElementById('checkbox').checked && document.getElementById("title").value ){
			alert("Thanks for submitting");
		}else{
			alert("Please try again");
			e.preventDefault();
		}

		
    }
}
