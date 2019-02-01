const dataToRender = data.slice(0);
let visibleImages = [];
document.getElementById("image-counter").textContent = 0;

const sortingSelectBox = document.getElementById("gallery-sorting");

const imageCounter = document.getElementById("image-counter");
const addBtn = document.getElementById("add-image-button");
const galleryBody = document.getElementById("gallery-body");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
sortingSelectBox.disabled = true;
if (localStorage.getItem("sortingMethod") !== null) {
  sortingSelectBox.value = localStorage.getItem("sortingMethod");
}
closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

sortingSelectBox.addEventListener("change", function() {
  let sortedImages = [];
  let sortingMethod;
  localStorage.setItem("sortingMethod", sortingSelectBox.value);
  sortingMethod = sortingSelectBox.value;
  console.log(sortingMethod);
  while (galleryBody.firstChild) {
    galleryBody.removeChild(galleryBody.firstChild);
  }
  if (sortingMethod == 0) {
    sortedImages = visibleImages.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    render(sortedImages);
  }
  if (sortingMethod == 1) {
    sortedImages = visibleImages.sort(function(a, b) {
      return b.name.localeCompare(a.name);
    });
    render(sortedImages);
  }
  if (sortingMethod == 2) {
    sortedImages = visibleImages.sort(function(a, b) {
      return b.date.localeCompare(a.date);
    });
    render(sortedImages);
  }
  if (sortingMethod == 3) {
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
  counterSetter(galleryBody.children.length-1);
});

function counterSetter(value){
  document.getElementById("image-counter").textContent =
  value + " из " + data.length;
}
addBtn.addEventListener("click", function() {
  sortingSelectBox.disabled = false;
  let images = fetchData().splice("");
  if(visibleImages.length==0){
    visibleImages.push(images[0]);
  }else
  visibleImages.push(images[visibleImages.length]);
  render(visibleImages);
  counterSetter(galleryBody.children.length);
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
