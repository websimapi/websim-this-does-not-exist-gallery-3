document.addEventListener('DOMContentLoaded', function() {
    // Gallery data
    const galleryItems = [
        {
            title: "This Minigame Idea Does Not Exist",
            url: "https://websim.ai/@api/this-minigame-idea-does-not-exist",
            description: "AI-generated minigame concepts that have never been created."
        },
        {
            title: "This Programming Language Does Not Exist",
            url: "https://websim.ai/@api/this-programming-language-does-not-exist",
            description: "Fictional programming languages with their own syntax and features."
        },
        {
            title: "This Date Does Not Exist",
            url: "https://websim.ai/@api/this-date-does-not-exist",
            description: "Dating profiles for people who are entirely AI generated."
        },
        {
            title: "This Soda Does Not Exist",
            url: "https://websim.ai/@api/this-soda-does-not-exist",
            description: "Beverage brands and flavors created purely by artificial intelligence."
        },
        {
            title: "This Cat Does Not Exist",
            url: "https://websim.ai/@api/this-cat-does-not-exist",
            description: "AI-generated feline friends that only exist in the digital realm."
        },
        {
            title: "This Wireframe Does Not Exist",
            url: "https://websim.ai/@api/this-wireframe-does-not-exist/1",
            description: "UI/UX design concepts created entirely by artificial intelligence."
        },
        {
            title: "This Classic Arcade Game Does Not Exist",
            url: "https://websim.ai/@api/this-classic-arcade-game-does-not-exist/",
            description: "Fictional arcade games that seem familiar but never actually existed."
        },
        {
            title: "This Slideshow Cartoon Does Not Exist",
            url: "https://websim.ai/@api/this-slideshow-cartoon-does-not-exist",
            description: "AI-generated cartoons and animations that push the boundaries of imagination."
        }
    ];

    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalIframe = document.getElementById('modal-iframe');
    const closeModal = document.getElementById('close-modal');

    // Create gallery items
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-url', item.url);
        galleryItem.setAttribute('aria-label', item.description);
        
        const iframe = document.createElement('iframe');
        iframe.src = item.url;
        iframe.title = item.title;
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'gallery-title';
        titleDiv.textContent = item.title;
        
        galleryItem.appendChild(iframe);
        galleryItem.appendChild(titleDiv);
        gallery.appendChild(galleryItem);
        
        // Add click event to open modal
        galleryItem.addEventListener('click', function() {
            openModal(this.getAttribute('data-url'), item.title);
        });
    });

    // Open modal with selected content
    function openModal(url, title) {
        modalIframe.src = url;
        modalIframe.title = title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        
        // Add fullscreen capability
        modalIframe.setAttribute('allowfullscreen', 'true');
        modalIframe.setAttribute('allow', 'fullscreen');
    }

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        modalIframe.src = '';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalIframe.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            modalIframe.src = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Add intersection observer for lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    delete iframe.dataset.src;
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px'
    });

    document.querySelectorAll('.gallery-item').forEach(item => {
        lazyLoadObserver.observe(item);
    });
});

