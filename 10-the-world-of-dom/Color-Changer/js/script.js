document.addEventListener("DOMContentLoaded", function () {
  const colorBox = document.getElementById("color-box");
  const changeColorBtn = document.getElementById("change-color-btn");

  /**
   * Generates a random color in hexadecimal format
   * @returns {string} The generated color, e.g. "#4F7ED4"
   */
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  changeColorBtn.addEventListener("click", function () {
    const randomColor = getRandomColor();
    colorBox.style.backgroundColor = randomColor;
  });
});
