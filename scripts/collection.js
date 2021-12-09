//containers as a const -> append later
const cards = d3.select("#all-souvenirs");
const coverContainer = d3.select("#coverContainer");

//retrieve category through link
const collection = new URLSearchParams(window.location.search).get('collection')

// ****************************************************************************************************************
// vale la pena accorpare preview.json e covers.json?
// bisognerebbe scrivere come preview.json, magari aggiungendo un identifier=""
// però invece che categories[collection].image occorrerebbe mettere un if(categories.identifier == collection)
// ****************************************************************************************************************

//load cover
d3.json("data/collections.json").then(function (categories) {

    let coverImg = coverContainer.append('div')
        .classed("col-6", true);

    coverImg.append("img")
        .classed("img-cover", true)
        .attr("src", categories[collection].coverImage)

    let coverTxt = coverContainer.append('div')
        .classed("col-6", true);

     coverTxt.append("h1")
        .classed("collectionTitle", true)
        .html(categories[collection].title)

    coverTxt.append("p")
        .html(categories[collection].text)

})

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
            cards.append('h2').html(product + ': ' + count)

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