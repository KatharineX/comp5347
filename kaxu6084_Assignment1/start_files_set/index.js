const columns = [
  { name: "checkbox", display: "" },
  { name: "img", display: "" },
  { name: "title", display: "Title" },
  { name: "rating", display: "" },
  { name: "authors", display: "Authors" },
  { name: "year", display: "Year" },
  { name: "price", display: "Price" },
  { name: "publisher", display: "Publisher" },
  { name: "category", display: "Category" },
];

var cartValue = 0;
var checkedLength = 0;

function updateCartValue() {
  var checkedBoxes = document.querySelectorAll("input[name=accept]:checked");
  if (checkedBoxes != null) {
    checkedLength = checkedBoxes.length;
    console.log(checkedBoxes.length);
  } 
}

function renderTable(books) {
  var thead = document.getElementById("tableHead");
  var tbody = document.getElementById("tableBody");
  document.getElementById("shoppingCartValue").innerHTML = cartValue;

  var tr = thead.insertRow(-1);
  for (var column of columns) {
    var th = tr.insertCell();
    th.classList.add(`cell-${column.name}`);
    th.innerHTML = column.display;
  }
  var id = 0;
  for (var book of books) {
    var tr = tbody.insertRow();
    for (var column of columns) {
      var td = tr.insertCell();
      switch (column.name) {
        case "checkbox":
          var checkbox = document.createElement("input");
          checkbox.setAttribute("type", "checkbox");
          checkbox.setAttribute("name", "accept");
          checkbox.setAttribute("id", `checkbox-${id}`);
          checkbox.setAttribute("class", "checkbox");
          checkbox.addEventListener("change", () => updateCartValue());
          td.appendChild(checkbox);
          break;

        case "img":
          var image = document.createElement("IMG");
          image.setAttribute("id", `image-${id}`);
          image.src = book[column.name];
          td.appendChild(image);
          break;

        case "rating":
          td.classList.add("cell-rating");
          var rating = book[column.name];

          for (var i = 1; i <= 5; i++) {
            var star = document.createElement("IMG");
            if (i <= rating) {
              star.src = "images/star-16.ico";
              star.setAttribute("id", `star-${id}-${i}`);
              star.setAttribute("class", "star");
              td.appendChild(star);
            } else {
              star.src = "images/outline-star-16.ico";
              star.setAttribute("id", `star-${id}-${i}`);
              star.setAttribute("class", "star");
              td.appendChild(star);
            }
          }
          break;

        default:
          td.setAttribute("id", `${column.name}-${id}`);
          td.setAttribute("class", `cell-${column.name}`);
          td.innerHTML = book[column.name];
          break;
      }
    }
    id++;
  }
}

function createForm(parent) {
  var form = $("<form/>");

  form.append($("<label>").text("CVV Code:"));
  form.append($("<input>").attr("name", "productCode").attr("type", "text"));
  form.append(
    $("<label>")
      .attr("name", "hint")
      .text("The 3-digit CVV code can be found on the back of your bankcard")
  );

  form.append("<br>");

  form.append($("<input>").attr("type", "submit"));

  parent.append(form);
}

function renderCategoryFilter(books) {
  var categories = [];
  var doc = document.getElementById("categoryFilter");
  for (var book of books) {
    var bookCategory = book["category"];
    if (!categories.includes(bookCategory)) {
      categories.push(bookCategory);
      var option = document.createElement("option");
      option.textContent = bookCategory;
      option.innerHTML = bookCategory;
      doc.appendChild(option);
    }
  }
}

