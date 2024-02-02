$(document).ready(function() {
  function bindEvents() {
    $('#todo_list').on('click', 'button', showModal);
    $('#nodelete').on('click', hideModal);
    $('#yesdelete').on('click', deleteTodo);
  }

  function showModal() {
    $('#yesdelete').data('delete_id', $(this).parent().data('id'));

    $('#overlay').fadeIn();
    $('#modal').fadeIn();
  }

  function hideModal() {
    $('#modal').fadeOut();
    $('#overlay').fadeOut();
  }

  function deleteTodo() {
    const delete_id = $(this).data('delete_id');

    todo_items = todo_items.filter(({id}) => id !== delete_id);

    $(`[data-id=${delete_id}]`).remove();
    $(this).data('delete_id', null);

    hideModal();
  }

  let todo_items = [
    { id: 1, title: 'Homework' },
    { id: 2, title: 'Shopping' },
    { id: 3, title: 'Calling Mom' },
    { id: 4, title: 'Coffee with John '}
  ];

  const todoTemplate = Handlebars.compile($('#todo_item').html());
  $('#todo_list').append(todoTemplate({todos: todo_items}));

  bindEvents();
});
