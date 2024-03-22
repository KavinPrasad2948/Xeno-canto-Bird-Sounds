document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual API key
    const query = 'cnt:brazil'; // Example query: search for Eurasian Wren

    const apiUrl = `https://xeno-canto.org/api/2/recordings?query=${query}&api_key=${apiKey}`;

    const recordingsContainer = document.getElementById('recordingsContainer');

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            console.log('Recordings data:', data);
            displayRecordings(data.recordings);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function displayRecordings(recordings) {
        recordingsContainer.innerHTML = ''; // Clear previous content

        recordings.forEach(recording => {
            const recordingItem = document.createElement('div');
            recordingItem.classList.add('recording-item');

            const title = document.createElement('h3');
            title.textContent = recording.rec;

            const details = document.createElement('p');
            details.textContent = ` Country: ${recording.cnt}, Location: ${recording.loc}`;

            const audio = document.createElement('audio');
            audio.controls = true;
            const source = document.createElement('source');
            source.src = recording.file;
            source.type = 'audio/mpeg';
            audio.appendChild(source);

            recordingItem.appendChild(title);
            recordingItem.appendChild(details);
            recordingItem.appendChild(audio);

            recordingsContainer.appendChild(recordingItem);
        });
    }
});
