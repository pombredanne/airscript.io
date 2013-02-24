(function() {

  Airscript.namespace("Airscript.ViewModels", function(Models) {
    return Models.Editor = function() {
      var self;
      self = this;
      this.aceEditor = ace.edit("editor");
      this.aceEditor.setShowPrintMargin(false);
      Airscript.aceEditor = this.aceEditor;
      this.scriptsView = new Models.Scripts();
      this.consoleView = new Models.Console();
      this.projectName = ko.observable('pyConRussia.herokuapp.com');
      this.source = ko.observable('');
      this.scriptName = ko.observable('New Script');
      this.fullScriptUrl = ko.computed(function() {
        return "http://" + (self.projectName()) + "/" + (self.scriptsView.activeScriptName());
      });
      this.fullScriptPath = ko.computed(function() {
        return "" + (self.projectName()) + "/" + (self.scriptsView.activeScriptName());
      });
      this.saveScript = function() {
        return Airscript.eventBus.notifySubscribers({
          name: this.scriptName(),
          source: this.source()
        }, 'script:save');
      };
      Airscript.eventBus.subscribe(function(_arg) {
        var name, source;
        source = _arg.source, name = _arg.name;
        this.source(source);
        return this.scriptName(name);
      }, this, "editor:updateCode");
      return this;
    };
  });

}).call(this);
