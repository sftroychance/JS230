document.addEventListener('DOMContentLoaded', function() {
  let inventory;

  (function() {
    inventory = {
      lastId: 0,
      collection: [],
      setDate: function() {
        const date = new Date();
        const dateElement = document.querySelector('#order_date');

        dateElement.textContent = date.toUTCString();
      },
      initTemplate: function() {
        const template = document.querySelector('#inventory_item');

        this.getTemplate = Handlebars.compile(template.innerHTML);
      },
      add: function() {
        this.lastId++;
        const item = {
          id: this.lastId,
          name: "",
          stock_number: "",
          quantity: 1
        };
        this.collection.push(item);

        return item;
      },
      remove: function(idx) {
        this.collection = this.collection.filter(function(item) {
          return item.id !== idx;
        });
      },
      get: function(targetID) {
        for (const item of this.collection) {
          if (item.id === targetID) {
            return item;
          }
        }
      },
      update: function(listItem) {
        const id = +listItem.getAttribute('data-id');

        const formValues = Array.from(listItem.children)
          .flatMap(td => Array.from(td.children))
          .filter(element => element.tagName === 'INPUT')
          .reduce((formData, input) => {
            const name = input.name.split('_').slice(1, -1).join('_');
            formData[name] = name === 'quantity' ? +input.value : input.value;
            return formData;
          }, {});

        const item = this.get(id);
        Object.assign(item, formValues);
      },
      newItem: function() {
        const item = this.add();
        const itemHTML = this.getTemplate({ id: item.id });

        const table = document.querySelector('#inventory');
        table.insertAdjacentHTML('beforeend', itemHTML);
      },
      deleteItem: function(clickTarget) {
        const listItem = clickTarget.parentElement.parentElement;
        const targetID = +listItem.getAttribute('data-id');

        listItem.remove();

        this.remove(targetID);
      },
      updateItem: function(clickTarget) {
        const listItem = clickTarget.parentElement.parentElement;

        this.update(listItem);
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
        this.setDate();
        this.initTemplate();
        this.bindEvents();
      }
    };
  })();

  inventory.init();
});
