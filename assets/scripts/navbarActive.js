var navClass = document.getElementsByClassName("nav-item");
var path = window.location.href;

for (i = 0; i < navClass.length; i++) {
 if (path.includes(navClass[i].href)) {
    navClass[i].classList.add("active");
  }
}