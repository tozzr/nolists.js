/*globals $, ko, document, SearchResultsViewModel, TweetViewModel, TwitterSearchViewModel */

ko.virtualElements.allowedBindings.updateListviewOnChange = true;
ko.bindingHandlers.updateListviewOnChange = {
  update: function (element, valueAccessor) {
    ko.utils.unwrapObservable(valueAccessor());  //grab dependency

    var listview = $(element).parents()
                             .andSelf()
                             .filter("[data-role='listview']");

    if (listview) {
      try {
        $(listview).listview('refresh');
      } catch (e) {
        // if the listview is not initialised, the above call with throw an exception
        // there doe snot appear to be any way to easily test for this state, so
        // we just swallow the exception here.
      }
    }
  }
};

// create the various view models
var listService = new MockListService(),
    noListsViewModel = new NoListsViewModel(listService),
    listItemsViewModel = new ListItemsViewModel(listService),
    itemViewModel = new ItemViewModel(listService);

// load the stored state (recent searches)
noListsViewModel.loadLists();

$.mobile.defaultPageTransition = "slide";

$(document).ready(function () {
  // bind each view model to a jQueryMobile page
  ko.applyBindings(noListsViewModel, document.getElementById("listsView"));
  ko.applyBindings(listItemsViewModel, document.getElementById("listItemsView"));
  ko.applyBindings(itemViewModel, document.getElementById("itemView"));
});
