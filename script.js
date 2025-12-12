document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('f1-video');
    const scrollTarget = document.getElementById('scroll-target');
    const scrollPrompt = document.getElementById('scroll-prompt');

    // We must wait for the video to load metadata to get the duration
    video.addEventListener('loadedmetadata', () => {
        
        video.pause(); 
        const actualDuration = video.duration;
        console.log(`Video loaded. Duration: ${actualDuration} seconds.`);

        // Add the main scroll event listener
        window.addEventListener('scroll', updateVideo);

        // Run once on load to set the initial frame
        updateVideo();
    });

    // --- Core Scrubbing Function ---
    function updateVideo() {
        const scrollPosition = window.scrollY;
        
        // The total scroll distance is based on the height of the scroll-target element 
        // minus the viewport height (window.innerHeight).
        const maxScroll = scrollTarget.offsetHeight - window.innerHeight; 

        // 1. Calculate Progress (0.0 to 1.0)
        let scrollProgress = 0;
        if (maxScroll > 0) {
             scrollProgress = scrollPosition / maxScroll;
        }

        // Clamp the progress between 0 and 1
        scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);

        // 2. Map Progress to Video Time
        const newTime = scrollProgress * video.duration;
        video.currentTime = newTime;
        
        // 3. Fade out the prompt after scrolling begins
        if (scrollPrompt) {
            if (scrollPosition > 50) { // Fade out once scrolled past 50 pixels
                 scrollPrompt.style.opacity = '0';
            } else {
                 scrollPrompt.style.opacity = '1';
            }
        }
    }
    
    // --- Fallback/Error Handling ---
    video.addEventListener('error', () => {
        console.error("Error loading video. Check the file path and format.");
    });
});
