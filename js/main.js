const dataToRender = fetchData();

let visibleImages = [];
document.getElementById("image-counter").textContent = 0;
const sortingSelectBox = document.getElementById("gallery-sorting");
visibleImageCounter = 0;
const imageCounter = document.getElementById("image-counter");
const addBtn = document.getElementById("add-image-button");
const galleryBody = document.getElementById("gallery-body");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModalBtn");
sortingSelectBox.disabled = true;
if (localStorage.getItem("sortingMethod") !== null) {
  sortingSelectBox.value = localStorage.getItem("sortingMethod");
}
galleryBody.addEventListener("click", function() {
  visibleImages.map(function(image) {
    if (image.id == event.target.parentNode.children[0].textContent) {
      visibleImages.splice(visibleImages.indexOf(image), 1);
    }
  });
  render(sortImages(visibleImages));
  counterSetter(visibleImages.length);
});

closeModalBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

sortingSelectBox.addEventListener("change", function() {
  localStorage.setItem("sortingMethod", sortingSelectBox.value);
  render(sortImages(visibleImages));
});

function sortImages(imagesToSort) {
  let sortingMethod;
  if (localStorage.getItem("sortingMethod") !== null) {
    sortingMethod = localStorage.getItem("sortingMethod");
  } else {
    sortingMethod = 0;
  }
  if (sortingMethod == 0) {
    sortedImages = imagesToSort.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  }
  if (sortingMethod == 1) {
    sortedImages = imagesToSort.sort(function(a, b) {
      return b.name.localeCompare(a.name);
    });
  }
  if (sortingMethod == 2) {
    sortedImages = imagesToSort.sort(function(a, b) {
      return b.date.localeCompare(a.date);
    });
  }
  if (sortingMethod == 3) {
    sortedImages = imagesToSort.sort(function(a, b) {
      return a.date.localeCompare(b.date);
    });
  }
  return sortedImages;
}

function render(dataToRender) {
  let itemTemplate;
  let resultHTML;
  dataToRender.forEach(item => {
    itemTemplate = `<div class="col-sm-3 col-xs-6">\
    <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
    <div class="info-wrapper">\
        <div class="text-muted hide">${item.id}</div>\
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

function deleteImagefromVisibleImages(index) {
  visibleImages = visibleImages.splice(index, 1);
}

function counterSetter(value) {
  document.getElementById("image-counter").textContent =
    value + " из " + data.length;
}

addBtn.addEventListener("click", function() {
  sortingSelectBox.disabled = false;
  visibleImages.push(dataToRender[visibleImageCounter]);
  visibleImageCounter++;
  render(sortImages(visibleImages));
  counterSetter(visibleImages.length);
  console.log(visibleImages.length);
  console.log(dataToRender.length);
  if (visibleImages.length === dataToRender.length) {
    addBtn.classList.add("disabled");
    modal.style.display = "block";
  }
});

function fetchData() {
  let resultData = data.slice(0);
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
