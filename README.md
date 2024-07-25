# Simple Flashcards Template in JavaScript

### Overview

This repository provides a template for creating simple flashcards using JavaScript. No additional packages are required—just a browser and a text editor.

### How to Use

1. **Clone the Repository**: Clone the repository to your local machine using the following command:

    ```bash
    git clone https://github.com/feenix100/flashcards.git
    ```

2. **Create Flashcard Sets**: Duplicate the `flashcards_Blank_Template` folder if you need multiple sets of flashcards.

3. **Edit Flashcards**: Open and modify the `script.js` file within the `flashcards_Blank_Template` folder.

4. **Add Questions**: Use the following format to add your questions and answers:

    ```javascript
    const flashcards = [
        { question: "Your question here", answer: "Your answer here" },
        // Add more flashcards as needed
    ];
    ```

5. **Preview Flashcards**: Open `index.html` in a browser to view and interact with your flashcards.

6. **Customize Appearance**: Modify `styles.css` to adjust the look and feel of your flashcards.

7. **Optional Support**: Send a blank check if you feel so inclined (just kidding, but support is always appreciated!).

### Example Files

#### `script.js`

```javascript
// script.js
const flashcards = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    // Add more flashcards here
];

function displayFlashcards() {
    // JavaScript code to display flashcards
}
```

#### `index.html`

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flashcards</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="flashcard-container">
        <h1>Flashcards</h1>
        <div id="flashcard"></div>
        <button id="next-button">Next</button>
    </div>
    <script src="script.js"></script>
    <script>
        // Initialize flashcards
        displayFlashcards();
    </script>
</body>
</html>
```

#### `styles.css`

```css
/* styles.css */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
}

#flashcard-container {
    width: 60%;
    margin: auto;
    padding: 20px;
    background: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

button {
    padding: 10px;
    margin: 10px 0;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
```

Enjoy creating and customizing your own flashcards!
