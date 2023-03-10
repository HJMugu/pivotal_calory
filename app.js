const ItemCtrl = (function() {
    // private




    // ItemCtrl module constructor
    const Item = function (id, name, calories) {
        this.id = id
        this.name = name
        this.calories = calories
    }




    // data structure
    const data = {
        items: [

        ],
        total: 0,
        currentItem: null
    }





    // public


    return {
        logData: function () {
            return data
        },
        getItems: function() {
            return data.items
        },
        getTotalCalories: function() {
            let total = 0
            data.items.forEach(function(item) {
                total += item.calories
            })
            data.total = total
            return data.total
        },
        addItem: function (name, calories) {
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0;
            }
            return ItemCtrl.addItemWithId(ID, name, calories)
        },
        addItemWithId: function (id, name, calories) {
            calories = parseInt(calories)
            let newItem = new Item(id, name, calories)
            data.items.push(newItem)
            return newItem
        },
        getItem: function (id) {
            let found = null
            ItemCtrl.getItems().forEach(function (item) {
                if (id === item.id) {
                    found = item
                }
            })
            return found
        },
        setCurrentItem: function (item) {
            data.currentItem = item
        },
        getCurrentItem: function () {
            return data.currentItem
        },
        updateItem: function (name, calories) {
            let updatedElement = null
            data.items.forEach(function(item) {
                if (item.id === data.currentItem.id) {
                    item.name = name
                    item.calories = parseInt(calories)
                    updatedElement = item
                }
            })
            return updatedElement
        },
        deleteItem: function () {
            let deletedElement = null
            data.items.forEach(function (item, idx) {
                if (item.id === data.currentItem.id) {
                    deletedElement = item
                    data.items.splice(idx, 1)
                }
            })
            return deletedElement
        },


        deleteAllItems: function() {
        data.items = []
        data.currentItem = null

            }
    }
})();







// Storage Controller


const StorageCtrl = (function () {
    return {
        storeItem: function (item) {
            let items
            if (localStorage.getItem("items") === null) {
                items = []
            } else{
                items = JSON.parse(localStorage.getItem("items"))
            }
            items.push(item)
            localStorage.setItem("items", JSON.stringify(items))
        },
        getItemsFromStorage: function () {
            let items
            if (localStorage.getItem("items") === null) {
                items = []
            } else{
                items = JSON.parse(localStorage.getItem("items"))
            }
            return items
        },
        updateLocalStorage: function(item) {
            let items
            if (localStorage.getItem("items") === null) {
                items = []
            } else{
                items = JSON.parse(localStorage.getItem("items"))
            }
            items.forEach(function (itemFromStorage, idx) {
                if (itemFromStorage.id === item.id) {
                    items.splice(idx, 1, item)
                }
            })
            localStorage.setItem("items", JSON.stringify(items))
        },

        deleteFromLocalStorage: function(deletedItem) {
            let items
            if (localStorage.getItem("items") === null) {
                items = []
            } else{
                items = JSON.parse(localStorage.getItem("items"))
            }
            items.forEach(function (itemFromStorage, idx) {
                if (itemFromStorage.id === deletedItem.id) {
                    items.splice(idx, 1)
                }
            })
            localStorage.setItem("items", JSON.stringify(items))
        },

        resetStorage: function() {
            localStorage.setItem("items", JSON.stringify([]))
            }
    }
})();







// UI controller


