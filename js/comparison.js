let firstSearch = document.querySelector("#search-input-1");
let secondSearch = document.querySelector("#search-input-2");
let firstClick = document.querySelector("#search-click-1");
let secondClick = document.querySelector("#search-click-2");
let firstFollowers = document.querySelector(".first-follower-container");
let secondFollowers = document.querySelector(".second-follower-container");
let compareBtn = document.querySelector(".compare-btn");
let resultContainer = document.querySelector(".result");
let firstImage = document.querySelector("#first-image");
let secondImage = document.querySelector("#second-image");
let firstRepos = document.querySelector(".first-repos-counter");
let secondRepos = document.querySelector(".second-repos-counter");
let linkTravel = document.querySelector(".link-travel");

compareBtn.addEventListener("click", () => {
  if (firstSearch.value !== "" && secondSearch.value !== "") {
    fetch(`https://api.github.com/users/${firstSearch.value}`)
      .then((response1) => response1.json())
      .then((data1) => {
        if (!data1.login) {
          alert("Please Enter A Valid User Name For First Competitor");
          return;
        } else {
          fetch(`https://api.github.com/users/${secondSearch.value}`)
            .then((response2) => response2.json())
            .then((data2) => {
              if (!data2.login) {
                alert("Please Enter A Valid User Name For Second Competitor");
                return;
              } else {
                firstImage.src = data1.avatar_url;
                secondImage.src = data2.avatar_url;
                firstFollowers.innerHTML = `<span>${data1.followers}</span> follower <span class="center-dot">.</span>
                <span>${data1.following}</span> following`;
                secondFollowers.innerHTML = `<span>${data2.followers}</span> follower <span class="center-dot">.</span>
                <span>${data2.following}</span> following`;
                fetch(`https://api.github.com/users/${firstSearch.value}/repos`)
                  .then((response3) => response3.json())
                  .then((data3) => {
                    firstRepos.textContent = `${data3.length} Repos`;
                    fetch(
                      `https://api.github.com/users/${secondSearch.value}/repos`
                    )
                      .then((response4) => response4.json())
                      .then((data4) => {
                        secondRepos.textContent = `${data4.length} Repos`;
                        if (data3.length > data4.length) {
                          resultContainer.style.display = "block";
                          resultContainer.textContent = `First Competitor (${data1.login}) Won`;
                          resultContainer.style.boxShadow =
                            "0px 0px 10px #0969da";
                        } else if (data4.length > data3.length) {
                          resultContainer.style.display = "block";
                          resultContainer.style.backgroundColor =
                            "rgb(253, 61, 61)";
                          resultContainer.style.boxShadow =
                            "0px 0px 10px rgb(253, 61, 61)";
                          resultContainer.textContent = `Second Competitor (${data2.login}) Won`;
                        } else {
                          if (data1.followers > data1.followers) {
                            resultContainer.style.display = "block";
                            resultContainer.style.boxShadow =
                              "0px 0px 10px #0969da";
                            resultContainer.textContent = `First Competitor (${data1.login}) Won`;
                          } else if (data2.followers > data1.followers) {
                            resultContainer.style.display = "block";
                            resultContainer.style.backgroundColor =
                              "rgb(253, 61, 61)";
                            resultContainer.style.boxShadow =
                              "0px 0px 10px rgb(253, 61, 61)";
                            resultContainer.textContent = `Second Competitor (${data2.login}) Won`;
                          } else {
                            resultContainer.style.display = "block";
                            resultContainer.style.backgroundColor = "grey";
                            resultContainer.style.boxShadow =
                              "0px 0px 10px grey";
                            resultContainer.textContent = "It's a Tie";
                          }
                        }
                      });
                  });
              }
            });
        }
      });
  }
});

linkTravel.addEventListener("click", () => {
  location.href = "index.html";
});
