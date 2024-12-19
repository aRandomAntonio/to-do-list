"use strict";
let input = document.getElementById("inpute");
let button = document.getElementById("butao");
let boxes = [];
let images = [];
let texts = [];
let parentArray = [];
let ul;
let remove;
let rename;
let count = 1;
function add() {
    if (input.value) {
        let div = document.createElement("div");
        div.id = `parent${count}`;
        div.className = "parent";
        parentArray.push(div);
        div.innerHTML = count.toString();
        let box = document.createElement("input");
        box.setAttribute("type", "checkbox");
        box.id = `box${count}`;
        box.className = "box";
        boxes.push(box);
        div.appendChild(box);
        box.addEventListener("click", () => {
            verify(box);
        });
        let text = document.createElement("div");
        text.innerHTML = input.value;
        text.id = `text${count}`;
        text.className = "text";
        div.appendChild(text);
        texts.push(text);
        let img = document.createElement("img");
        img.src = "/public/img/3dots.png";
        img.id = `image${count}`;
        img.className = "img";
        img.addEventListener("click", (event) => {
            event.stopPropagation();
            open(img);
        });
        images.push(img);
        div.appendChild(img);
        document.body.appendChild(div);
        count++;
        input.value = "";
    }
}
function verify(box) {
    if (box.checked) {
        if (box.nextElementSibling && box.nextElementSibling.classList.contains('text')) {
            box.nextElementSibling.style.textDecoration = "line-through";
        }
    }
    else {
        if (box.nextElementSibling && box.nextElementSibling.classList.contains('text')) {
            box.nextElementSibling.style.textDecoration = "none";
        }
    }
}
function open(target) {
    let parentElement = target.parentElement;
    document.querySelectorAll("#ul").forEach(existingUl => existingUl.remove());
    ul = document.createElement("ul");
    remove = document.createElement("li");
    rename = document.createElement("li");
    ul.id = "ul";
    remove.id = "remove";
    remove.textContent = "Remove";
    rename.id = "rename";
    rename.textContent = "Rename";
    ul.appendChild(remove);
    ul.appendChild(rename);
    parentElement === null || parentElement === void 0 ? void 0 : parentElement.appendChild(ul);
    remove.addEventListener("click", function (event) {
        var _a;
        event.stopPropagation();
        let target = event.target;
        let parentElement = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (parentElement) {
            parentElement.remove();
            parentArray = parentArray.filter(item => item !== parentElement);
            let index = texts.findIndex(text => text.parentElement === parentElement);
            boxes.splice(index, 1);
            texts.splice(index, 1);
            images.splice(index, 1);
            count = 1;
            parentArray.forEach((parent, i) => {
                parent.innerHTML = "";
                parent.innerHTML = count.toString();
                let newBox = document.createElement("input");
                newBox.type = "checkbox";
                newBox.id = `box${count}`;
                newBox.className = "box";
                boxes[i] = newBox;
                newBox.addEventListener("click", () => {
                    verify(newBox);
                });
                let newText = document.createElement("div");
                newText.id = `text${count}`;
                newText.className = "text";
                newText.innerHTML = texts[i].innerHTML;
                texts[i] = newText;
                let newImg = document.createElement("img");
                newImg.src = "/public/img/3dots.png";
                newImg.id = `image${count}`;
                newImg.className = "img";
                newImg.addEventListener("click", (event) => {
                    event.stopPropagation();
                    open(newImg);
                });
                images[i] = newImg;
                parent.appendChild(newBox);
                parent.appendChild(newText);
                parent.appendChild(newImg);
                count++;
            });
        }
    });
    rename.addEventListener("click", function (event) {
        event.stopPropagation();
        changeName(target);
    });
}
function changeName(target) {
    let newName = document.createElement("input");
    newName.setAttribute("type", "text");
    let parent = target.parentElement;
    console.log(target);
    console.log(parent);
    let text = parent === null || parent === void 0 ? void 0 : parent.querySelector('.text');
    if (text) {
        newName.style.width = `100px`;
        text.replaceWith(newName);
        newName.focus();
        ul.remove();
        remove.remove();
        rename.remove();
        document.addEventListener("click", () => {
            parent === null || parent === void 0 ? void 0 : parent.replaceChild(text, newName);
        });
        newName.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                if (newName.value.trim()) {
                    let newText = document.createElement("div");
                    newText.innerHTML = newName.value;
                    newText.className = "text";
                    let textIndex = texts.findIndex(el => el === text);
                    if (textIndex !== -1) {
                        texts[textIndex] = newText;
                        parent === null || parent === void 0 ? void 0 : parent.replaceChild(newText, newName);
                    }
                }
                else {
                    parent === null || parent === void 0 ? void 0 : parent.replaceChild(text, newName);
                }
            }
        });
    }
}
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        add();
    }
});
button.addEventListener("click", () => {
    add();
});
document.addEventListener("click", (event) => {
    if (ul && !ul.contains(event.target)) {
        ul.remove();
        remove.remove();
        rename.remove();
    }
});
