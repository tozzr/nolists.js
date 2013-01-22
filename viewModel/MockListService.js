function MockListService() {
  
  var lists = [
    {
        id: 1, title: 'List 1', 
        items: [{id:11, text: 'Item 1'},{id: 12, text: 'Item 2'}]
    }
  ];

  this.getLists = function (callback) {
    callback(lists);
  };

  this.addList = function (listName, callback) {
    var list = { id: lists.length+1, title: listName, items: []};
    lists[list.id] = list;
    callback(list);
  };

  this.getList = function(id, callback) {
    for (index in lists) {
      if (lists[index].id == id) {
        return callback(lists[index]);
      }
    }
  };

  this.addItem = function (listId, itemName, callback) {
    this.getList(listId, function(list) {
      var item = {id: list.items.length+1, text: itemName};
      list.items.push(item);
      callback(item);
    });
  };

  this.updateItem = function (item, callback) {
    var index = findItemIndizes (item.id);
    lists[index.listIndex].items[index.itemIndex].text = item.text;
    callback();
  };

  this.deleteItem = function (id, callback) {
    var index = findItemIndizes (id);
    if (index.error) return callback(true);
    lists[index.listIndex].items.splice(index.itemIndex, 1);
    callback (false);
  };

  function findItemIndizes (id) {
    for (listIndex in lists) {
      for (itemIndex in lists[listIndex].items) {
        if (lists[listIndex].items[itemIndex].id == id) {
          return { listIndex: listIndex, itemIndex: itemIndex};
        }
      }
    }
    return {error: true};
  };

};
