// Check if the progress container already exists
var progressContainerExists = document.getElementById('searchProgressContainer');
if (!progressContainerExists) {
    // Create the progress container element
    var progressContainer = document.createElement('div');
    progressContainer.id = 'searchProgressContainer';
    progressContainer.style.width = '200px';
    progressContainer.style.height = '100px';
    progressContainer.style.backgroundColor = 'transparent';
    progressContainer.style.border = 'none';
    progressContainer.style.position = 'fixed';
    progressContainer.style.top = '50%';
    progressContainer.style.left = '50%';
    progressContainer.style.transform = 'translate(-50%, -50%)';
    progressContainer.style.zIndex = '9999';
    progressContainer.style.display = 'none';

    // Create the progress bar element
    var progressBarContainer = document.createElement('div');
    progressBarContainer.style.width = '100%';
    progressBarContainer.style.height = '30px';
    progressBarContainer.style.backgroundColor = '#eee';
    progressBarContainer.style.borderRadius = '4px';
    progressBarContainer.style.position = 'relative';

    var progressBar = document.createElement('div');
    progressBar.id = 'searchProgressBar';
    progressBar.style.width = '0%';
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = '#6eba6e'; // Nice greenish color
    progressBar.style.borderRadius = '4px';
    progressBar.style.transition = 'width 0.3s linear';
    progressBar.style.backgroundImage = 'repeating-linear-gradient(-45deg, rgba(255,255,255,.2), rgba(255,255,255,.2) 2px, transparent 2px, transparent 4px)';
    progressBar.style.backgroundSize = '150% 100%';
    progressBar.style.animation = 'striped 1s linear infinite';

    var percentageText = document.createElement('div');
    percentageText.id = 'percentageText';
    percentageText.style.position = 'absolute';
    percentageText.style.width = '100%';
    percentageText.style.top = '50%';
    percentageText.style.transform = 'translateY(-50%)';
    percentageText.style.textAlign = 'center';
    percentageText.style.fontWeight = 'bold';
    percentageText.style.color = '#333'; // Prominent text color

    progressBar.appendChild(percentageText);
    progressBarContainer.appendChild(progressBar);

    // Create the search text element
    var searchText = document.createElement('div');
    searchText.id = 'searchText';
    searchText.style.textAlign = 'center';
    searchText.style.fontWeight = 'bold';

    // Append the progress bar and search text elements to the progress container
    progressContainer.appendChild(progressBarContainer);
    progressContainer.appendChild(searchText);

    // Append the progress container to the document body
    document.body.appendChild(progressContainer);

    // Get all the spans in the document
    var spans = document.getElementsByTagName('span');
    var found = false;
    var searchComplete = false; // Flag to indicate if search is complete

    // Function to update the progress bar and percentage
    function updateProgressBar(progress) {
        progressBar.style.width = progress + '%';
percentageText.innerText = Math.round(progress) + '%  | ' + 'escapedSearchText';
percentageText.style.fontFamily = 'Calibri Light';
    }

    // Loop through the spans and search for the text
    var i = 0;
    var searchInterval = setInterval(function() {
        if (i < spans.length) {
            var currentSpan = spans[i];
            if (currentSpan.textContent.includes('escapedSearchText')) {
                // Replace the text with highlighted text
                var replacedText = currentSpan.textContent.replace(new RegExp('escapedSearchText', 'g'), '<mark style=background-color: yellow;>$&</mark>');
                currentSpan.innerHTML = replacedText;
                found = true;
            }

            // Update the progress bar with the current progress
            var progress = (i + 1) / spans.length * 100;
            updateProgressBar(progress);

            i++;
        } else {
            if (found && !searchComplete) {
                // If text is found and search is not complete, mark the search as complete
                searchComplete = true;
                clearInterval(searchInterval);
                progressContainer.style.display = 'none';
            }
        }
    }, 25);

    // Show the progress container
    progressContainer.style.display = 'block';

    // CSS animation for striped effect
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '@keyframes striped { 0% { background-position: 0 0; } 100% { background-position: 30px 0; } }';
    document.getElementsByTagName('head')[0].appendChild(style);
}