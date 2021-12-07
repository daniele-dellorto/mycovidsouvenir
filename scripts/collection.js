//container as a const -> append later
const cards = d3.select("#all-souvenirs");

//retrieve category through link
const collection = new URLSearchParams(window.location.search).get('collection')

//show the category as a title
const titleContainer = d3.select("#titleContainer");

titleContainer.append('h1')
    .classed("collectionTitle", true)
    .html(collection);

//load json data
d3.json("data/souvenirs.json").then(function (myDataRaw) {

    myData = [];

    //FOR EACH row verify if the product fits into the category
    myDataRaw.forEach(function (product) {

        //array with product categories
        dataSemantics = product.Semantic.split(', ').map(s => s.toLowerCase());
        dataVisuals = product.Visual.split(', ').map(s => s.toLowerCase());

        //IF product includes the category -> add its data to myData (array with all products fitting)
        if (dataSemantics.includes(collection) || dataVisuals.includes(collection)) {
            myData.push(product)
        }
    })

    //object type
    const productType = ['bracelets', 'caps', 'flags', 'masks', 'mugs', 'patches', 'pins', 'socks', 'stickers', 't-shirts', 'others']

    //display objects FOR EACH kind in myData
    productType.forEach(function (product) {

        let count = 0;

        //add 1 to count FOR each object of this kind in myData
        for (var object of myData) {

            if (object.Category.toLowerCase() == product.toLowerCase()) {

                count++;

            }
        }

        //don't show object sections with 0 objects
        if (count > 0) {

            //display object name and count at the beginning of the section
            cards.append('p').html(product + ': ' + count)

            //create cards container
            let typeContainer = cards.append("div")
                .classed("souvenir-grid", true);

            //FOR each object of this kind in my data show image
            for (var object of myData) {

                if (object.Category.toLowerCase() == product.toLowerCase()) {

                    let card = typeContainer.append('div')
                        .classed("img-container", true);

                    card.append("img")
                        .classed("img-fill", true)
                        .attr("src", object.Image)
                }
            }
        }

    });
})