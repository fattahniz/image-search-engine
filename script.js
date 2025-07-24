// const searchForm = document.getElementById('search-form');
// const searchBox = document.getElementById('search-box');
// const searchResult = document.getElementById('search-result');
// const showMoreBtn = document.getElementById('show-more-btn');
const accessKey = "XgA0RfvZ6WsyrFVjni9Lay0OD6ZLFxV6pRirMXRhe0COxStVxfVZH9Iv";

const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let query = "";
let page = 1;

// Fetch and display images
async function searchImages() {
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=12&page=${page}`;

  const response = await fetch(url, {
    headers: {
      Authorization: accessKey
    }
  });

  const data = await response.json();

  // If it's a new search (page 1), clear previous results
  if (page === 1) {
    searchResult.innerHTML = "";
  }

  data.photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.src.medium;
    img.alt = photo.photographer;
    img.style.margin = "10px";
    img.style.borderRadius = "10px";
    img.style.width = "250px";
    searchResult.appendChild(img);
  });

  // Show "Show more" button only if there are more results
  showMoreBtn.style.display = "block";
}

// Form submit handler
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  query = searchBox.value.trim();
  page = 1;
  if (query !== "") {
    searchImages();
  }
});

// Show more button click
showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});