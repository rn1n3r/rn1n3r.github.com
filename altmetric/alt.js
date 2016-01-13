console.log("Hello World!");

var api = "http://www.altmetric.com/api/v1/summary_report/1w?num_results=100&group=schulichmd&citation_type=news%2Carticle%2Cclinical_trial_study_record%2Cdataset%2Cbook%2Cgeneric&order_by=score";
var list;
//$(".article").append("<div class='altmetric-embed' data-doi='10.1038/nature.2012.9872'></div>");
function getInfo () {
  return $.getJSON(api);
}

getInfo().done(function(data) {
    for (i = 0; i < data.top_citations_by_mentions.length; i++) {
      $(".article").append("<div class='altmetric-embed' data-badge-type='medium-donut' data-doi='" + data.top_citations_by_mentions[i].doi + "'</div>");
      $(".article").append("<div class = 'title'>" + data.top_citations_by_mentions[i].title + "</div");

      var authors = data.top_citations_by_mentions[i].authors;
      var authorStr = '';
      if (authors.length > 6) {
        authors = authors.slice(0,5);
        authorStr = authors.join(', ') + ", ...";
      }
      else {
        authorStr = authors.join(', ');
      }


      $(".article").append("<br><div class = 'authors'>" + authorStr + "</div");
      $(".article").append("<br><a href='" + data.top_citations_by_mentions[i].links[i] + "'>Link</a>");

      $(".article").append("<br style='clear:both' />");

  }


}).fail(function () {

});


$.getScript("https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js", function(){

   //alert("Script loaded but not necessarily executed.");

});
