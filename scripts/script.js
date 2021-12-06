const cards = d3.select("#all-categories");



// d3.csv(), d3.tsv
d3.json("data/souvenirs.json").then(function (myData) {

    var semantics = [];
    var visuals = [];

    myData.forEach(function (object) {

        tempSemantic = object.Semantic.split(', ')

        semantics = semantics.concat(tempSemantic)

    });

    semantics = semantics.map(s => s.toLowerCase());

    semantics = [...new Set(semantics)];
    console.log(semantics);

    semantics.forEach(function (semantic) {

        found = false;
        while(found == false){

        index = Math.floor(Math.random() * (myData.length))
        data = myData[index]
        dataSemantics = data.Semantic.split(', ').map(s => s.toLowerCase());

            if (dataSemantics.includes(semantic)) {
                found = true
                console.log('wewe');

                let card = cards.append('div')
                    .classed("img-container", true)
                    .attr('collection', semantic);

                card.append("img")
                    .classed("img-fill", true)
                    .attr("src", data.Image)

                card.append("p")
                    .classed("title", true)
                    .html(semantic)

            }
        }

    });


    // document.getElementsByClassName('img-container').addEventListener('click', openCollection(this))

    var anchors = document.getElementsByClassName('img-container');
        for(var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i];
            anchor.onclick = function() {

                attr = this.getAttribute('collection')
                console.log(attr);

                window.open('collection.html' + '?collection=' + attr)

            }
        }

    // filter1Checkbox.addEventListener('change', () => {

    //     if(filter1Checkbox.checked) {
    //         d3.selectAll('.card').transition().duration(900).style("visibility", "hidden");
    //     } else {
    //         d3.selectAll('.card').transition().duration(900).style("visibility", "visible");
    //     }
});

function openCollection(e){
    console.log(e);
}