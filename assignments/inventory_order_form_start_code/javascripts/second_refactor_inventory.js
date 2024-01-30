document.addEventListener('DOMContentLoaded', function() {
  const inventory = function() {
    let lastId = 0;
    let collection = [];

    function setDate() {
      const date = new Date();
      const dateElement = document.querySelector('#order_date');

      dateElement.textContent = date.toUTCString();
    }

    function add() {
      lastId++;
      const item = {
        id: lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      collection.push(item);

      return item;
    }

    function remove(idx) {
      collection = collection.filter(function(item) {
        return item.id !== idx;
      });
    }

    function get(targetID) {
      for (const item of collection) {
        if (item.id === targetID) {
          return item;
        }
      }
    }

    function update(listItem) {
      const id = +listItem.getAttribute('data-id');

      const formValues = Array.from(listItem.children)
        .flatMap(td => Array.from(td.children))
        .filter(element => element.tagName === 'INPUT')
        .reduce((formData, input) => {
          const name = input.name.split('_').slice(1, -1).join('_');
          formData[name] = name === 'quantity' ? +input.value : input.value;
          return formData;
        }, {});

      const item = get(id);
      Object.assign(item, formValues);
    }

    return {
      initTemplate: function() {
        const template = document.querySelector('#inventory_item');

        this.getTemplate = Handlebars.compile(template.innerHTML);
      },
      newItem: function() {
        const item = add();
        const itemHTML = this.getTemplate({ id: item.id });

        const table = document.querySelector('#inventory');
        table.insertAdjacentHTML('beforeend', itemHTML);
        table.lastElementChild.querySelector('input').focus();
      },
      deleteItem: function(clickTarget) {
        const listItem = clickTarget.parentElement.parentElement;
        const targetID = +listItem.getAttribute('data-id');

        listItem.remove();

        remove(targetID);
        console.log(collection);
      },
      updateItem: function(clickTarget) {
        const listItem = clickTarget.parentElement.parentElement;

        update(listItem);
      },
      bindEvents: function() {
        const inventoryTable = document.querySelector('#inventory');
        const addItem = document.querySelector('#add_item');

        addItem.addEventListener('click', (e) => {
          this.newItem();
        });

        inventoryTable.addEventListener('click', (e) => {
          if (e.target.tagName === 'A') {
            e.preventDefault();
            this.deleteItem(e.target);
          }
        });

        inventoryTable.addEventListener('focusout', (e) => {
          if (e.target.tagName === 'INPUT') {
            this.updateItem(e.target);
          }
        });
      },
      init: function() {
        setDate();
        this.initTemplate();
        this.bindEvents();
      }
    }
  }();

  inventory.init();
});
