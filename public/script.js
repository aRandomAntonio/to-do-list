var input = document.getElementById("inpute");
var button = document.getElementById("butao");
var boxes = [];
var images = [];
var texts = [];
var parentArray = [];
var ul;
var remove;
var rename;
var count = 1;
function add() {
    if (input.value) {
        var div = document.createElement("div");
        div.id = "parent".concat(count);
        div.className = "parent";
        parentArray.push(div);
        div.innerHTML = count.toString();
        var box_1 = document.createElement("input");
        box_1.setAttribute("type", "checkbox");
        box_1.id = "box".concat(count);
        box_1.className = "box";
        boxes.push(box_1);
        div.appendChild(box_1);
        box_1.addEventListener("click", function () {
            verify(box_1);
        });
        var text = document.createElement("div");
        text.innerHTML = input.value;
        text.id = "text".concat(count);
        text.className = "text";
        div.appendChild(text);
        texts.push(text);
        var img_1 = document.createElement("img");
        img_1.src = "img/3dots.png";
        img_1.id = "image".concat(count);
        img_1.className = "img";
        img_1.addEventListener("click", function (event) {
            event.stopPropagation();
            open(img_1);
        });
        images.push(img_1);
        div.appendChild(img_1);
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
    var parentElement = target.parentElement;
    document.querySelectorAll("#ul").forEach(function (existingUl) { return existingUl.remove(); });
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
        var target = event.target;
        var parentElement = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (parentElement) {
            parentElement.remove();
            parentArray = parentArray.filter(function (item) { return item !== parentElement; });
            var index = texts.findIndex(function (text) { return text.parentElement === parentElement; });
            boxes.splice(index, 1);
            texts.splice(index, 1);
            images.splice(index, 1);
            count = 1;
            parentArray.forEach(function (parent, i) {
                parent.innerHTML = "";
                parent.innerHTML = count.toString();
                var newBox = document.createElement("input");
                newBox.type = "checkbox";
                newBox.id = "box".concat(count);
                newBox.className = "box";
                boxes[i] = newBox;
                newBox.addEventListener("click", function () {
                    verify(newBox);
                });
                var newText = document.createElement("div");
                newText.id = "text".concat(count);
                newText.className = "text";
                newText.innerHTML = texts[i].innerHTML;
                texts[i] = newText;
                var newImg = document.createElement("img");
                newImg.src = "img/3dots.png";
                newImg.id = "image".concat(count);
                newImg.className = "img";
                newImg.addEventListener("click", function (event) {
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
    var newName = document.createElement("input");
    newName.setAttribute("type", "text");
    var parent = target.parentElement;
    console.log(target);
    console.log(parent);
    var text = parent === null || parent === void 0 ? void 0 : parent.querySelector('.text');
    if (text) {
        newName.style.width = "100px";
        text.replaceWith(newName);
        newName.focus();
        ul.remove();
        remove.remove();
        rename.remove();
        document.addEventListener("click", function () {
            parent === null || parent === void 0 ? void 0 : parent.replaceChild(text, newName);
        });
        newName.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                if (newName.value.trim()) {
                    var newText = document.createElement("div");
                    newText.innerHTML = newName.value;
                    newText.className = "text";
                    var textIndex = texts.findIndex(function (el) { return el === text; });
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
button.addEventListener("click", function () {
    add();
});
document.addEventListener("click", function (event) {
    if (ul && !ul.contains(event.target)) {
        ul.remove();
        remove.remove();
        rename.remove();
    }
});
