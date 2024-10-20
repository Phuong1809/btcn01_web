document.addEventListener('DOMContentLoaded', function () {
    let originalText = document.getElementById('text-content').innerHTML;
    let originalStyles = {
        color: document.getElementById('text-content').style.color,
        backgroundColor: document.getElementById('text-content').style.backgroundColor,
        fontWeight: document.getElementById('text-content').style.fontWeight,
        fontStyle: document.getElementById('text-content').style.fontStyle,
        textDecoration: document.getElementById('text-content').style.textDecoration
    };

    document.getElementById('highlight').addEventListener('click', highlightText);
    document.getElementById('delete').addEventListener('click', deleteText);
    document.getElementById('reset').addEventListener('click', resetText);
    document.getElementById('apply-sample-text').addEventListener('click', applySampleText);

    function highlightText() {
        let regexInput = document.getElementById('text-input').value;
        console.log("Regex Input: ", regexInput); // Debugging line
        let regex = new RegExp(regexInput, 'gi');
        console.log("Regex: ", regex); // Debugging line
        let textElement = document.getElementById('text-content');
        let text = textElement.textContent;

        // Replace matched text with highlighted text
        text = text.replace(regex, function(match) {
            return `<span class="highlight">${match}</span>`;
        });

        textElement.innerHTML = text;
    }

    function deleteText() {
        let regexInput = document.getElementById('text-input').value;
        console.log("Regex Input for Delete: ", regexInput); // Debugging line
        let regex = new RegExp(regexInput, 'gi');
        console.log("Regex for Delete: ", regex); // Debugging line
        let textElement = document.getElementById('text-content');
        let text = textElement.innerHTML;

        // Remove matched text
        text = text.replace(regex, '');

        textElement.innerHTML = text;
    }

    function resetText() {
        let textContentElement = document.getElementById('text-content');
        textContentElement.innerHTML = originalText;
        textContentElement.style.color = originalStyles.color;
        textContentElement.style.backgroundColor = originalStyles.backgroundColor;
        textContentElement.style.fontWeight = originalStyles.fontWeight;
        textContentElement.style.fontStyle = originalStyles.fontStyle;
        textContentElement.style.textDecoration = originalStyles.textDecoration;
        document.getElementById('text-input').value = '';
    }

    function applySampleText() {
        let fontColor = document.getElementById('font-color').value;
        let backgroundColor = document.getElementById('background-color').value;
        let bold = document.getElementById('bold').checked ? 'bold' : 'normal';
        let italic = document.getElementById('italic').checked ? 'italic' : 'normal';
        let underline = document.getElementById('underline').checked ? 'underline' : 'none';

        let textContentElement = document.getElementById('text-content');
        textContentElement.style.color = fontColor;
        textContentElement.style.backgroundColor = backgroundColor;
        textContentElement.style.fontWeight = bold;
        textContentElement.style.fontStyle = italic;
        textContentElement.style.textDecoration = underline;

        // Debugging lines
        console.log("Font Color: ", fontColor);
        console.log("Background Color: ", backgroundColor);
        console.log("Bold: ", bold);
        console.log("Italic: ", italic);
        console.log("Underline: ", underline);
    }
});