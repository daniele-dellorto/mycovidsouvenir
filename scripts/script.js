//containers as a const -> append later
const semCards = d3.select("#semantic-categories");
const visCards = d3.select("#visual-categories");


//load preview.json data
d3.json("data/preview.json").then(function (myData) {

    // myData.semantic.forEach(function (name) {});
        // -- -- -- -- -- -- -- -- -- > il json è costruito in modo che semantic è un array contentente elementi così: 
        // {
        //     categoria1: {
        //         "title": "titolo",
        //         "image": "link"
        //     }
        // }, 
        // ...
        // -- -- -- -- -- -- -- -- -- > come richiamare il nome della categoria?
        // myData.semantic.map(function(d) { return d.title; }) ritorna tutti i title nell'array, ma ancora non le categorie



    //for each category in preview.json
    for (var i = 0; i < myData.length; i++) {

        //card position based on the type of the category: semantic/visual

        let card;

        if (myData[i].type == "semantic") {

            card = semCards.append('div')
                .classed("img-container", true)
                .attr('collection', myData[i].title.toLowerCase())

        } else if (myData[i].type == "visual") {

            card = visCards.append('div')
                .classed("img-container", true)
                .attr('collection', myData[i].title.toLowerCase())

        }

        //add image and title

        card.append("img")
            .classed("img-fill", true)
            .attr("src", myData[i].image)

        card.append("p")
            .classed("title", true)
            .html(myData[i].title)

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