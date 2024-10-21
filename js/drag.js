document.addEventListener('DOMContentLoaded', (event) => {
    const draggables = document.querySelectorAll('.draggable');
    const dropArea = document.getElementById('drop-area');
    const addItemButton = document.getElementById('add-new-item');
    const itemSelector = document.getElementById('item-selector');
    const previewImg = document.getElementById('preview-img');

    // Function to handle drag start
    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }

    // Function to handle drag over
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    // Function to handle drop
    function handleDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(id);
        draggableElement.classList.remove('hide');
        const afterElement = getDragAfterElement(dropArea, e.clientX);
        if (afterElement == null) {
            dropArea.appendChild(draggableElement);
        } else {
            dropArea.insertBefore(draggableElement, afterElement);
        }
        e.dataTransfer.clearData();
    }

    // Function to get the element after which the dragged element should be placed
    function getDragAfterElement(container, x) {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.hide)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Add event listeners to existing draggable items
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
    });

    // Add event listeners to drop area
    dropArea.addEventListener('dragover', handleDragOver);
    dropArea.addEventListener('drop', handleDrop);

    // Function to add new item
    addItemButton.addEventListener('click', () => {
        const selectedItem = itemSelector.options[itemSelector.selectedIndex];
        const imgSrc = selectedItem.getAttribute('data-img');
        const newItem = document.createElement('img');
        newItem.src = imgSrc;
        newItem.alt = selectedItem.value;
        newItem.classList.add('draggable');
        newItem.setAttribute('draggable', 'true');
        newItem.id = `item-${Date.now()}`; // Unique ID for each item

        // Add event listener for drag start
        newItem.addEventListener('dragstart', handleDragStart);

        // Append new item to the drop area
        dropArea.appendChild(newItem);

        // Add event listeners for drag and drop
        newItem.addEventListener('dragstart', handleDragStart);
        newItem.addEventListener('dragover', handleDragOver);
        newItem.addEventListener('drop', handleDrop);
    });

    // Function to update image preview
    itemSelector.addEventListener('change', () => {
        const selectedItem = itemSelector.options[itemSelector.selectedIndex];
        const imgSrc = selectedItem.getAttribute('data-img');
        if (imgSrc) {
            previewImg.src = imgSrc;
            previewImg.style.display = 'block';
        } else {
            previewImg.style.display = 'none';
        }
    });
});