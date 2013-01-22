function ItemViewModel(listService) {
  
  var that = this,
      listService = listService;

  this.template = "itemView";
  this.id = ko.observable();
  this.text = ko.observable("");
  
  this.init = function (item) {
    this.id(item.id);
    this.text(item.text);
  };

  this.updateItem = function() {
    var item = getItem();
    listService.updateItem(item, function() {
      listItemsViewModel.updateItem( item );
      $.mobile.changePage("#" + listItemsViewModel.template);
    });
  };

  this.deleteItem = function () {
    listService.deleteItem (that.id(), function (err) {
      if (err) console.log(err);
      listItemsViewModel.removeItem( getItem() );
      $.mobile.changePage("#" + listItemsViewModel.template);
    });
  };
  
  this.backToListView = function () {
    $.mobile.changePage("#" + listItemsViewModel.template);
  }
  function getItem() {
    return { id: that.id(), text: that.text() };
  }
}
