const cards = d3.select("#all-souvenirs");
const collection = new URLSearchParams(window.location.search).get('collection')
console.log(collection);

// d3.csv(), d3.tsv
d3.json("data/souvenirs.json").then(function (myDataRaw) {
    myData = []
    myDataRaw.forEach(function(product){
        dataSemantics = product.Semantic.split(', ').map(s => s.toLowerCase());
        if(dataSemantics.includes(collection)){
            myData.push(product)
        }
    })  

    const productType = ['bracelets', 'caps', 'cover', 'flags', 'masks', 'mugs', 'others', 'patches', 'pins', 'socks', 'stickers', 't-shirts']

    productType.forEach(function (product) {

        let count = 0;
        for (var object of myData) {

            if (object.Category.toLowerCase() == product.toLowerCase()) {

                count ++;
            }
        }
        cards.append('p').html(product + ': ' + count)

        let typeContainer = cards.append("div")
            .classed("souvenir-grid", true);

        for (var object of myData) {

            if (object.Category.toLowerCase() == product.toLowerCase()) {

                let card = typeContainer.append('div')
                    .classed("img-container", true);

                card.append("img")
                    .classed("img-fill", true)
                    .attr("src", object.Image)
            }
        }

    });
})