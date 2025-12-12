document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('f1-video');
    const scrollTarget = document.getElementById('scroll-target');
    const scrubSpace = document.querySelector('.scrub-space'); // The tall element that drives the scroll
    
    // --- Initial Setup and Event Listeners ---
    
    // We must wait for the video to load metadata to get the duration
    video.addEventListener('loadedmetadata', () => {
        // Pause the video immediately so we can control it with scrolling
        video.pause(); 
        
        // Get the actual duration once metadata is available
        const actualDuration = video.duration;
        console.log(`Video loaded. Duration: ${actualDuration} seconds.`);

        // Add the main scroll event listener
        window.addEventListener('scroll', updateVideo);

        // Run once on load to set the initial frame
        updateVideo();
    });

    // --- Core Scrubbing Function ---

    function updateVideo() {
        // 1. Calculate Scroll Metrics
        const scrollPosition = window.scrollY; // Current vertical scroll position
        
        // The total distance the user needs to scroll to complete the video animation
        // We use the height of the specific scrub-space section
        // window.innerHeight is subtracted because the video should finish playing 
        // when the *bottom* of the screen reaches the end of the scroll-space.
        const maxScroll = scrubSpace.offsetHeight - window.innerHeight; 

        // Get the starting position of the scroll-space element
        const startScroll = scrubSpace.offsetTop; 
        
        // 2. Calculate Progress (0.0 to 1.0)
        
        // The scroll position relative to the start of the scrub-space
        const relativeScroll = scrollPosition - startScroll;
        
        // Calculate the progress: relativeScroll divided by the total distance to scroll
        let scrollProgress = relativeScroll / maxScroll;

        // Clamp the progress between 0 and 1 (0% to 100%)
        scrollProgress = Math.min(Math.max(scrollProgress, 0), 1);

        // 3. Map Progress to Video Time
        
        // Map the scroll progress (0-1) to the video's time (0 to actualDuration)
        const newTime = scrollProgress * actualDuration;

        // Update the video's playback time
        video.currentTime = newTime;
        
        // 4. Optional: Text Overlay Visibility
        updateTextOverlays(scrollProgress);
    }
    
    // --- Function to Handle Text Overlays ---
    
    function updateTextOverlays(progress) {
        const overlays = document.querySelectorAll('.overlay-text');
        
        overlays.forEach(overlay => {
            // Get the custom CSS variables defined in index.html (e.g., 10%)
            const startPercentage = parseFloat(overlay.style.getPropertyValue('--scroll-start')) / 100;
            const endPercentage = parseFloat(overlay.style.getPropertyValue('--scroll-end')) / 100;

            // Check if the current scroll progress is within the overlay's display range
            if (progress >= startPercentage && progress <= endPercentage) {
                overlay.style.opacity = '1';
                
                // Optional: Fine-tune the vertical position of the text
                // Centers the text based on its defined scroll window
                const centerPercentage = (startPercentage + endPercentage) / 2;
                overlay.style.top = `${centerPercentage * 100}%`;
                
            } else {
                overlay.style.opacity = '0';
            }
        });
    }


    // --- Fallback/Error Handling ---
    
    video.addEventListener('error', () => {
        console.error("Error loading video. Check the file path and format.");
        alert("There was an error loading the video file. Please check the console for details.");
    });
    
    // A check to ensure the video loads properly
    if (video.readyState < 2) {
        console.log("Video not ready yet. Waiting for metadata...");
    }
});
