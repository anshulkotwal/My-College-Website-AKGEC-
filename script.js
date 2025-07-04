const slides = document.querySelectorAll('.slides img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;
let autoSlideInterval;

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

// Function to move to the next slide
function nextSlide() {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    showSlide(currentIndex);
}

// Function to move to the previous slide
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    showSlide(currentIndex);
    resetAutoSlide();  // Reset the auto-slide when user manually clicks
});

// Function to move to the next slide
nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();  // Reset the auto-slide when user manually clicks
});

// Automatically advance slides every 3 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

// Function to reset the auto-slide timer (used when clicking prev/next buttons)
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize the first slide
showSlide(currentIndex);
startAutoSlide();

document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.slide-track');
    const slides = document.querySelectorAll('.slide');
    let index = 0;
    const totalSlides = slides.length;

    // Clone first 4 slides to create a seamless loop
    for (let i = 0; i < 4; i++) {
        const clone = slides[i].cloneNode(true);
        track.appendChild(clone);
    }

    // Function to update the slide position
    function updateSlider() {
        index++;
        if (index > totalSlides) {
            index = 1; // Reset index to create the loop effect
            track.style.transition = 'none';
            track.style.transform = `translateX(0px)`;
            setTimeout(() => {
                track.style.transition = 'transform 1s ease-in-out';
                track.style.transform = `translateX(-${index * 25}%)`;
            }, 50);
        } else {
            track.style.transform = `translateX(-${index * 25}%)`;
        }
    }

    // Set interval for automatic slide transition
    setInterval(updateSlider, 3000); // 3000ms = 3 seconds
});

function updateOptions(selectElement) {
    const selectedValue = selectElement.value;

    if (selectedValue === "societies") {
        selectElement.innerHTML = `
            <option value="#">Select Society</option>
            <option value="departmental-societies">Departmental Societies</option>
            <option value="extra-curricular-societies">Extra-Curricular Societies</option>
            <option value="students-chapter">Students Chapter</option>
            <option value="#" disabled>------------------</option>
            <option value="events">Events</option>
            <option value="responsibilities">Social Responsibilities</option>
            <option value="hostels">Hostels</option>
            <option value="medical">Medical</option>
        `;
    } else {
        // Reset to the main options if another option is selected
        selectElement.innerHTML = `
            <option value="#">LIFE@AKGEC</option>
            <option value="societies">Societies</option>
            <option value="events">Events</option>
            <option value="responsibilities">Social Responsibilities</option>
            <option value="hostels">Hostels</option>
            <option value="medical">Medical</option>
        `;
        
        // Redirect to the selected option if it's not Societies
        if (selectedValue !== "#") {
            location = selectedValue;
        }
    }
}