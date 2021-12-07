//containers as a const -> append later
const semCards = d3.select("#semantic-categories");
const visCards = d3.select("#visual-categories");

//load json data
d3.json("data/souvenirs.json").then(function (myData) {

    var semantics = [];
    var visuals = [];

    //split semantic and visual categories and put into the two arrays
    myData.forEach(function (object) {

        tempSemantic = object.Semantic.split(', ')
        semantics = semantics.concat(tempSemantic)

        tempVisual = object.Visual.split(', ')
        visuals = visuals.concat(tempVisual)

    });

    //put all categories in the arrays in lowercase
    semantics = semantics.map(s => s.toLowerCase());
    visuals = visuals.map(s => s.toLowerCase());

    //remove duplicates in the arrays
    semantics = [...new Set(semantics)];
    visuals = [...new Set(visuals)];

    //display image FOR EACH semantic
    semantics.forEach(function (semantic) {

        found = false;

        //pick random rows UNTIL one fits the semantic category
        while (found == false) {

            //random row
            index = Math.floor(Math.random() * (myData.length))
            data = myData[index]
            dataSemantics = data.Semantic.split(', ').map(s => s.toLowerCase());

            //check if row includes the semantic category
            if (dataSemantics.includes(semantic)) {

                //stop cycle
                found = true;

                //display image and text
                let card = semCards.append('div')
                    .classed("img-container", true)
                    .attr('collection', semantic)

                card.append("img")
                    .classed("img-fill", true)
                    .attr("src", data.Image)

                card.append("p")
                    .classed("title", true)
                    .html(semantic)

            }
        }

    });

    //display image FOR EACH visual
    visuals.forEach(function (visual) {

        found = false;

        //pick random rows UNTIL one fits the semantic category
        while (found == false) {

            //random row
            index = Math.floor(Math.random() * (myData.length))
            data = myData[index]
            dataVisuals = data.Visual.split(', ').map(s => s.toLowerCase());

            //check if row includes the semantic category
            if (dataVisuals.includes(visual)) {

                //stop cycle
                found = true;

                //display image and text
                let card = visCards.append('div')
                    .classed("img-container", true)
                    .attr('collection', visual)

                card.append("img")
                    .classed("img-fill", true)
                    .attr("src", data.Image)

                card.append("p")
                    .classed("title", true)
                    .html(visual)

            }
        }

    });

    //array with all the cards
    var anchors = document.getElementsByClassName('img-container');

    //FOR EACH card save semantic category and pass through link
    for (var i = 0; i < anchors.length; i++) {

        //single card as a variable
        var anchor = anchors[i];

        //when i click on the card
        anchor.onclick = function () {

            //get semantic category
            attr = this.getAttribute('collection')

            //open new page and pass the semantic category in the link
            window.open('collection.html' + '?collection=' + attr, "_self")

        }
    }

    // filter1Checkbox.addEventListener('change', () => {

    //     if(filter1Checkbox.checked) {
    //         d3.selectAll('.card').transition().duration(900).style("visibility", "hidden");
    //     } else {
    //         d3.selectAll('.card').transition().duration(900).style("visibility", "visible");
    //     }

});