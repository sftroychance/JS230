class Contacts {
  constructor(contacts) {
    this.contactsList = this.formatTags(contacts.slice());
  }

  formatTags(contacts) {
    contacts.forEach(contact => contact.tags = this.tagsToArray(contact.tags));

    return contacts;
  }

  tagsToArray(tags) {
    return tags ? tags.split(',').map(tag => tag.trim()) : [];
  }

  arrayToTags(tags) {
    return tags.map(tag => tag.trim()).join(',');
  }

  filterByTag(tag) {
    return this.contactsList.filter(contact => contact.tags.includes(tag));
  }

  filterByName(searchString) {
    const target = searchString.toLowerCase();

    return this.contactsList
      .filter(contact => contact.full_name.toLowerCase().includes(target));
  }

  getByID(id) {
    return this.contactsList.filter(contact => contact.id === id).at(0);
  }

  addContact(newContact) {
    newContact.tags = this.tagsToArray(newContact.tags);
    this.contactsList.push(newContact);
  }

  updateContact(verifiedContact) {
    verifiedContact.tags = this.tagsToArray(verifiedContact.tags);
    const currentRecord = this.getByID(verifiedContact.id);
    Object.assign(currentRecord, verifiedContact);
  }

  deleteContact(targetID) {
    this.contactsList = this.contactsList
      .filter(contact => contact.id !== targetID);
  }

  allContacts() {
    return this.contactsList.slice();
  }
}

class ContactsAPI {
  async getAllContacts() {
    const url = '/api/contacts';

    let response;
    try {
      response = await fetch(url);
    } catch(err) {
      console.error('Error loading contacts:', err);
    }

    return response.json();
  }

  async deleteContact(deleteID) {
    const url = `/api/contacts/${deleteID}`;

    let response;
    try {
      response = await fetch(url, {method: 'DELETE'});
    } catch(err) {
      console.error('Error deleting contact:', err);
    }

    await response.text(); // if not included, get 'FETCH failed' message

    if (!response.ok) {
      alert(response.statusText);
    }
  }

  async addContact(newContact) {
    const url = `/api/contacts`;

    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(newContact),
      });
    } catch(err) {
      console.error('Error adding contact:', err);
    }

    let verifiedContact;
    if (response.ok) {
      verifiedContact = await response.json();
      return verifiedContact;
    } else {
      alert(response.statusText);
    }
  }

  async updateContact(data) {
    const url = `/api/contacts/${data.id}`;

    let response;
    try {
      response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data),
      });
    } catch(err) {
      console.error('Error adding contact:', err);
    }

    let verifiedContact;
    if (response.ok) {
      verifiedContact = await response.json();
      return verifiedContact;
    } else {
      alert(response.statusText);
    }
  }
}

class Page {
  constructor() {
    this.templates = {};
    this.prepareTemplates();
  }

  prepareTemplates() {
    const $templateScripts = $('[type="text/x-handlebars"]');
    const $partialScripts = $templateScripts.filter('.partial');

    for (const template of $templateScripts) {
      this.templates[template.id] = Handlebars.compile($(template).html());
    }

    for (const partial of $partialScripts) {
      Handlebars.registerPartial(partial.id, this.templates[partial.id])
    }
  }

  listContacts(contacts) {
    const contactsHTML = this.templates.contacts({contacts});
    $('.contacts-listing').html();
    $('.contacts-listing').html(contactsHTML);
  }

  showNoSearchResults(searchString) {
    const emptyResult = `
    <div class='no-search-result'>
      <p>There are no contacts containing <strong>${searchString}</strong></p>
    </div>`;

    $('.contacts-listing').html(emptyResult);
  }

  showErrors(form, data) {
    for (const name in data) {
      const $parentDiv = $(form).find(`[name='${name}']`).parent();
      $parentDiv.removeClass('invalid');
      $parentDiv.next('p').removeClass('show');

      if (data[name] === '' && name !== 'tags') {
        $parentDiv.addClass('invalid');
        $parentDiv.next('p').addClass('show');
      }
    }
  }

  deleteContact(deleteID) {
    $(`.contact[data-id='${deleteID}']`).remove();
  }
}

