
//movie recommendation
function recommendMovie() {

  document.getElementById('introMessage').style.display = 'none';
  var movieInput = document.getElementById('movieInput').value;
  

  document.querySelector('.movie-box').style.display = 'block';

  fetch('/recommend/' + encodeURIComponent(movieInput))
    .then(response => response.json())
    .then(data => displayRecommendations(data.recommendations))
    .catch(error => console.error('Error:', error));
}


function displayRecommendations(recommendations) {
  var recommendationsDiv = document.getElementById('recommendations');
  recommendationsDiv.innerHTML = '';

  recommendations.forEach(function (movie) {
    
    var movieBox = document.createElement('div');
    movieBox.className = 'movie__databox'; 
    movieBox.style.display="flex";

    var movieParagraph = document.createElement('p');
    movieParagraph.textContent = movie;

    movieBox.appendChild(movieParagraph);

    recommendationsDiv.appendChild(movieBox);
  });
}

  //toggle between background videos
  const videos = [
    document.getElementById('bgVideo1'),
    document.getElementById('bgVideo2'),
    document.getElementById('bgVideo3'),
    document.getElementById('bgVideo4'),
    document.getElementById('bgVideo5'),
    document.getElementById('bgVideo6'),
    document.getElementById('bgVideo7'),

  ];

  for (let i = 1; i < videos.length; i++) {
    videos[i].style.display = 'none';
  }

  let currentIndex = 0;

  function playNextVideo() {
    videos[currentIndex].style.display = 'none';

    currentIndex = (currentIndex + 1) % videos.length;

    videos[currentIndex].style.display = 'block';
    videos[currentIndex].play();

    
    const videoDuration = 10000; // 10 seconds
    setTimeout(playNextVideo, videoDuration);
  }

  videos[0].play();

 
  setTimeout(playNextVideo, 0);