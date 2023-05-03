

$(document).ready(function () {
    $('.dropdown').hover(
      function () {
        $('.dropdown-content', this).stop(true, true).slideDown('fast');
        $(this).toggleClass('open');
      },
      function () {
        $('.dropdown-content', this).stop(true, true).slideUp('fast');
        $(this).toggleClass('open');
      }
    );
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
  