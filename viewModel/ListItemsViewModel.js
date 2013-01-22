function ListItemsViewModel(listService) {

  var that = this,
      listService = listService;

  this.template = "listItemsView";
  this.listId = -1;
  this.listName = ko.observable();
  this.items = ko.observableArray();
  this.itemName = ko.observable("item name");
  
  this.init = function (id) {
    that.items([]);

    listService.getList(id, function (list) {
      that.listId = id;
      that.listName(list.title);
      
      if (list.items.length > 0) {
        var temp = ko.utils.unwrapObservable(that.items);
        $.each(list.items, function (index, item) {
          temp.push(item);
        });
        that.items(temp);
      }
    });
  };

  this.addItem = function() {
    listService.addItem(this.listId, that.itemName(), function(item) {
      that.items.push(item);
    });
  };

  this.itemClicked = function (item) {
    itemViewModel.init(item);
    $.mobile.changePage("#" + itemViewModel.template);
  };

  this.updateItem = function (item) {
    for (index in that.items()) {
      if (that.items()[index].id == item.id) {
        that.items.replace(that.items()[index],  item);
      }
    }
  };

  this.removeItem = function (item) {
    for (index in that.items()) {
      if (that.items()[index].id == item.id) {
        that.items.splice(index, 1);
      }
    }
  };

  this.backToListsView = function () {
    $.mobile.changePage("#" + noListsViewModel.template);
  }
}