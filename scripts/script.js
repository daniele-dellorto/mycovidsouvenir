//containers as a const -> append later
const semCards = d3.select("#message-grid");
const visCards = d3.select("#visual-grid");

//load preview.json data
d3.json("data/collections.json").then(function (myData) {

    //for each category in preview.json
    for (var collection in myData) {

        //card position based on the type of the category: semantic/visual

        let card;

        if (myData[collection].type == "semantic") {

            card = semCards.append('div')
                .classed("collCard", true)
                .attr('collection', myData[collection].title.toLowerCase())

        } else if (myData[collection].type == "visual") {

            card = visCards.append('div')
                .classed("collCard", true)
                .attr('collection', myData[collection].title.toLowerCase())

        }

        //call function count
        var categoryCount = countObjects("data/souvenirs.json", myData[collection].type, myData[collection].title.toLowerCase())
        console.log(categoryCount);

        //add image and title

        card.append("h3")
            .classed("title", true)
            .html(myData[collection].title)

        card.append("p")
                .classed("title", true)
                .html(categoryCount + " products")

        card.append("img")
            .classed("img-fill", true)
            .attr("src", myData[collection].image)

    };

    //select all the cards

    var anchors = document.getElementsByClassName('collCard');

    //when click on the card, save title and pass through link

    for (var i = 0; i < anchors.length; i++) {

        var anchor = anchors[i];

        anchor.onclick = function () {

            attr = this.getAttribute('collection')
            window.open('collection.html' + '?collection=' + attr, "_self")

        }
    }

});

function countObjects(dataLink, attribute, value) {

    d3.json(dataLink).then(function (data) {

        

    var count = 0;


        data.forEach(function(d) {

            dataValue = d[attribute].split(', ').map(s => s.toLowerCase());

            if (dataValue.includes(value)) {
                count++;
            }
        });

        
    return count
    
    });
    

}