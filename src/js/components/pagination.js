import FetchMovies from './Fetch-movies.js';


const fetchMovies = new FetchMovies();

const refs = {
    pagination: document.querySelector('.pagination'),
    previousPage:document.querySelector('.previous'),
    nextPage: document.querySelector('.next'),
    paginationItems: document.querySelectorAll('.pagination-page'),
}

let filmsOnPage = 20;

// total_results приходит в объекте
// let countOfPages = Math.ceil(total_results / filmsOnPage); 





//вешаем <li> и <a>
let paginationItemsArr = [];


// i<=countOfPages
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


// первая страница подсвечивается по умолчанию
paginationItemsArr[0].firstElementChild.classList.add('active');


refs.pagination.addEventListener("click", onClickPage);

function onClickPage(event) {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "A") return;

  setActiveLink(target);
  
}

// подсвечивается текущая страница
function setActiveLink(nextActiveLink) {

  let currentActiveLink = refs.pagination.querySelector(".pagination-link.active");
   
  if (currentActiveLink) {
    currentActiveLink.classList.remove("active");
  }
  nextActiveLink.classList.add("active");

  switchPage();
   
}


//переключение страницы, использовать методы FetchMovies от Никиты
function switchPage(currentActiveLink) {


}
