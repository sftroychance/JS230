const myContacts = [{"id":1,"full_name":"Naveed Fida","email":"nf@example.com","phone_number":"12345678901","tags":"work,friend"},{"id":2,"full_name":"Victor Reyes","email":"vpr@example.com","phone_number":"09876543210","tags":"work,friend"},{"id":3,"full_name":"Pete Hanson","email":"ph@example.com","phone_number":"54321098761","tags":null}];

for (const contact of myContacts) {
  const tagArray = contact.tags ? contact.tags.split(',') : [];
  contact.tags = tagArray;
}

console.log(myContacts);
