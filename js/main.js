const dataToRender = data.slice(0);
let visibleImages = [];
let pictureCount = 0;
document.getElementById("image-counter").textContent = pictureCount;

const sortingSelectBox = document.getElementById("gallery-sorting");
const imageCounter = document.getElementById("image-counter");
const addBtn = document.getElementById("add-image-button");
const galleryBody = document.getElementById("gallery-body");
const modal = document.querySelector(".modal");
sortingSelectBox.disabled = true;

sortingSelectBox.addEventListener("change", function() {
  let sortedImages = [];
  while (galleryBody.firstChild) {
    galleryBody.removeChild(galleryBody.firstChild);
  }
  if (sortingSelectBox.value == 0) {
    sortedImages = visibleImages.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    render(sortedImages);
  }
  if (sortingSelectBox.value == 1) {
    sortedImages = visibleImages.sort(function(a, b) {
      return b.name.localeCompare(a.name);
    });
    render(sortedImages);
  }
  if (sortingSelectBox.value == 2) {
    sortedImages = visibleImages.sort(function(a, b) {
      return b.date.localeCompare(a.date);
    });
    render(sortedImages);
  }
  if (sortingSelectBox.value == 3) {
    sortedImages = visibleImages.sort(function(a, b) {
      return a.date.localeCompare(b.date);
    });
    render(sortedImages);
  }
});
galleryBody.addEventListener("click", function(e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.classList.add("hide");
  }
});
addBtn.addEventListener("click", function() {
  sortingSelectBox.disabled = false;
  let images = fetchData().splice("");
  visibleImages.push(images[pictureCount]);
  render(visibleImages);
  pictureCount++;
  document.getElementById("image-counter").textContent =
    pictureCount + " из " + images.length;
  if (visibleImages.length === images.length) {
    addBtn.disabled = true;
    addBtn.classList.add("disabled");
    modal.style.display = "block";
  }
});

function fetchData() {
  let resultData = dataToRender.slice(0);
  resultData.forEach(function(item) {
    item.name = item.name.toUpperCase();
    if (item.description.length > 15) {
      item.description = item.description.slice(0, 15) + "...";
    }
    item.date = moment(item.date).format("YYYY/MM/DD");
    if (!item.url.startsWith("http://")) {
      item.url = "http://" + item.url;
    }
  });
  return resultData;
}

function render(renderingData) {
  let itemTemplate;
  let resultHTML;
  renderingData.forEach(item => {
    itemTemplate = `<div class="col-sm-3 col-xs-6">\
    <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
    <div class="info-wrapper">\
        <div class="text-muted">${item.name}</div>\
        <div class="text-muted top-padding">${item.description}</div>\
        <div class="text-muted">${item.date}</div>\
        <button type="button" class="btn btn-danger delete">Удалить</div>\
    </div>\
    </div>`;
    resultHTML += itemTemplate;
    resultHTML = resultHTML.replace("undefined", "");
  });
  galleryBody.innerHTML = resultHTML;
}
