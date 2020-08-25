// LOCAL STORAGE
const StorageCtrl = (function(){
  // Private
  // Public
  return {
    storeItem: function(item){
      let items;
      // Check if any items in ls
      if(localStorage.getItem('items') === null){
        items = [];
        // Push new item
        items.push(item);
        // Set ls
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem('items'));

        // Push new item
        items.push(item);

        // Re set ls
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    storeWater: function(item){
      let water;
      // Check if any items in ls
      if(localStorage.getItem('water') === null){
        water = [];
        // Push new item
        water.push(item);
        // Set ls
        localStorage.setItem('water', JSON.stringify(water));
      } else {
        // Get what is already in ls
        water = JSON.parse(localStorage.getItem('water'));

        // Push new item
        water.push(item);

        // Re set ls
        localStorage.setItem('water', JSON.stringify(water));
      }
    },
    getItemsFromStorage: function(){
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
      } else { 
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    getWaterFromStorage: function(){
      let water;
      if(localStorage.getItem('water') === null){
        water = [];
      } else {
        water = JSON.parse(localStorage.getItem('water'));
      }
      return water;
    },
    updateItemsStorage: function(updatedItem){
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item){
        if(updatedItem.id === item.id){
          items.splice(item.id, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    updateWaterStorage: function(updatedItem){
      let water = JSON.parse(localStorage.getItem('water'));
      water.forEach(function(item){
        if(updatedItem.id === item.id){
          water.splice(item.id, 1, updatedItem);
        }
      });
      localStorage.setItem('water', JSON.stringify(water));
    },
    deleteItemFromStorage: function(id){
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item){
      const index = items.indexOf(item);

        if(item.id === id){
          items.splice(index, 1)
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteWaterFromStorage: function(id){
      let water = JSON.parse(localStorage.getItem('water'));
      water.forEach(function(item){
        const index = water.indexOf(item);
        if(item.id === id){
          water.splice(index, 1);
        }
      });
      localStorage.setItem('water', JSON.stringify(water));
    }

  }
})();

// ITEM CONTROL

    // Data control
const ItemCtrl = (function(){
  // Private
  const Meal = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  const Water = function(id, amount){
    this.id = id;
    // this.time = time;
    this.amount = amount;
  }

  const data = {
    // items: [
    //         {id: 0, name: 'Steak', calories: 1200},
    //         {id: 1, name: 'Cookies', calories: 100}
    //        ],

    // MEAL
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,

    // WATER

    water: StorageCtrl.getWaterFromStorage(),
    totalWaterAmount: 0,
    currentWaterItem: null,
  }
  // Public
  return {
    getItems: function(){
      return data.items;
    },
    getWater: function(){
      return data.water;
    },
    addItem: function(name, calories){
      let ID;

      if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1
      } else {
        ID = 0;
      }

      calories = parseInt(calories);
      newItem = new Meal(ID, name, calories);
      
      data.items.push(newItem);
      return newItem;
    },
    addWater: function(amount){
      let ID;

      if (data.water.length > 0){
        ID = data.water[data.water.length - 1].id + 1
      } else {
        ID = 0;
      }

      amount = parseInt(amount);

      newItem = new Water(ID, amount);

      data.water.push(newItem);

      return newItem;
    },
    getItemById: function(id){
      let found = null;
      data.items.forEach(function(item){
        if (item.id === id){
          found = item;
        }
      });
      return found;
    },
    getWaterElemById: function(id){
      let found = null;
      data.water.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
      
      return found;
      
    },
    setCurrItem: function(item){
      data.currentItem = item;
    },
    setWaterCurrItem: function(item){
      data.currentWaterItem = item;
    },
    getCurrItem: function(){
      return data.currentItem;
    },
    getCurrWaterItem: function(){
      console.log(data.currentWaterItem);
      return data.currentWaterItem;
    },
    getCurrWaterItemId: function(){
      return data.currentWaterItem.id;
    },
    getCurrWaterItemAmount: function(){
      return data.currentWaterItem.amount;
    },

    updateItem: function(name, calories){
      let found = null;
      calories = parseInt(calories);

      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      })

      return found;
    },

    updateWater: function(updatedItem){
      let found = null;

      data.water.forEach(function(item){
        if (item.id === data.currentWaterItem.id){
          item.amount = parseInt(updatedItem.amount);
          found = item;
        }
      });
      return found;
    },
    
    deleteItem: function(itemId){
      const ids = data.items.map(function(item){
        return item.id
      });
      ids.forEach(function(id){
        if(id === itemId){
          data.items.splice(id, 1);
        }
      })
      // console.log(data);
    },

    deleteWater: function(itemId){
      const ids = data.water.map(function(item){
        return item.id
      });
      ids.forEach(function(id){
        if(id === itemId){
          data.water.splice(id, 1);
        }
      })
    },

    getTotalCalories: function(){
      let total = 0;
      
      data.items.forEach(function(item){
        total += item.calories;
      });

      data.totalCalories = total;
      return data.totalCalories;
    },

    getTotalAmount: function(){
      let total = 0;

      data.water.forEach(function(item){
        total += parseInt(item.amount);
      });

      data.totalWaterAmount = total;
      return data.totalWaterAmount;
    },

    logData: function(){
      return data.water;
    }
  }
})();



// UI CONTROL

const UICtrl = (function(){
  // Private
  UIelements = {
    // MEAL

    mealList: '#meal-list',
    mealListItem: '#meal-list li',
    addMealBtn: '.add-meal-btn',
    updateMealBtn: '.update-meal-btn',
    deleteMealBtn: '.delete-meal-btn',
    backMealBtn: '.back-meal-btn',
    totalCalories: '.total-calories',
    mealNameInput: '#meal-name',
    mealCaloriesInput: '#meal-calories',

    // WATER
    waterList: '#water-list',
    waterListItem: '#water-list li',
    addWaterBtn: '.add-water-btn',
    updateWaterBtn: '.update-water-btn',
    deleteWaterBtn: '.delete-water-btn',
    backWaterBtn: '.back-water-btn',
    waterInput: '#select-water',
    waterChooseInput: '#select-water option',
    totalAmount: '.total-amount',
  }
  // Public
  return {
    displayMealItems: function(items){
      let html = '';
      items.forEach(item => {
        html += 
        `
          <li class="list-group-item" id="item-${item.id}">
            <strong>${item.name}:</strong> <em>${item.calories}</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>
          </li>
        `
      });
      document.querySelector(UIelements.mealList).innerHTML = html;
    },
    displayWaterItems: function(items){
      let html = '';
      items.forEach(item =>{
        html += 
        `
        <li class="list-group-item" id="water-item-${item.id}">
        <em>${item.amount} ml</em>
        <a href="#" class="secondary-content">
          <i class="edit-water-item fa fa-pencil"></i>
        </a>
      </li>
        `;
      });
      document.querySelector(UIelements.waterList).innerHTML = html;
    },
    getItemInput: function(){
      return {
        name: document.querySelector(UIelements.mealNameInput).value,
        calories: document.querySelector(UIelements.mealCaloriesInput).value,
      }
    },
    getWaterInput: function(){
      let select = document.querySelector(UIelements.waterInput);
      let option = select.value;
      return{
        amount: option
      }
    },
    addMealToList: function(item){
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
        <strong>${item.name}:</strong> <em>${item.calories}</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `
      document.querySelector(UIelements.mealList).insertAdjacentElement('beforeend', li);
    },
    addWaterToList: function(item){
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.id = `water-item-${item.id}`;
      li.innerHTML = 
      `
      <em>${item.amount} ml</em>
      <a href="#" class="secondary-content">
        <i class="edit-water-item fa fa-pencil"></i>
      </a>
      `;
      document.querySelector(UIelements.waterList).insertAdjacentElement('beforeend', li);
    },

    clearEditState: function(){
      document.querySelector(UIelements.updateMealBtn).style.display = 'none';
      document.querySelector(UIelements.deleteMealBtn).style.display = 'none';
      document.querySelector(UIelements.backMealBtn).style.display = 'none';
      document.querySelector(UIelements.addMealBtn).style.display = 'block';
    },
    clearWaterEditState: function(){
      document.querySelector(UIelements.updateWaterBtn).style.display = 'none';
      document.querySelector(UIelements.deleteWaterBtn).style.display = 'none';
      document.querySelector(UIelements.backWaterBtn).style.display = 'none';
      document.querySelector(UIelements.addWaterBtn).style.display = 'block';
    },

    showEditState: function(){
      document.querySelector(UIelements.updateMealBtn).style.display = 'inline-block';
      document.querySelector(UIelements.deleteMealBtn).style.display = 'inline-block';
      document.querySelector(UIelements.backMealBtn).style.display = 'inline-block';
      document.querySelector(UIelements.addMealBtn).style.display = 'none';
    },
    showWaterEditState: function(){
      document.querySelector(UIelements.updateWaterBtn).style.display = 'inline-block';
      document.querySelector(UIelements.deleteWaterBtn).style.display = 'inline-block';
      document.querySelector(UIelements.backWaterBtn).style.display = 'inline-block';
      document.querySelector(UIelements.addWaterBtn).style.display = 'none';
    },

    clearMealInput: function(){
      document.querySelector(UIelements.mealNameInput).value = '';
      document.querySelector(UIelements.mealCaloriesInput).value = '';
    },

    displayItemToEdit: function(){
      document.querySelector(UIelements.mealNameInput).value = ItemCtrl.getCurrItem().name;
      document.querySelector(UIelements.mealCaloriesInput).value = ItemCtrl.getCurrItem().calories;
    },
    
    displayWaterItemToEdit: function(){
      document.querySelector(UIelements.waterInput).value = ItemCtrl.getCurrWaterItemAmount();
      UICtrl.showWaterEditState();
    },

    displayUpdatedItem: function(item){
      const list = document.querySelectorAll(UIelements.mealListItem);
      listItems = Array.from(list);
      

      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');
        if (itemID === `item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = 
          `
          <strong>${item.name}:</strong> <em>${item.calories}</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
          `;
          UICtrl.clearEditState();
          UICtrl.clearMealInput();
        }
      })
    },

    displayUpdatedWater: function(item){
      const list = document.querySelectorAll(UIelements.waterListItem);
      listItems = Array.from(list);

      listItems.forEach(function(listItem){
        const itemID = listItem.getAttribute('id');

        if (itemID === `water-item-${item.id}`){
          document.querySelector(`#${itemID}`).innerHTML = 
          `
          <em>${item.amount} ml</em>
          <a href="#" class="secondary-content">
            <i class="edit-water-item fa fa-pencil"></i>
          </a>
          `;
        }
      })
    },

    deleteItemFromList: function(id){
      const itemToDelete = `#item-${id}`
      const item = document.querySelector(itemToDelete);
      item.remove();
    },

    deleteWaterFromList: function(id){
      const itemTodelete = `#water-item-${id}`;
      const item = document.querySelector(itemTodelete);
      item.remove();
    },

    displayTotalCalories: function(totalCalories){
      document.querySelector(UIelements.totalCalories).textContent = totalCalories;
    },

    displayTotalAmount: function(totalAmount){
      document.querySelector(UIelements.totalAmount).textContent = totalAmount;
    }
  }
})();

// App controller
const App = (function(ItemCtrl, UICtrl, StorageCtrl){
  // Private
  // Все кнопки и функции для кнопок
  const loadEventListeners = function(){
    // MEAL
    document.querySelector(UIelements.addMealBtn).addEventListener('click', addMealBtn);
    document.querySelector(UIelements.mealList).addEventListener('click', itemEditClick);
    document.querySelector(UIelements.updateMealBtn).addEventListener('click', updateMealSubmit);
    document.querySelector(UIelements.deleteMealBtn).addEventListener('click', deleteMealSubmit);
    document.querySelector(UIelements.backMealBtn).addEventListener('click', closeEditState);

    // WATER
    document.querySelector(UIelements.addWaterBtn).addEventListener('click', addWaterBtn);
    document.querySelector(UIelements.waterList).addEventListener('click', waterEditClcik);
    document.querySelector(UIelements.backWaterBtn).addEventListener('click',closeWaterEditState);
    document.querySelector(UIelements.updateWaterBtn).addEventListener('click',updateWaterSubmit);
    document.querySelector(UIelements.deleteWaterBtn).addEventListener('click',deleteWaterSubmit);
  }

  addMealBtn = function(e) {
    const input = UICtrl.getItemInput();
    
    if(input.name != '' && input.calories != ''){
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addMealToList(newItem);
      StorageCtrl.storeItem(newItem);

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.displayTotalCalories(totalCalories);
      UICtrl.clearMealInput();
    }
    e.preventDefault();
  }

  addWaterBtn = function(e){
    const input = UICtrl.getWaterInput();
    
    const newItem = ItemCtrl.addWater(input.amount);
    StorageCtrl.storeWater(newItem);


    UICtrl.addWaterToList(newItem);
    
    const totalAmount = ItemCtrl.getTotalAmount();
    UICtrl.displayTotalAmount(totalAmount);

    // console.log(newItem);
    e.preventDefault();
  }

  itemEditClick = function(e){
    if(e.target.classList.contains('edit-item')){
      const listId = e.target.parentNode.parentNode.id;
      listIdArr = listId.split('-');
      id = parseInt(listIdArr[1]);

      itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrItem(itemToEdit);

      console.log(ItemCtrl.getCurrItem()); 

      UICtrl.displayItemToEdit();
      UICtrl.showEditState();
      
    }
    e.preventDefault();
  }

  waterEditClcik = function(e){
    if (e.target.classList.contains('edit-water-item')){
      let listId = e.target.parentNode.parentNode.id
      listIdArr = listId.split('-');
      id = parseInt(listIdArr[2]);
      
      itemToEdit = ItemCtrl.getWaterElemById(id); // WORK
      ItemCtrl.setWaterCurrItem(itemToEdit);
      
      UICtrl.displayWaterItemToEdit();

    }
    e.preventDefault();
  }

  updateMealSubmit = function(e){
    const itemToUpdate = UICtrl.getItemInput();
    const updatedItem = ItemCtrl.updateItem(itemToUpdate.name, itemToUpdate.calories);
    StorageCtrl.updateItemsStorage(updatedItem);

    UICtrl.displayUpdatedItem(updatedItem);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.displayTotalCalories(totalCalories);

    e.preventDefault();
  }

  updateWaterSubmit = function(e){
    let itemToUpdate = UICtrl.getWaterInput();
    
    const updatedItem = ItemCtrl.updateWater(itemToUpdate);
    StorageCtrl.updateWaterStorage(updatedItem);

    UICtrl.displayUpdatedWater(updatedItem);
    UICtrl.clearWaterEditState();
    const totalAmount = ItemCtrl.getTotalAmount();
    UICtrl.displayTotalAmount(totalAmount);

    e.preventDefault();
  }

  deleteMealSubmit = function(e){
    const itemToDelete = ItemCtrl.getCurrItem();
    ItemCtrl.deleteItem(itemToDelete.id);

    UICtrl.deleteItemFromList(itemToDelete.id);

    StorageCtrl.deleteItemFromStorage(itemToDelete.id);

    UICtrl.clearEditState();
    UICtrl.clearMealInput();

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.displayTotalCalories(totalCalories);

    e.preventDefault();
  }

  deleteWaterSubmit = function(e){
    const itemToDelete = ItemCtrl.getCurrWaterItemId();
    ItemCtrl.deleteWater(itemToDelete);
    StorageCtrl.deleteWaterFromStorage(itemToDelete);
    UICtrl.deleteWaterFromList(itemToDelete);
    UICtrl.clearWaterEditState();

    const totalAmount = ItemCtrl.getTotalAmount();
    UICtrl.displayTotalAmount(totalAmount);

    e.preventDefault();
  }

  closeEditState = function(e){
    UICtrl.clearEditState();
    UICtrl.clearMealInput();

    e.preventDefault();
  }

  closeWaterEditState = function(e){
    UICtrl.clearWaterEditState();

    e.preventDefault();
  }

  // Public
  return {
    init: function() {
      loadEventListeners();
      UICtrl.clearEditState();
      UICtrl.clearWaterEditState();

      const items = ItemCtrl.getItems();
      UICtrl.displayMealItems(items);

      const water = ItemCtrl.getWater();
      UICtrl.displayWaterItems(water);

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.displayTotalCalories(totalCalories);

      const totalAmount = ItemCtrl.getTotalAmount();
      UICtrl.displayTotalAmount(totalAmount);

    }
  }
})(ItemCtrl, UICtrl, StorageCtrl);


App.init();