// Define furniture objects
var bed = {
    name: "Bed",
    width: 100,
    height: 50,
    color: "blue"
};
var chair = {
    name: "Chair",
    width: 20,
    height: 30,
    color: "red"
};
var table = {
    name: "Table",
    width: 50,
    height: 40,
    color: "green"
};
// Define room object
var room = {
    width: 500,
    height: 500,
    furniture: []
};
// Add event listeners to tools
document.getElementById("add-bed").addEventListener("click", function() {
    room.furniture.push(bed);
    generateRoomLayout();
});
document.getElementById("add-chair").addEventListener("click", function() {
    room.furniture.push(chair);
    generateRoomLayout();
});
document.getElementById("add-table").addEventListener("click", function() {
    room.furniture.push(table);
    generateRoomLayout();
});
// Generate room layout
function generateRoomLayout() {
    var roomElement = document.querySelector(".room");
    roomElement.innerHTML = "";
    for (var i = 0; i < room.furniture.length; i++) {
        var furnitureElement = document.createElement("div");
        furnitureElement.classList.add("furniture");
        furnitureElement.style.width = room.furniture[i].width + "px";
        furnitureElement.style.height = room.furniture[i].height + "px";
        furnitureElement.style.backgroundColor = room.furniture[i].color;
        furnitureElement.textContent = room.furniture[i].name;
        roomElement.appendChild(furnitureElement);
    }
}