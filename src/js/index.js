import './../styles/styles.css'

const stateOne = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace"],
  ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "del"],
  ["capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter"],
  ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "ᐃ", "shift"],
  ["ctrl", "win", "alt", " ", "alt", "ᐊ", "ᐁ", "ᐅ", "ctrl"]
]

const stateOneRU = [
  ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace"],
  ["tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "del"],
  ["capslock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter"],
  ["shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "ᐃ", "shift"],
  ["ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace"]
]

const stateSpecialKeys = [
  ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace"],
  ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "|", "del"],
  ["capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "enter"],
  ["shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "ᐃ", "shift"]
]


const codeKeys = [
  ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
  ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash", "Delete"],
  ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
  ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
  ["ControlLeft", "Win", "AltLeft", "Space", "AltRight", "ArrowLeft", "ArrowDown", "ArrowRight", "ControlRight"]
]

function createElem(elem, tag, className, inner) {
  elem = document.createElement(tag);
  elem.className = className;
  document.body.append(elem);
  if (inner) {
      elem.innerHTML = inner;
  }
}

createElem("header", "header", "header", "Virtual KeyBoard");
createElem("textArea", "textarea", "textarea");
createElem("keyBoard", "div", "keyboard");

const virtualKeyBoard = () => {

  const init = () => {
      for (let i = 0; i < 5; i++) {    
          let container = document.querySelector(".keyboard");
          let row = document.createElement("div");

          row.className = "k_row";
          container.prepend(row);

          let keyRow = document.querySelector(".k_row");

          const initRowKeys = (rowName, className) => {
              for (let j = 0; j < rowName.length; j++) {
                  let keycreateElem = document.createElement("div");
                  keycreateElem.className = "k_row_key";
                  keycreateElem.classList.add(className[j]);
                  keycreateElem.innerHTML = rowName[j];
                  keyRow.append(keycreateElem);
              }
          }

          if(i == 0) initRowKeys(stateOne[4], codeKeys[4]);
          if(i == 1) initRowKeys(stateOne[3], codeKeys[3]);
          if(i == 2) initRowKeys(stateOne[2], codeKeys[2]);
          if(i == 3) initRowKeys(stateOne[1], codeKeys[1]);
          if(i == 4) initRowKeys(stateOne[0], codeKeys[0]);

      }
  };


  const render = () => {
    let textArea = document.querySelector(".textarea");
    let buttons = document.querySelectorAll(".k_row_key");
    
      for (let button of buttons) {
          if (!button.classList.contains("Delete") && !button.classList.contains("Win") && !button.classList.contains("ArrowUp") && +
          !button.classList.contains("ArrowLeft") && !button.classList.contains("ArrowDown") && !button.classList.contains("ArrowRight")) {
              button.onclick = () => {
                  textArea.textContent += button.textContent;

                  if(button.classList.contains("Enter")) textArea.textContent = textArea.textContent.slice(0, -5) + "\n" ;
                  else if (button.classList.contains("Backspace")) textArea.textContent = textArea.textContent.slice(0, -10);
                  else if (button.classList.contains("Tab")) textArea.textContent = textArea.textContent.slice(0, -3) + "     ";
                  else if (button.classList.contains("CapsLock")) {button.classList.toggle("active"); textArea.textContent = textArea.textContent.slice(0, -8);}
                  else if ((button.classList.contains("AltLeft")) || (button.classList.contains("AltRight"))) {button.classList.toggle("active");textArea.textContent = textArea.textContent.slice(0, -3);}
                  else if ((button.classList.contains("ControlLeft")) || (button.classList.contains("ControlRight"))){button.classList.toggle("active");textArea.textContent = textArea.textContent.slice(0, -4);}
                  else if ((button.classList.contains("ShiftLeft")) || (button.classList.contains("ShiftRight"))){button.classList.toggle("active");textArea.textContent = textArea.textContent.slice(0, -5);}
                  
              };
              
              let caps = document.querySelector(".CapsLock");
              let ShiftL = document.querySelector(".ShiftLeft");
              let ShiftR = document.querySelector(".ShiftRight");
              let CtrlL = document.querySelector(".ControlLeft");
              let AltL = document.querySelector(".AltLeft");

              document.addEventListener("click", () => {

                  if ((!CtrlL.classList.contains("active")) || (!AltL.classList.contains("active"))) {

                      if ((ShiftL.classList.contains("active")) || (ShiftR.classList.contains("active"))) {
                          
                          for (let j = 0; j < stateSpecialKeys[0].length - 1; j++) {
                              if (button.classList.contains(codeKeys[0][j])) button.textContent = button.textContent.slice(0, -1) + stateSpecialKeys[0][j];
                          }

                          for (let j = 1; j < codeKeys[1].length - 1; j++) {
                              if (button.classList.contains(codeKeys[1][j])) button.textContent = button.textContent.slice(0, -1) + stateSpecialKeys[1][j];
                          }

                          for (let j = 1; j < codeKeys[2].length - 1; j++) {
                              if (button.classList.contains(codeKeys[2][j])) button.textContent = button.textContent.slice(0, -1) + stateSpecialKeys[2][j];
                          }

                          for (let j = 1; j < codeKeys[3].length - 2; j++) {
                              if (button.classList.contains(codeKeys[3][j])) button.textContent = button.textContent.slice(0, -1) + stateSpecialKeys[3][j];
                          }
                          button.textContent = button.textContent.toUpperCase();
                      } else {
                          for (let j = 0; j < stateOne[0].length - 1; j++) {
                              if (button.classList.contains(codeKeys[0][j])) button.textContent = button.textContent.slice(0, -1) + stateOne[0][j];
                          }

                          for (let j = 1; j < codeKeys[1].length - 1; j++) {
                              if (button.classList.contains(codeKeys[1][j])) button.textContent = button.textContent.slice(0, -1) + stateOne[1][j];
                          }

                          for (let j = 1; j < codeKeys[2].length - 1; j++) {
                              if (button.classList.contains(codeKeys[2][j])) button.textContent = button.textContent.slice(0, -1) + stateOne[2][j];
                          }

                          for (let j = 1; j < codeKeys[3].length - 2; j++) {
                              if (button.classList.contains(codeKeys[3][j])) button.textContent = button.textContent.slice(0, -1) + stateOne[3][j];
                          }
                      }
                  } else {
                      for (let j = 0; j < stateOne[0].length - 1; j++) {
                          if (button.classList.contains(codeKeys[0][j])) button.textContent = button.textContent.slice(0, -1) + stateOneRU[0][j];
                      }
                      
                      for (let j = 1; j < stateOne[1].length - 1; j++) {
                          if (button.classList.contains(codeKeys[1][j])) button.textContent = button.textContent.slice(0, -1) + stateOneRU[1][j];
                      }

                      for (let j = 1; j < stateOne[2].length - 1; j++) {
                          if (button.classList.contains(codeKeys[2][j])) button.textContent = button.textContent.slice(0, -1) + stateOneRU[2][j];
                      }

                      for (let j = 1; j < stateOne[3].length - 2; j++) {
                          if (button.classList.contains(codeKeys[3][j])) button.textContent = button.textContent.slice(0, -1) + stateOneRU[3][j];
                      }

                      if (ShiftL.classList.contains("active")) {
                         
                          for (let j = 1; j < stateOne[0].length - 1; j++) {
                              if (button.classList.contains(codeKeys[0][j])) button.textContent = button.textContent.slice(0, -1) + stateOneRU[j];
                          }

                          if (button.classList.contains("Backslash")) button.textContent = button.textContent.slice(0, -1) + "/";

                          if (button.classList.contains("Slash")) button.textContent = button.textContent.slice(0, -1) + ",";

                      }
                  }

                  if ((caps.classList.contains("active")) 
                        || (ShiftL.classList.contains("active")) 
                        || (ShiftR.classList.contains("active"))) {
                      if (button.textContent !== "ctrl" 
                            && button.textContent !== "alt" 
                            && button.textContent !== "capslock" 
                            && button.textContent !== "shift" 
                            && button.textContent !== "tab" 
                            && button.textContent !== "enter" 
                            && button.textContent !== "backspace") button.textContent = button.textContent.toUpperCase();
                  } else {
                      button.textContent = button.textContent.toLowerCase();
                  }
              });
          }
      }
  };
  function addListeners() {

    let keyPh = document.querySelectorAll(".k_row_key");
    let textArea = document.querySelector(".textarea");
    let arrKeys = Array.from(keyPh);

    document.addEventListener("keydown", (event) => {
        event.preventDefault();
        textArea.focus();
        const key = arrKeys.find(it => it.classList.contains(event.code))
        key.classList.add("active");
        textArea.focus();
        
        if (event.ctrlKey || event.shiftKey || event.altKey || event.code == "CapsLock" || event.code == "Tab" || event.code == "Backspace" || event.code == "Delete" || event.code == "Enter") {
            textArea.textContent += "";
        } else {
            textArea.textContent += key.textContent;
        }
    });

    document.addEventListener("keyup", (event) => {
            const key = arrKeys.find(it =>
                it.classList.contains(event.code))
            key.classList.remove("active");
            textArea.focus();
        });
}


  init();
  render();
  addListeners();
};

virtualKeyBoard();
createElem("description", "div", "description", "Windows </br> Для переключения языка комбинация: левые alt + ctrl"); 
