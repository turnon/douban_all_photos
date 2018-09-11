/**
 * Created by turnon on 2018/9/10.
 */
// ==UserScript==
// @name         douban-all-photos
// @namespace    https://github.com/turnon/douban_all_photos
// @version      0.0.5
// @description  douban_all_photos
// @author       block24block@gmail.com
// @match       *://movie.douban.com/*/photos*
// @grant        none
// @require https://greasyfork.org/scripts/372117-mypagesloader/code/MyPagesLoader.js?version=628209
// ==/UserScript==
MyPagesLoader.config(jQuery, {
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