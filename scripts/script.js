//containers as a const -> append later
const semCards = d3.select("#semantic-categories");
const visCards = d3.select("#visual-categories");

//load preview.json data
d3.json("data/collections.json").then(function (myData) {

    //for each category in preview.json
    for (var collection in myData){

        //card position based on the type of the category: semantic/visual

        let card;

        if (myData[collection].type == "semantic") {

            card = semCards.append('div')
                .classed("img-container", true)
                .attr('collection', myData[collection].title.toLowerCase())

        } else if (myData[collection].type == "visual") {

            card = visCards.append('div')
                .classed("img-container", true)
                .attr('collection', myData[collection].title.toLowerCase())

         }

        //add image and title

        card.append("img")
            .classed("img-fill", true)
            .attr("src", myData[collection].image)

        card.append("p")
            .classed("title", true)
            .html(myData[collection].title)

    };

    //select all the cards

    var anchors = document.getElementsByClassName('img-container');

    //when click on the card, save title and pass through link

    for (var i = 0; i < anchors.length; i++) {

        var anchor = anchors[i];

        anchor.onclick = function () {

            attr = this.getAttribute('collection')
            window.open('collection.html' + '?collection=' + attr, "_self")

        }
    }

});