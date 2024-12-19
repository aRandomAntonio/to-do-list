let input = document.getElementById("inpute") as HTMLInputElement;
let button = document.getElementById("butao") as HTMLButtonElement;

let boxes: HTMLInputElement[] = [];
let images: HTMLImageElement[] = [];
let texts: HTMLDivElement[] = [];
let parentArray: HTMLDivElement[] = [];

let ul: HTMLUListElement;
let remove: HTMLLIElement;
let rename: HTMLLIElement;

let count: number = 1;


function add(): void {
    if (input.value) {
        let div = document.createElement("div") as HTMLDivElement;
        div.id = `parent${count}`;
        div.className = "parent";
        
        parentArray.push(div);

        div.innerHTML = count.toString();

        let box = document.createElement("input") as HTMLInputElement;
        box.setAttribute("type", "checkbox");
        box.id = `box${count}`;
        box.className = "box";
        boxes.push(box);
        div.appendChild(box);
        box.addEventListener("click", (): void => {
            verify(box);
        });

        let text = document.createElement("div") as HTMLDivElement;
        text.innerHTML = input.value;
        text.id = `text${count}`;
        text.className = "text";
        div.appendChild(text);
        texts.push(text);

        let img = document.createElement("img") as HTMLImageElement;
        img.src = "img/3dots.png";
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

function verify(box: any): void {
    if (box.checked) {
        if (box.nextElementSibling && box.nextElementSibling.classList.contains('text')) {
            box.nextElementSibling.style.textDecoration = "line-through";
        }
    } else {
        if (box.nextElementSibling && box.nextElementSibling.classList.contains('text')) {
            box.nextElementSibling.style.textDecoration = "none";
        }
    }
}

function open(target: HTMLElement): void {
    let parentElement = target.parentElement;
    
    document.querySelectorAll("#ul").forEach(existingUl => existingUl.remove());

    ul = document.createElement("ul") as HTMLUListElement;
    remove = document.createElement("li") as HTMLLIElement;
    rename = document.createElement("li") as HTMLLIElement;
    ul.id = "ul";
    remove.id = "remove";
    remove.textContent = "Remove";
    rename.id = "rename";
    rename.textContent = "Rename";
    ul.appendChild(remove);
    ul.appendChild(rename);
    parentElement?.appendChild(ul);

    remove.addEventListener("click", function (event: any): void {
        event.stopPropagation();
        let target = event.target as HTMLElement;
        let parentElement = target.parentElement?.parentElement;
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
                newBox.addEventListener("click", (): void => {
                    verify(newBox);
                });


                let newText = document.createElement("div");
                newText.id = `text${count}`;
                newText.className = "text";
                newText.innerHTML = texts[i].innerHTML;
                texts[i] = newText;

                let newImg = document.createElement("img");
                newImg.src = "/public/img/3dots.img";
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

    rename.addEventListener("click", function (event: any): void {
        event.stopPropagation();
        changeName(target);
    });
}

function changeName(target: HTMLElement): void {
    let newName = document.createElement("input") as HTMLInputElement;
    newName.setAttribute("type", "text");
    let parent = target.parentElement;
    console.log(target);
    console.log(parent);
    let text = parent?.querySelector('.text');

    if (text) {
        newName.style.width = `100px`;
        text.replaceWith(newName);
        newName.focus();

        ul.remove();
        remove.remove();
        rename.remove();

        document.addEventListener("click", (): void => {
            parent?.replaceChild(text, newName);
        });

        newName.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                if (newName.value.trim()) {
                    let newText = document.createElement("div") as HTMLDivElement;
                    newText.innerHTML = newName.value;
                    newText.className = "text";

                    let textIndex = texts.findIndex(el => el === text);

                    if (textIndex !== -1) {
                        texts[textIndex] = newText;
                        parent?.replaceChild(newText, newName);
                    }
                } else {
                    parent?.replaceChild(text, newName);
                }
            }
        });
    }
}

input.addEventListener("keydown", function (event): void {
    if (event.key === "Enter") {
        add();
    }
});

button.addEventListener("click", () => {
    add();
});

document.addEventListener("click", (event) => {
    if (ul && !ul.contains(event.target as Node)) {
        ul.remove();
        remove.remove();
        rename.remove();
    }
});
