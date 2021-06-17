const refs = {
  markupContainer: document.querySelector('.pagination-page-list'),
};

export default function renderPaginationBody(data) {
  const currPage = data.page;
  const totalPages = data.total_pages;
  const markupContainer = refs.markupContainer;

  const navRef = document.querySelector('.pagination');
  const itemsRef = markupContainer.querySelectorAll('.pagination-item');
  const itemTotalRef = markupContainer.querySelector('.item-total');
  const itemsDotsFirstRef = markupContainer.querySelector('.item-dots-first');
  const itemsDotsLastRef = markupContainer.querySelector('.item-dots-last');
  const leftArrowRef = document.querySelector('.pagination-prev');
  const rightArrowRef = document.querySelector('.pagination-next');

  if (currPage === 1) {
    leftArrowRef.classList.add('hidden');
  }

  if (currPage === totalPages) {
    rightArrowRef.classList.add('hidden');
  }

  if (currPage !== 1 && currPage !== totalPages) {
    leftArrowRef.classList.remove('hidden');
    rightArrowRef.classList.remove('hidden');
  }

  if (currPage >= 1 && currPage <= 5) {
    itemsDotsFirstRef.hidden = true;
    itemsDotsLastRef.hidden = false;

    itemsRef.forEach((item, index) => {
      item.classList.remove('current-item');
      changeItemText(item, index + 1);
      if (index + 1 === currPage) {
        item.classList.add('current-item');
      }
    });
  }

  if (currPage >= 5 && currPage <= totalPages - 5) {
    itemsDotsFirstRef.hidden = false;
    itemsDotsLastRef.hidden = false;
    itemsRef.forEach((item, index) => {
      item.classList.remove('current-item');
      switch (index) {
        case 0:
          changeItemText(item, 1);
          break;
        case 1:
          changeItemText(item, currPage - 2);
          break;
        case 2:
          changeItemText(item, currPage - 1);
          break;
        case 3:
          changeItemText(item, currPage);
          item.classList.add('current-item');
          break;
        case 4:
          changeItemText(item, currPage + 1);
          break;
        case 5:
          changeItemText(item, currPage + 2);
          break;
        case 6:
          changeItemText(item, totalPages);
          break;
      }
    });
  }

  if (currPage >= totalPages - 4) {
    itemsDotsFirstRef.hidden = false;
    itemsDotsLastRef.hidden = true;
    const reversedItemsRefs = [...itemsRef].reverse();
    reversedItemsRefs.forEach((item, index) => {
      item.classList.remove('current-item');
      changeItemText(item, totalPages - index);
      changeItemText(reversedItemsRefs[reversedItemsRefs.length - 1], 1);
      if (item.dataset.page == currPage) {
        item.classList.add('current-item');
      }
      if (totalPages === currPage) {
        itemTotalRef.classList.add('current-item');
      }
    });
  }

  if (totalPages === 6) {
    hideSomeStuff();

    itemsRef.forEach((item, index) => {
      item.classList.remove('current-item');
      if (index + 1 === currPage) {
        item.classList.add('current-item');
      }
      switch (index) {
        case 0:
          changeItemText(item, 1);
          break;
        case 1:
          changeItemText(item, 2);
          break;
        case 2:
          changeItemText(item, 3);
          break;
        case 3:
          changeItemText(item, 4);
          break;
        case 4:
          changeItemText(item, 5);
          break;
        case 5:
          changeItemText(item, 6);
          break;
      }
    });
  }
  if (totalPages === 5) {
    hideSomeStuff();

    itemsRef.forEach((item, index) => {
      item.classList.remove('current-item');
      if (index + 1 === currPage) {
        item.classList.add('current-item');
      }
      switch (index) {
        case 0:
          changeItemText(item, 1);
          break;
        case 1:
          changeItemText(item, 2);
          break;
        case 2:
          changeItemText(item, 3);
          break;
        case 3:
          changeItemText(item, 4);
          break;
        case 4:
          changeItemText(item, 5);
          break;
      }
    });
  }

  if (totalPages === 4) {
    hideSomeStuff();

    itemsRef.forEach((item, index) => {
      item.classList.remove('current-item');
      if (index + 1 === currPage) {
        item.classList.add('current-item');
      }
      switch (index) {
        case 0:
          changeItemText(item, 1);
          break;
        case 1:
          changeItemText(item, 2);
          break;
        case 2:
          changeItemText(item, 3);
          break;
        case 3:
          changeItemText(item, 4);
          break;
      }
    });
  }
  if (totalPages === 3) {
    hideSomeStuff();

    itemsRef.forEach((item, index) => {
      item.classList.remove('current-item');
      if (index + 1 === currPage) {
        item.classList.add('current-item');
      }
      switch (index) {
        case 0:
          changeItemText(item, 1);
          break;
        case 1:
          changeItemText(item, 2);
          break;
        case 2:
          changeItemText(item, 3);
          break;
      }
    });
  }

  if (totalPages === 2) {
    hideSomeStuff();

    itemsRef.forEach((item, index) => {
      item.classList.remove('current-item');
      if (index + 1 === currPage) {
        item.classList.add('current-item');
      }
      switch (index) {
        case 0:
          changeItemText(item, 1);
          break;
        case 1:
          changeItemText(item, 2);
          break;
      }
    });
  }

  if (totalPages === 1) {
    navRef.hidden = true;
  } else {
    navRef.hidden = false;
  }

  if (window.screen.width <= 768) {
    itemsDotsFirstRef.hidden = true;
    itemsDotsLastRef.hidden = true;
  }

  itemTotalRef.innerHTML = totalPages;
  itemTotalRef.dataset.page = totalPages;

  function hideSomeStuff() {
    itemsDotsFirstRef.hidden = true;
    itemsDotsLastRef.hidden = true;
    itemTotalRef.hidden = true;
  }

  function changeItemText(item, text) {
    item.textContent = text;
    item.dataset.page = text;
  }
}
