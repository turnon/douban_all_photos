/**
 * Created by turnon on 2018/9/10.
 */
// ==UserScript==
// @name         douban-all-photos
// @namespace    https://github.com/turnon/douban_all_photos
// @version      0.0.1
// @description  douban_all_photos
// @author       block24block@gmail.com
// @match       *://movie.douban.com/*/photos/
// @grant        none
// ==/UserScript==
(function MyPagesLoader($, config) {
  function start() {
    var page_count = config.page_count($)

    var page_loaders = [];
    for (var i = 2; i <= page_count; i++) {
      var next_page = config.next_page(i)
      page_loaders.push($.ajax({
        url: next_page
      }));
    }

    (async function () {
      for (loader of page_loaders) {
        var data = await loader
        config.append_page(data, $)
      }
    })()

    $all.remove()
  }

  var $all = config.button($)
  $all.click(start).css('cursor', 'pointer')
})(jQuery, {
  page_count: function ($) {
    return parseInt($('.paginator .next').prev().text())
  },
  next_page: function (n) {
    var start = (n - 1) * 30
    return window.location.href + '/?type=C&sortby=like&size=a&subtype=a&start=' + start
  },
  append_page: function (data, $) {
    var $article = $(data).find(".article")
    $article.find(".opt-bar-line").remove()
    $(".article").last().after($article)
  },
  button: function ($) {
    var $btn = $('<span>&gt;&gt;&gt;all</span>')
    $('.paginator .next').after($btn)
    return $btn
  }
})