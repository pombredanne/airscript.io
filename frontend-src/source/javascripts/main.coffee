Airscript.init = ->
  Airscript.eventBus = new ko.subscribable()

  {ViewModels} = Airscript

  editor = new ViewModels.Editor()

  ko.applyBindings editor, document.querySelector('section.content')
  ko.applyBindings editor, document.querySelector('.gist_modal')

  $('.gist_modal').modal('show')

  Airscript.aceEditor.setTheme("ace/theme/github")
  Airscript.aceEditor.getSession().setMode("ace/mode/lua")

$ ->
  clip = new ZeroClipboard $('.clipboard').get(0),
    moviePath:'/flash/ZeroClipboard.swf'