const UIController = (function() {
    const UISelectors = {
        addBtn: ".add-btn",
        itemList: "#item-list",
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        listOfItems: "#item-list li",
        deleteallBtn: ".deleteall-btn",
        backBtn: ".back-btn"
    }

    return {
        getSelectors: function () {
            return UISelectors
        },

        populateItemList: function(items) {
            let html = ""
            items.forEach(function(item) {
                html += `<li class="collection-item" id="item-${item.id}"><b>${item.name}</b>
                            <i>${item.calories} cal</i>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a></li>`
            })
            document.querySelector("ul").innerHTML = html
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(".total-calories").textContent = totalCalories
        },

        getItemInput: function (){
            return {
                name: document.querySelector("#item-name").value,
                calories: document.querySelector("#item-calories").value
            }
        },
        addListItem: function(item) {
            const li = document.createElement("li")
            li.id = `item-${item.id}`
            li.className = `collection-item`
            li.innerHTML = `<b>${item.name}</b>
                            <i>${item.calories} cal</i>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>`
            document.querySelector("ul").insertAdjacentElement("beforeend", li)
        },
        clearInput: function () {
            document.querySelector("#item-calories").value = ""
            document.querySelector("#item-name").value = ""
        },
        showEditState: function() {
            document.querySelector(UISelectors.addBtn).style.display = "none"
            document.querySelector(UISelectors.deleteBtn).style.display = "inline"
            document.querySelector(UISelectors.updateBtn).style.display = "inline"
            document.querySelector(UISelectors.backBtn).style.display = "inline"
        },
        clearEditState: function () {
            document.querySelector(UISelectors.addBtn).style.display = "inline"
            document.querySelector(UISelectors.deleteBtn).style.display = "none"
            document.querySelector(UISelectors.updateBtn).style.display = "none"
            document.querySelector(UISelectors.backBtn).style.display = "none"
            UIController.clearInput()
        },
        addItemToForm: function ()
        {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories
            UIController.showEditState()
        },
        updateItem: function (item) {
            const listOfItems = document.querySelectorAll(UISelectors.listOfItems)
            listOfItems.forEach(function (listItem) {
                let listItemID = listItem.getAttribute("id")
                if (`item-${item.id}` === listItemID) {
                    document.querySelector("#" + listItemID).innerHTML = `<b>${item.name}</b>
                    <i>${item.calories} cal</i>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`
                }
            })
        },

        deleteItem: function(item) {
            const listOfItems = document.querySelectorAll(UISelectors.listOfItems)
            listOfItems.forEach(function (listItem) {
                let listItemID = listItem.getAttribute("id")
                let listItemMeal = listItem.textContent.split("\n")[0]
                let listItemCalories = listItem.querySelector("i").textContent
                if ((`item-${item.id}` === listItemID) && (listItemMeal === item.name) && (`${item.calories} cal` === listItemCalories)) {
                    document.querySelector("#" + listItemID).remove()
                }
            })
        },

        deleteAllItems: function() {
            document.querySelector(UISelectors.itemList).innerHTML = ""
        }
    }
})();




// App controller


const App = (function () {

    const itemAddSubmit = function(e) {
        const userInput = UIController.getItemInput()
        if (userInput.name !== "" && userInput.calories !== "") {
            const newItem = ItemCtrl.addItem(userInput.name, userInput.calories)
            UIController.addListItem(newItem)
            StorageCtrl.storeItem(newItem)
            UIController.showTotalCalories(ItemCtrl.getTotalCalories())
            UIController.clearInput()
        }
        e.preventDefault()
    }

    const itemEditSubmit = function(e) {
        if (e.target.classList.contains("edit-item")) {
            const listID = e.target.parentNode.parentNode.id
            const id = parseInt(listID.split("-")[1])
            const editableItem = ItemCtrl.getItem(id)
            ItemCtrl.setCurrentItem(editableItem)
            UIController.addItemToForm()
        }
    }

    const getItemsFromStorage = function () {
        const items = StorageCtrl.getItemsFromStorage()
        items.forEach(function (item) {
            ItemCtrl.addItemWithId(item.id, item.name, item.calories)
        })
        const totalCalories = ItemCtrl.getTotalCalories()
        UIController.showTotalCalories(totalCalories)
        UIController.populateItemList(items)
    }

    const itemUpdateSubmit = function (e) {
        const input = UIController.getItemInput()
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories)
        UIController.updateItem(updatedItem)
        StorageCtrl.updateLocalStorage(updatedItem)
        UIController.clearInput()
        UIController.clearEditState()
        UIController.showTotalCalories(ItemCtrl.getTotalCalories())
        e.preventDefault()
    }

    const itemDeleteSubmit = function(e) {
        const deletedItem = ItemCtrl.deleteItem()
        ItemCtrl.setCurrentItem(null)
        UIController.deleteItem(deletedItem)
        StorageCtrl.deleteFromLocalStorage(deletedItem)
        UIController.clearInput()
        UIController.clearEditState()
        UIController.showTotalCalories(ItemCtrl.getTotalCalories())
        e.preventDefault()
    }

    const clearAllSubmit = function(e) {
        ItemCtrl.deleteAllItems()
        UIController.deleteAllItems()
        StorageCtrl.resetStorage()
        UIController.clearInput()
        UIController.clearEditState()
        UIController.showTotalCalories(0)
        e.preventDefault()
    }


    const loadEventListeners = function (){
        const UISelectors = UIController.getSelectors()
        document.addEventListener('DOMContentLoaded', getItemsFromStorage)
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
        document.querySelector(UISelectors.itemList).addEventListener("click", itemEditSubmit)
        document.querySelector(UISelectors.updateBtn).addEventListener("click", itemUpdateSubmit)
        document.querySelector(UISelectors.deleteBtn).addEventListener("click", itemDeleteSubmit)
        document.addEventListener("DOMContentLoaded", getItemsFromStorage)
        document.querySelector(UISelectors.deleteallBtn).addEventListener("click", clearAllSubmit)
        document.querySelector(UISelectors.backBtn).addEventListener("click", UIController.clearEditState)
    }

    return {

        init: function () {
            loadEventListeners()
            UIController.clearEditState()
            document.querySelector(".add-btn").addEventListener("click", itemAddSubmit)
        }
    }
})(ItemCtrl, UIController, StorageCtrl);

App.init()