const input = document.getElementById("search-input");
const cardContainer = document.getElementById("card-container");
const erorMsg = document.createElement("h4");
const button = document.getElementById("button");

button.addEventListener("click", () => {
  const inputText = input.value;
  erorMsg.classList.add("text-center", "text-danger");
  erorMsg.innerHTML = "";
  if (inputText === "") {
    erorMsg.innerHTML = "Not found";
    cardContainer.appendChild(erorMsg);
  } else {
    erorMsg.innerHTML = "";
    const url = `http://openlibrary.org/search.json?q=${inputText};`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => loadData(data.docs));
    input.value = "";
  }
});
function loadData(books) {
  const newArr = books.filter(
    (book) =>
      book.title !== undefined &&
      book.cover_i !== undefined &&
      book.author_name !== undefined &&
      book.publisher !== undefined &&
      book.publish_year !== undefined
  );
  const searchResult = document.getElementById("search-result");

  searchResult.innerText = `Search Result: ${newArr.length}`;

  newArr.forEach((book) => {
    console.log(book);

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
