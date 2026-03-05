// selectors

let tabsContainer = document.querySelector(".tabs");
let allTabs = document.querySelectorAll(".tab__btn");
let allContent = Array.from(document.querySelectorAll(".tab"));

//* tab switching
tabsContainer.addEventListener("click", function (e) {
  let target = e.target;

  if (!target.classList.contains("tab__btn")) return;

  let tabId = target.dataset.tab;

  localStorage.setItem("activeTab", tabId);

  allTabs.forEach((tab) => tab.classList.remove("active"));
  allContent.forEach((content) => content.classList.remove("active"));

  target.classList.add("active");
  allContent.forEach((content) => {
    if (content.id === tabId) {
      content.classList.add("active");
    }
  });
});


// quotes

const quotes = [

"Discipline is choosing what you want most over what you want now.",

"Small progress each day adds up to big results.",

"The pain of discipline is less than the pain of regret.",

"Your future is created by what you do today, not tomorrow.",

"Consistency beats motivation every single time.",

"Focus on the system, not the outcome.",

"The man who masters himself masters life.",

"Success is built on boring consistency.",

"Do what is hard now so life can be easy later.",

"A year from now you will wish you started today.",

"Control your mind or it will control you.",

"The secret of your future is hidden in your daily routine.",

"Greatness is doing small things well every day.",

"Motivation starts you. Discipline keeps you going.",

"Win the morning, win the day.",

"Hard choices, easy life. Easy choices, hard life.",

"Your habits decide your future.",

"Comfort is the enemy of growth.",

"The more disciplined you become, the easier life gets.",

"Your potential is waiting on the other side of discipline.",

"Do the work even when no one is watching.",

"Success is nothing more than a few simple disciplines practiced daily.",

"One focused hour is worth ten distracted ones.",

"You don't rise to your goals, you fall to your systems.",

"Action cures fear.",

"Momentum is built by starting.",

"Every day is another chance to get stronger.",

"The version of you in the future is watching your decisions today.",

"Self mastery is the real success.",

"Discipline creates freedom."

];

function showRandomQuote(){

const quoteText = document.querySelector(".quote__text");

const randomIndex = Math.floor(Math.random() * quotes.length);

quoteText.textContent = quotes[randomIndex];

}

showRandomQuote();


const savedTab = localStorage.getItem("activeTab");

if(savedTab){

  allTabs.forEach(tab => tab.classList.remove("active"));
  allContent.forEach(content => content.classList.remove("active"));

  const activeTabBtn = document.querySelector(`[data-tab="${savedTab}"]`);
  const activeContent = document.getElementById(savedTab);

  if(activeTabBtn) activeTabBtn.classList.add("active");
  if(activeContent) activeContent.classList.add("active");

}