// from spec
function getJsonObject(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

function renderData(data) {
  var books = [];
  for (var element of data) {
    var book = {};
    for (var key in element) {
      book[key] = element[key];
    }
    books.push(book);
  }
  renderTable(books, 0);
  renderCategoryFilter(books);
}

// filtering table when clicked
function filterTable() {
  var filterValue =
    document.getElementById("categoryFilter").selectedOptions[0].value;
  var tbody = document.getElementById("tableBody");
  for (var tr of tbody.rows) {
    tr.classList.add("row-hidden");
    for (var td of tr.cells) {
      console.log(td.classList);
      if (td.classList.contains("cell-category")) {
        if (filterValue === "All" || td.innerHTML === filterValue) {
          tr.classList.remove("row-hidden");
        }
        break;
      }
    }
  }
}

function searchTable() {
  var searchValue = document.getElementById("searchBar").value.toLowerCase();
  var tbody = document.getElementById("tableBody");
  for (var tr of tbody.rows) {
    tr.classList.remove("row-search-success");
    // slightly oddd logic
    if (tr.classList.contains("light-mode")) {
      tr.classList.remove("light-mode");
    } else {
      tr.classList.remove("dark-mode");
    }
    for (var td of tr.cells) {
      if (td.classList.contains("cell-title")) {
        if (searchValue && tr.textContent.toLowerCase().includes(searchValue)) {
          tr.classList.add("row-search-success");
        }
        break;
      }
    }
  }
}

function darkMode() {
  var thead = document.getElementById("tableHead");
  thead.classList.remove("light-mode");
  thead.classList.add("dark-mode");
  document.body.classList.remove("light-mode");
  document.body.classList.add("dark-mode");

  var listBox = document.getElementById("listBox");
  listBox.style.backgroundColor = "black";
  listBox.style.borderColor = "white";

  var searchbox0 = document.getElementById("searchBox0");
  console.log(searchbox0);
  searchbox0.style.backgroundColor = "black";
  searchbox0.style.borderColor = "white";

  var searchbox = document.getElementById("searchBox");
  searchbox.style.backgroundColor = "black";
  searchbox.style.borderColor = "white";

  var tbody = document.getElementById("tableBody");
  for (var tr of tbody.rows) {
    tr.classList.remove("dark-mode");
    tr.classList.remove("light-mode");

    if (!tr.classList.contains("row-search-success")){
      for (var td of tr.cells) {
        tr.classList.add("dark-mode");
        console.log(tr.classList);
      }
    }
      
  }
}

function lightMode() {
  var thead = document.getElementById("tableHead");
  thead.classList.remove("dark-mode");
  thead.classList.add("light-mode");

  var searchbox0 = document.getElementById("searchBox0");
  searchbox0.style.backgroundColor = "";
  searchbox0.style.borderColor = "black";

  var searchbox = document.getElementById("searchBox");
  searchbox.style.backgroundColor = "";
  searchbox.style.borderColor = "black";

  var listBox = document.getElementById("listBox");
  listBox.style.backgroundColor = "white";
  document.body.classList.remove("dark-mode");
  document.body.classList.add("light-mode");

  var tbody = document.getElementById("tableBody");
  for (var tr of tbody.rows) {
    tr.classList.remove("dark-mode");
    tr.classList.remove("light-mode");
    for (var td of tr.cells) {
      tr.classList.add("light-mode");
    }
  }
}

function handleError(xhr) {
  console.error(xhr);
}

window.onload = (e) => {
  // Extract data
  getJsonObject("data.json", renderData, handleError);
  var mainForm = document.getElementById("mainForm");
  var test = createForm(mainForm);

  // Category filter
  const filter = document.getElementById("filterBarButton");
  filter.addEventListener("click", () => {
    filterTable();
  });

  // adding to cart
  const addCart = document.getElementById("addCartButton");
  addCart.addEventListener("click", () => {
    cartValue = cartValue + checkedLength;
    var checkedBoxes = document.querySelectorAll("input[name=accept]:checked");

    // unchecks
    for (var check of checkedBoxes) {
      check.checked = false;
    }

    if (checkedBoxes.length === 1) {
      var input = prompt("How many would you like to add?");
      if (parseInt(input)) {
        var quantity = parseInt(input);
        cartValue = quantity + cartValue;
        document.getElementById("shoppingCartValue").innerHTML = cartValue;
      } else {
        alert("Please input a number.");
      }
    } else if (checkedBoxes.length === 0) {
      alert("You have not selected any items");
    } else {
      document.getElementById("shoppingCartValue").innerHTML = cartValue;
      alert("You have successfully added your items!");
    }

    e.preventDefault();
  });

  // reset cart
  const resetCart = document.getElementById("resetCartButton");
  resetCart.addEventListener("click", () => {
    if (confirm("Are you sure to reset the cart?")) {
      cartValue = 0;
      document.getElementById("shoppingCartValue").innerHTML = cartValue;
      location.reload();
    }
  });

  // search btn
  const search = document.getElementById("searchBarButton");
  search.addEventListener("click", () => {
    searchTable();
  });

  // colour toggle
  var tbody = document.getElementById("tableBody");
  var colourButton = document.getElementById("toggle-darkmode");
  colourButton.addEventListener("click", function onClick(event) {
    if (colourButton.value === "dark") {
      colourButton.value = "light";
      lightMode();
    } else {
      colourButton.value = "dark";
      darkMode();
    }
  });

  //on submitting the form, "empty" checks are performed on required inputs.
  mainForm.onsubmit = function (e) {
    // console.log("Submitted!");
    e.preventDefault();
  };
};
