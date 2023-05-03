

document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  dropdown.addEventListener("mouseenter", function () {
    dropdownContent.style.display = "block";
  });

  dropdown.addEventListener("mouseleave", function () {
    dropdownContent.style.display = "none";
  });
});
  fetch('api/topics')
      .then(response => response.json())
      .then(data => {
        const courseMenu = document.getElementById('course-menu');
        data.forEach(topic => {
          console.log('topic '+ topic);
          const menuItem = document.createElement('a');
          menuItem.href = `api/topics/${topic._id}`;
          menuItem.textContent = topic.name;
          courseMenu.appendChild(menuItem);
        });
      });
  