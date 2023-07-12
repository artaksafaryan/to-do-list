let container = document.getElementById("container");
let button = document.getElementById("button");
let input = document.getElementById("input");
let completedOption = document.getElementById("completed");
let uncompletedOption = document.getElementById("uncompleted");
let items = JSON.parse(localStorage.getItem('items')) || [];

button.addEventListener('click', function () {
    if (input.value !== "") {
        let div = document.createElement('div');
        container.appendChild(div);

        let p = document.createElement('p');
        p.innerHTML = input.value;
        p.style.backgroundColor = "white"; // Set default background color
        div.appendChild(p);
        items.push({ value: input.value, color: "white" }); // Save background color
        input.value = "";

        let buttonOk = document.createElement("button");
        buttonOk.innerHTML = "Done";
        let buttonNo = document.createElement("button");
        buttonNo.innerHTML = "Delete";
        div.appendChild(buttonOk);
        div.appendChild(buttonNo);

        buttonOk.addEventListener("click", function () {
            if (p.style.backgroundColor !== "green") {
                p.style.backgroundColor = "green";
                updateItemColor(p.innerHTML, "green"); // Update background color in items array
            } else {
                p.style.backgroundColor = "white";
                updateItemColor(p.innerHTML, "white"); // Update background color in items array
            }
        });
        localStorage.setItem("items", JSON.stringify(items));

        buttonNo.addEventListener("click", function () {
            div.remove();
            let index = items.findIndex(item => item.value === p.innerHTML);
            if (index > -1) {
                items.splice(index, 1);
                localStorage.setItem("items", JSON.stringify(items));
            }
        });
    }
});
function render() {
    for (let item of items) {
        let div = document.createElement('div');
        container.appendChild(div);

        let p = document.createElement('p');
        p.innerHTML = item.value;
        p.style.backgroundColor = item.color;
        div.appendChild(p);

        let buttonOk = document.createElement("button");
        buttonOk.innerHTML = "Done";
        let buttonNo = document.createElement("button");
        buttonNo.innerHTML = "Delete";
        div.appendChild(buttonOk);
        div.appendChild(buttonNo);

        buttonOk.addEventListener("click", function () {
            if (p.style.backgroundColor !== "green") {
                p.style.backgroundColor = "green";
                updateItemColor(item.value, "green");
            } else {
                p.style.backgroundColor = "white";
                updateItemColor(item.value, "white");
            }
        });

        buttonNo.addEventListener("click", function () {
            div.remove();
            let index = items.findIndex(element => element.value === item.value);
            items.splice(index, 1);
            localStorage.setItem("items", JSON.stringify(items));
        });
    }
}
render();
function updateItemColor(value, color) {
    let index = items.findIndex(item => item.value === value);
    if (index > -1) {
        items[index].color = color;
        localStorage.setItem("items", JSON.stringify(items));
    }
}




 