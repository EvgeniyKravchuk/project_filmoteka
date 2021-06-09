import FetchMovies from './Fetch-movies';

const refs = {
    pagination: document.querySelector('.pagination'),
    previousPage:document.querySelector('.previous'),
    nextPage: document.querySelector('.next'),
    paginationItems: document.querySelectorAll('.pagination-page'),
}

const fetchMovies = new FetchMovies();


let filmsOnPage = 20;
// let countOfPages = Math.ceil(this.total_results / filmsOnPage);
let paginationItemsArr = [];

// for (let i = 1; i <= 10; i++) {
    
//     const liEl = document.createElement('li');

//     const linkItem = document.createElement('a');
//     linkItem.href = "#";

//     liEl.appendChild(linkItem);
//     console.log(liEl);

//     liEl.innerHTML = i;
//     refs.pagination.insertBefore(liEl, refs.nextPage);
//     liEl.classList.add('pagination-page');
//     paginationItemsArr.push(liEl);
// }

for (let i = 1; i <= 10; i++) {
    
    const liEl = document.createElement('li');

    
    refs.pagination.insertBefore(liEl, refs.nextPage);
    liEl.classList.add('pagination-page');
    paginationItemsArr.push(liEl);

    const linkItem = document.createElement('a');
    linkItem.href = "#";
    linkItem.classList.add('pagination-link');
    linkItem.innerHTML = i;

    liEl.appendChild(linkItem);
  

    
}

paginationItemsArr[0].firstElementChild.classList.add('active');

refs.pagination.addEventListener("click", onClickPage);

function onClickPage(event) {
  event.preventDefault();
  
  const target = event.target;
 
    if (target.nodeName !== "A") return;

    setActiveLink(target);
    
    // return apiService
    // .fetchImages()
    // .then(markupGallery)
    // .catch(error => console.log(error)); 

}

function setActiveLink(nextActiveLink) {

    let currentActiveLink = refs.pagination.querySelector(".pagination-link.active");
   
  if (currentActiveLink) {
    currentActiveLink.classList.remove("active");
  }

  nextActiveLink.classList.add("active");
}
