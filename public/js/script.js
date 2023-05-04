document.addEventListener("DOMContentLoaded", function () {
    const mainMenuItems = document.querySelectorAll(".main-menu > li");
    const topicsDropdownItems = document.querySelectorAll(".topics-dropdown > li");
  
    mainMenuItems.forEach((menuItem) => {
      menuItem.addEventListener("mouseenter", function () {
        const topicsDropdown = menuItem.querySelector(".topics-dropdown");
        if (topicsDropdown) {
          topicsDropdown.style.display = "block";
        }
      });
  
      menuItem.addEventListener("mouseleave", function () {
        const topicsDropdown = menuItem.querySelector(".topics-dropdown");
        if (topicsDropdown) {
          topicsDropdown.style.display = "none";
        }
      });
    });
  
    topicsDropdownItems.forEach((dropdownItem) => {
      dropdownItem.addEventListener("mouseenter", function () {
        const subtopicsDropdown = dropdownItem.querySelector(".subtopics-dropdown");
        if (subtopicsDropdown) {
          subtopicsDropdown.style.display = "block";
        }
      });
  
      dropdownItem.addEventListener("mouseleave", function () {
        const subtopicsDropdown = dropdownItem.querySelector(".subtopics-dropdown");
        if (subtopicsDropdown) {
          subtopicsDropdown.style.display = "none";
        }
      });
    });
  });
  