document.addEventListener("DOMContentLoaded", () => {
    const inventoryForm = document.getElementById("inventoryForm");
    const inventoryTable = document.getElementById("inventoryTable");
    const saveInventoryButton = document.getElementById("saveInventory");
    const viewInventoryButton = document.getElementById("viewInventory");

    let inventory = [];

    // Add inventory item
    inventoryForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const milkQuantity = document.getElementById("milkQuantity").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const pricePerUnit = document.getElementById("pricePerUnit").value;

        // Format time to include AM/PM
        const formattedTime = formatTime(time);

        const newItem = {
            milkQuantity,
            date,
            time: formattedTime,
            pricePerUnit,
        };

        inventory.push(newItem);
        updateTable();
        inventoryForm.reset();
    });

    // Function to format time with AM/PM
    function formatTime(time) {
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
        return `${formattedHours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
    }

    // Update inventory table
    function updateTable() {
        inventoryTable.innerHTML = "";
        inventory.forEach((item, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.milkQuantity}</td>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td>${item.pricePerUnit}</td>
                <td class="actions">
                    <button onclick="deleteItem(${index})">Delete</button>
                </td>
            `;

            inventoryTable.appendChild(row);
        });
    }

    // Delete inventory item
    window.deleteItem = (index) => {
        inventory.splice(index, 1);
        updateTable();
    };

    // Save inventory to localStorage
    saveInventoryButton.addEventListener("click", () => {
        localStorage.setItem("milkInventory", JSON.stringify(inventory));
        alert("Inventory saved successfully!");
    });

    // View inventory from localStorage
    viewInventoryButton.addEventListener("click", () => {
        const savedInventory = localStorage.getItem("milkInventory");
        if (savedInventory) {
            inventory = JSON.parse(savedInventory);
            updateTable();
        } else {
            alert("No saved inventory found!");
        }
    });
});
