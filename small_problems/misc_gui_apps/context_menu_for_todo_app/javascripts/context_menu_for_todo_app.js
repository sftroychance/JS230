$(document).ready(function() {
  function bindEvents() {
    $('#todo_list').on('click', 'button', showModal);
    $('#todo_list').on('contextmenu', 'li', showContextMenu);
    $('#nodelete').on('click', hideModal);
    $('#yesdelete').on('click', deleteTodo);
    $(document).on('click', hideContextMenu);
    $('#delete_todo_from_menu').on('click', showModal);
  }

  function hideContextMenu() {
    $('#context_menu').removeClass('show-menu');
  }

  function showContextMenu(e) {
    e.preventDefault();

    const $menu = $('#context_menu');

    $menu.data('id', $(this).data('id'));

    const menuWidth = parseInt($menu.css('width'), 10);
    const menuHeight = parseInt($menu.css('height'), 10);

    const cssOptions = {};

    if (e.clientY > window.innerHeight - menuHeight) {
      cssOptions.top = e.clientY - menuHeight - 10;
      cssOptions.transformOrigin = 'bottom';
    } else {
      cssOptions.top = e.clientY;
      cssOptions.transformOrigin = 'top';
    }

    if (e.clientX > window.innerWidth - menuWidth) {
      cssOptions.left = e.clientX - menuWidth - 10;
      cssOptions.transformOrigin += ' right';
    } else {
      cssOptions.left = e.clientX;
      cssOptions.transformOrigin += ' left';
    }

    $menu.css(cssOptions);

    $menu.addClass('show-menu');
  }

  function showModal(e) {
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
