// selectors

let tabsContainer = document.querySelector(".tabs");
let allTabs = document.querySelectorAll(".tab__btn");
let allContent = Array.from(document.querySelectorAll(".tab"));

//* tab switching
tabsContainer.addEventListener("click", function (e) {
  let target = e.target;

  if (!target.classList.contains("tab__btn")) return;

  let tabId = target.dataset.tab;

  allTabs.forEach((tab) => tab.classList.remove("active"));
  allContent.forEach((content) => content.classList.remove("active"));

  target.classList.add("active");
  allContent.forEach((content) => {
    if (content.id === tabId) {
      content.classList.add("active");
    }
  });
});
