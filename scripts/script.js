//containers as a const -> append later
const semCards = d3.select("#message-grid");
const visCards = d3.select("#visual-grid");

//load preview.json data
d3.json("data/collections.json").then(function (myData) {

    //for each category in preview.json
    for (var collection in myData) {

        let collTitle = myData[collection].title;
        let collId = myData[collection].title.toLowerCase();
        let collType = myData[collection].type;
        let collImg = myData[collection].image;

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

            }

            card.append("h3")
                .classed("title", true)
                .html(collTitle)

            card.append("p")
                .classed("title", true)
                .html(count + " products")

            card.append("img")
                .classed("thumbImg", true)
                .attr("src", collImg)

            card.on("click", function() {
                window.open('collection.html' + '?collection=' + collId, "_self")               
            });

        });

    }

    //select all the cards

    // var anchors = document.getElementsByClassName('collCard');

    // //when click on the card, save title and pass through link

    // for (var i = 0; i < anchors.length; i++) {

    //     console.log("wewe");

    //     var anchor = anchors[i];


    // }

});