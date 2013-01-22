function NoListsViewModel(listService) {
  
  var that = this,
      listService = listService;

  this.template = "listsView";
  this.listName = ko.observable("list #1");
  this.lists = ko.observableArray();

  this.addList = function () {

    if ($.trim(this.listName()) === "") {
      return;
    }

    listService.addList(that.listName(), function (list) {
      that.lists.push(list);
    });

  };

  this.loadLists = function () {
    
    listService.getLists(function(lists){
      
      for (index in lists) {
        var item = {id: lists[index].id, title: ko.observable(lists[index].title)};
        that.lists.push(item);
      }
    });
  };


  this.listClicked = function (params) {
    listItemsViewModel.init(params.id);
    $.mobile.changePage("#" + listItemsViewModel.template);
  };

  
}
