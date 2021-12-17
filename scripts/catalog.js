//containers as a const -> append later
const semCards = d3.select("#message-grid");
const visCards = d3.select("#visual-grid");

for (var collection in collectionData) {

  let collTitle = collectionData[collection].title;
  let collId = collectionData[collection].title.toLowerCase();
  let collType = collectionData[collection].type;
  let collImg = collectionData[collection].image;
  let collGif = collectionData[collection].gif;

  d3.json("data/souvenirs.json").then(function (data) {

    var count = 0;

    data.forEach(function (d) {

      dataValueMes = d.semantic.split(', ').map(s => s.toLowerCase());
      dataValueVis = d.visual.split(', ').map(s => s.toLowerCase());

      if (dataValueMes.includes(collId) || dataValueVis.includes(collId)) {
        count++;
      }
    });

    var sizeClass;

    if (count < 100) {

      sizeClass = "small"

    } else if (count < 500) {

      sizeClass = "medium"

    } else {

      sizeClass = "big"

    }

    let card;

    if (collType == "semantic") {

      card = semCards.append('div')
        .classed("collCard", true)
        .classed(sizeClass, true)

    } else if (collType == "visual") {

      card = visCards.append('div')
        .classed("collCard", true)
        .classed(sizeClass, true)

    } else {

    }

    card.append("h3")
      .classed("title", true)
      .html(collTitle)

    card.append("p")
      .classed("count", true)
      .html(count + " products")

    card.append("img")
      .classed("thumbImg static", true)
      .attr("src", collImg)

    let video = card.append("video")
      .attr("loop", "")
      .attr("muted", "")
      .classed("thumbImg active", true)
      .attr("onmouseover", "this.play()")
      .attr("onmouseout", "this.pause();this.currentTime=0;")

      video.append("source")      
        .attr("src", collGif)     
        .attr("type", "video/ogg")

    card.on("click", function () {
      window.open('collection.html' + '?collection=' + collId, "_self")
    });

  });

}

document.querySelectorAll('.scrollBarStyle').forEach(item => {
  item.addEventListener('mouseenter', event => {
    //reset sections to minimum dimension
    document.querySelectorAll('.scrollBarStyle').forEach(item => {
      item.classList.remove("col-6");
      item.classList.remove("col-10");
      item.classList.add("col-2");
    });
    //set the hovered section to max dimension
    item.classList.remove("col-2");
    item.classList.add("col-10");

    document.querySelectorAll('.souvenir-grid').forEach(card => {
      card.classList.add('minifiedGrid');
    });

    item.querySelectorAll('.souvenir-grid').forEach(card => {
      card.classList.remove('minifiedGrid');
    });

    document.querySelectorAll('.collCard').forEach(card => {
      card.classList.add('minified');
    });

    item.querySelectorAll('.collCard').forEach(card => {
      card.classList.remove('minified');
    });

    document.querySelectorAll('.souvenir-grid').forEach(card => {
      card.classList.add('minifiedDarken');
    });

    item.querySelectorAll('.souvenir-grid').forEach(card => {
      card.classList.remove('minifiedDarken');
    });

  })
})