// DOM id select
const input = document.getElementById("search-input");
const cardContainer = document.getElementById("card-container");
const searchResult = document.getElementById("search-result");
const erorMsg = document.createElement("h4");
const button = document.getElementById("button");
// click event
button.addEventListener("click", () => {
  // spinner
  cardContainer.innerHTML = `
  <div class="  spinner d-flex justify-content-end text-primary">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
  `;
  searchResult.innerText = "";
  const inputText = input.value;
  erorMsg.classList.add("text-center", "text-danger");
  erorMsg.innerHTML = "";

  //error handeling
  if (inputText === "") {
    cardContainer.innerHTML = "";
    erorMsg.innerHTML = "Enter valid input";
    cardContainer.classList.remove("show-cards");
    cardContainer.appendChild(erorMsg);
  } else {
    erorMsg.innerHTML = "";
    const url = `https://openlibrary.org/search.json?q=${inputText};`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => loadData(data.docs));
    input.value = "";
  }
});
// show books  function
function loadData(books) {
  const newArr = books.filter(
    (book) =>
      book.title !== undefined &&
      book.cover_i !== undefined &&
      book.author_name !== undefined &&
      book.publisher !== undefined &&
      book.publish_year !== undefined
  );

  searchResult.innerText = `Search Result: ${newArr.length}`;
  if (newArr.length === 0) {
    // cardContainer.innerHTML = "";
    searchResult.innerText = "";
    erorMsg.innerHTML = "Not found";
    cardContainer.classList.remove("show-cards");
    cardContainer.appendChild(erorMsg);
  } else {
    cardContainer.innerHTML = "";
    newArr.forEach((book) => {
      const div = document.createElement("div");
      cardContainer.classList.add("show-cards");
      div.innerHTML = `
        <div class="col">
        <div class="card">
        <img   class=" height img-fluid" src="https://covers.openlibrary.org/b/id/${book.cover_i}.jpg" class="card-img-top" alt="...">
          <div class="card-body">
          <h6 class="card-title">Author name: ${book.title} </h6>
          <h6 class="card-title">Author name: ${book.author_name[0]} </h6>
          <h6 class="card-title">Author name: ${book.publisher[0]} </h6>
          <h6 class="card-title">Author name: ${book.first_publish_year} </h6>
          </div>
        </div>
      </div>
        `;
      cardContainer.appendChild(div);
    });
  }
}
