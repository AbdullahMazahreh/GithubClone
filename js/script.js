let searchBar = document.querySelector("#search-input");
let searchClick = document.querySelector("#search-click");
let profilePicture = document.querySelectorAll(".profile-picture-image");
let userName = document.querySelector(".profile-name");
let followerCounter = document.querySelector(".follower-count");
let reposContainer = document.querySelector(".main-repos-container");
let searchContainer = document.querySelector(".search-input-container");
let linkTravel = document.querySelector(".link-travel");

fetch(`https://api.github.com/users/AbdullahMazahreh`)
  .then((response) => response.json())
  .then((data) => {
    userName.textContent = data.login;
    profilePicture.forEach((ele) => {
      ele.src = data.avatar_url;
    });

    followerCounter.innerHTML = `<span>${data.followers}</span> follower <span class="center-dot">.</span>
    <span>${data.following}</span> following`;
  });

fetch(`https://api.github.com/users/AbdullahMazahreh/repos`)
  .then((response) => response.json())
  .then((data) => {
    let repoCounter = 0;
    for (let ele of data) {
      if (repoCounter >= 6) {
        return;
      }
      let repo = document.createElement("div");
      repo.classList.add("repo");
      let repoNameStatus = document.createElement("div");
      repoNameStatus.classList.add("repo-name-status");
      let repoName = document.createElement("div");
      repoName.classList.add("repo-name");
      let repoStatus = document.createElement("div");
      repoStatus.classList.add("repo-status");
      let repoMostWritten = document.createElement("div");
      repoMostWritten.classList.add("repo-most-written");
      let repoCircleContainer = document.createElement("div");
      let languageWritten = document.createElement("div");
      languageWritten.classList.add("language-written");
      repo.append(repoNameStatus);
      repo.append(repoMostWritten);
      repoNameStatus.append(repoName);
      repoNameStatus.append(repoStatus);
      repoMostWritten.append(repoCircleContainer);
      repoMostWritten.append(languageWritten);
      repoName.textContent = `${ele.name}`;
      repoStatus.textContent = `${ele.visibility}`;
      languageWritten.textContent = `${ele.language}`;
      repoCircleContainer.innerHTML = `<i class="fa-solid fa-circle fa-xs" id="repo-circle${repoCounter}"></i>`;
      reposContainer.append(repo);
      if (ele.language == "CSS") {
        document.getElementById(`repo-circle${repoCounter}`).style.color =
          "#563d7c";
      } else if (ele.language == "HTML") {
        document.getElementById(`repo-circle${repoCounter}`).style.color =
          "#e34c26";
      } else if (ele.language == "JavaScript") {
        document.getElementById(`repo-circle${repoCounter}`).style.color =
          "#f1e05a";
      } else {
        languageWritten.style.display = "none ";
      }
      repoCounter++;
    }
  });

searchClick.addEventListener("click", () => {
  fetch(`https://api.github.com/users/${searchBar.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (searchBar.value == "") {
        alert("Please Insert A UserName");
        return;
      }
      if (!data.login) {
        alert("User Not Found");
        return;
      }
      userName.textContent = data.login;
      profilePicture.forEach((ele) => {
        ele.src = data.avatar_url;
      });

      followerCounter.innerHTML = `<span>${data.followers}</span> follower <span class="center-dot">.</span>
      <span>${data.following}</span> following`;
    });

  let reposContainerChildren = [...reposContainer.children];
  for (let i = 0; i < reposContainerChildren.length; i++) {
    reposContainerChildren[i].remove();
  }

  fetch(`https://api.github.com/users/${searchBar.value}/repos`)
    .then((response) => response.json())
    .then((data) => {
      let repoCounter = 0;
      for (let ele of data) {
        if (repoCounter >= 6) {
          return;
        }
        let repo = document.createElement("div");
        repo.classList.add("repo");
        let repoNameStatus = document.createElement("div");
        repoNameStatus.classList.add("repo-name-status");
        let repoName = document.createElement("div");
        repoName.classList.add("repo-name");
        let repoStatus = document.createElement("div");
        repoStatus.classList.add("repo-status");
        let repoMostWritten = document.createElement("div");
        repoMostWritten.classList.add("repo-most-written");
        let repoCircleContainer = document.createElement("div");
        let languageWritten = document.createElement("div");
        languageWritten.classList.add("language-written");
        repo.append(repoNameStatus);
        repo.append(repoMostWritten);
        repoNameStatus.append(repoName);
        repoNameStatus.append(repoStatus);
        repoMostWritten.append(repoCircleContainer);
        repoMostWritten.append(languageWritten);
        repoName.textContent = `${ele.name}`;
        repoStatus.textContent = `${ele.visibility}`;
        languageWritten.textContent = `${ele.language}`;
        repoCircleContainer.innerHTML = `<i class="fa-solid fa-circle fa-xs" id="repo-circle${repoCounter}"></i>`;
        reposContainer.append(repo);
        if (ele.language == "CSS") {
          document.getElementById(`repo-circle${repoCounter}`).style.color =
            "#563d7c";
        } else if (ele.language == "HTML") {
          document.getElementById(`repo-circle${repoCounter}`).style.color =
            "#e34c26";
        } else if (ele.language == "JavaScript") {
          document.getElementById(`repo-circle${repoCounter}`).style.color =
            "#f1e05a";
        } else {
          languageWritten.style.display = "none ";
        }
        repoCounter++;
      }
    });
});

let widthLimit = 570;
function toggleDisplay() {
  if (window.innerWidth <= widthLimit) {
    let mainContainer = document.querySelector("main");
    mainContainer.insertBefore(searchContainer, mainContainer.firstChild);
  } else {
    document
      .querySelector(".header-left-side")
      .insertBefore(searchContainer, document.querySelector(".nav-links"));
  }
}

window.addEventListener("resize", toggleDisplay);

linkTravel.addEventListener("click", () => {
  location.href = "comparison.html";
});
