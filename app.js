const yourName = document.querySelector(".your-name");
const bookName = document.querySelector(".book-name");
const issueRadio = document.querySelector(".issue-radio");
const errorDiv = document.querySelector(".error-div");
const row = document.querySelector(".row");
const nobookIssued = document.querySelector(".no-book-issued");
const submitBtn = document.querySelector(".submit-btn");

window.addEventListener("DOMContentLoaded", () => {
  // let books;
  // if (localStorage.getItem("books") === null) {
  //   books = [];
  // } else {
  //   books = JSON.parse(localStorage.getItem("books"));
  // }
  //   books.push({name : yourName.value, book : bookName.value});
  //   localStorage.setItem('books' , JSON.stringify(books));
  showfromLocal();

  if (row.innerText == "") {
    nobookIssued.style.display = "block";
  } else {
    nobookIssued.style.display = "none";
  }
});

submitBtn.addEventListener("click", () => {
  if (yourName.value === "" || bookName.value === "") {
    //Show RED Error
    showError("Please fill all fields!", "red", "block");
    setTimeout(() => {
      showError("Please fill all fields!", "red", "none");
    }, 5000);
  } else {
    if (issueRadio.checked === true) {
      //Show GREEN Error
      showError(
        `${bookName.value} Is Issue To ${yourName.value}`,
        "green",
        "block"
      );
      setTimeout(() => {
        showError(
          `${bookName.value} Is Issue To ${yourName.value}`,
          "green",
          "none"
        );
      }, 5000);

      let books;
      if (localStorage.getItem("books") === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem("books"));
      }
      books.push({ name: yourName.value, book: bookName.value });
      localStorage.setItem("books", JSON.stringify(books));

      console.log(bookName.value.toLowerCase());

      let newBook = document.createElement("div");
      newBook.innerHTML = `<div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${yourName.value}</h5>
                                    <p class="card-text">${bookName.value}</p>
                                </div>
                            </div>`;
      newBook.classList.add("col-sm-4", "mb-4", "book-box");
      row.appendChild(newBook);
      books.push({ name: yourName.value, book: bookName.value });
      //   localStorage.setItem("books", JSON.stringify(books));
    } else {
      Array.from(row.children).forEach((curr) => {
        let bookArr = JSON.parse(localStorage.getItem("books"));
        for (let i = 0; i < bookArr.length; i++) {
          if (
            yourName.value == bookArr[i].name &&
            bookName.value == bookArr[i].book
          ) {
            Array.from(row.children).forEach((curr) => {
              if (
                yourName.value ==
                curr.children[0].children[0].children[0].innerText
              ) {
                curr.remove();
                bookArr.splice(i, 1);
                showError(
                  `${bookName.value} Is Returned By ${yourName.value}.`,
                  "green",
                  "block"
                );
                setTimeout(() => {
                  showError(
                    `${bookName.value} Is Returned By ${yourName.value}.`,
                    "green",
                    "none"
                  );
                }, 5000);
                // let books;
                // if (localStorage.getItem("books") === null) {
                //   books = [];
                // } else {
                //   books = JSON.parse(localStorage.getItem("books"));
                // }
                localStorage.setItem("books", JSON.stringify(bookArr));
              }
            });
          } else {
            showError(
              `I'm Sorry! ${bookName.value} Is Not Issued To Anyone. So we Can't Return It.`,
              "red",
              "block"
            );
            setTimeout(() => {
              showError(
                `I'm Sorry! ${bookName.value} Is Not Issued To Anyone. So we Can't Return It.`,
                "red",
                "none"
              );
            }, 5000);
          }
        }
      });
    }

    yourName.value = "";
    bookName.value = "";
  }
});

function showError(message, color, displayProperty) {
  errorDiv.innerText = message;
  errorDiv.style.background = color;
  errorDiv.style.display = displayProperty;
}

function showfromLocal() {
  let bookArr = JSON.parse(localStorage.getItem("books"));
  bookArr.forEach((element) => {
    let newBook = document.createElement("div");
    newBook.innerHTML = `<div class="card">
                                  <div class="card-body">
                                      <h5 class="card-title">${element.name}</h5>
                                      <p class="card-text">${element.book}</p>
                                  </div>
                              </div>`;
    newBook.classList.add("col-sm-4", "mb-4");
    row.appendChild(newBook);
  });
}
