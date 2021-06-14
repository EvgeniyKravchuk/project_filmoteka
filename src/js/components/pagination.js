const refs = {
  markupContainer: document.querySelector('.pagination-page-list'),
};

export default function renderPaginationBody(data) {
  const currPage = data.page;
  const totalPages = data.total_pages;
  const markupContainer = refs.markupContainer;

  const itemsRef = markupContainer.querySelectorAll('.pagination-item');
  const itemTotalRef = markupContainer.querySelector('.item-total');
  const itemsDotsFirstRef = markupContainer.querySelector('.item-dots-first');
  const itemsDotsLastRef = markupContainer.querySelector('.item-dots-last');

  if (currPage > 0 && currPage < 5) {
    itemsDotsFirstRef.hidden = true;
    itemsDotsLastRef.hidden = false;

    itemsRef.forEach((item, index) => {
      item.classList.remove('current-item');
      changeItemText(item, (index + 1));
      if (index + 1 === currPage) {
        item.classList.add('current-item');
      }
    });
  }

  if (currPage > 4 && currPage < (totalPages - 4)) {
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
      }
    });
  }

  if(currPage >= (totalPages - 4)) {
    itemsDotsFirstRef.hidden = false;
    itemsDotsLastRef.hidden = true;
    const reversedItemsRefs = [...itemsRef].reverse()
    reversedItemsRefs.forEach((item, index) => {
        item.classList.remove('current-item');
        changeItemText(item, totalPages - index - 1);
        changeItemText(reversedItemsRefs[reversedItemsRefs.length - 1], 1)
        if((item.dataset.page) == currPage) {
            item.classList.add('current-item');
        }
        if(totalPages === currPage) {
            itemTotalRef.classList.add('current-item')
        }
      });
  }

  if(window.screen.width <= 768) {
            itemsDotsFirstRef.hidden = true;
        itemsDotsLastRef.hidden = true;
  }

  itemTotalRef.innerHTML = totalPages;
  itemTotalRef.dataset.page = totalPages;
  

  function changeItemText(item, text) {
    item.textContent = text;
    item.dataset.page = text;
  }
}