class ContactsApp {
  constructor() {
    this.api = new ContactsAPI();
    this.page = new Page();
  }

  async init() {
    const myContacts = await this.api.getAllContacts();
    this.contacts = new Contacts(myContacts);
    this.page.listContacts(this.contacts.allContacts());
    this.bindEvents();
  }

  filterByTag(tag) {
    const filtered = this.contacts.filterByTag(tag);
    this.page.listContacts(filtered);
  }

  filterByName(searchString) {
    const filtered = this.contacts.filterByName(searchString);
    if (filtered.length) {
      this.page.listContacts(filtered);
    } else {
      this.page.showNoSearchResults(searchString);
    }
  }

  bindEvents() {
    $('.contacts-listing').on('click', '.btn-delete', (e) => {
      this.deleteContact(e);
    });

    $('.contacts-listing').on('click', '.btn-tag', (e) => {
      this.filterByTag(e.target.textContent);
    });

    $('#search-field').on('input', (e) => {
      const searchString = e.target.value;
      this.filterByName(searchString);
    });

    $('#btn-add-contact').on('click', function(e) {
      $('#list').slideUp();
      $('#create-contact').slideDown();
    });

    $('#btn-cancel').on('click', function(e) {
      $(this).parents('form').get(0).reset();
      $('#list').slideDown();
      $('#create-contact').slideUp();
    });

    $('#btn-edit-cancel').on('click', function(e) {
      $(this).parents('form').get(0).reset();
      $('#list').slideDown();
      $('#edit-contact').slideUp();
    });

    $('.contacts-listing').on('click', '.btn-edit', (e) => {
      const currentID = $(e.target).data().id;
      const currentRecord = this.contacts.getByID(currentID);

      const $inputFields = $('#btn-edit-contact').parents('ul');
      $inputFields.find('[name="full_name"]').val(currentRecord.full_name);
      $inputFields.find('[name="email"]').val(currentRecord.email);
      $inputFields.find('[name="phone_number"]').val(currentRecord.phone_number);
      $inputFields.find('[name="tags"]').val(currentRecord.tags);

      $('#btn-edit-contact').data('id', currentID);
      $('#list').slideUp();
      $('#edit-contact').slideDown();
    });

    $('#btn-new-contact').on('click', async (e) => {
      e.preventDefault();
      const form = $(e.target).closest('form').get(0);
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => (data[key] = value));

      if (!(data.full_name && data.email && data.phone_number)) {
        this.page.showErrors(form, data);
        return;
      }

      const verifiedContact = await this.api.addContact(data);
      this.contacts.addContact(verifiedContact);
      $('#list').slideDown();
      $('#create-contact').slideUp();
      this.page.listContacts(this.contacts.allContacts());
    });

    $('#btn-edit-contact').on('click', async (e) => {
      e.preventDefault();
      const form = $(e.target).closest('form').get(0);
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => (data[key] = value));

      if (!(data.full_name && data.email && data.phone_number)) {
        this.page.showErrors(form, data);
        return;
      }

      const currentID = $(e.target).data().id;
      const currentRecord = this.contacts.getByID(currentID);
      if (Array.isArray(currentRecord.tags)) {
        currentRecord.tags = this.contacts.arrayToTags(currentRecord.tags);
      }

      const updatedData = {};
      for (const k in data) {
        if (data[k] !== currentRecord[k]) {
          updatedData[k] = data[k];
        }
      }

      if (!Object.keys(updatedData).length) {
        alert('No information has changed.');
        return;
      }

      updatedData.id = currentID;
      const verifiedContact = await this.api.updateContact(updatedData);
      this.contacts.updateContact(verifiedContact);
      $('#list').slideDown();
      $('#edit-contact').slideUp();
      this.page.listContacts(this.contacts.allContacts());
    });

  }

  deleteContact(e) {
    if (!confirm('Do you want to delete the contact?')) {
      return;
    }

    const deleteID = $(e.target).data().id;

    this.api.deleteContact(deleteID);
    this.contacts.deleteContact(deleteID);
    this.page.deleteContact(deleteID);
  }
}

const myApp = new ContactsApp();
myApp.init();
