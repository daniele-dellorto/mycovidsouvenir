//containers as a const -> append later
const souvenirContainer = d3.select("#all-souvenirs");
const coverContainer = d3.select("#coverContainer");

//retrieve category through link
const collection = new URLSearchParams(window.location.search).get('collection');

//page title
document.title = collectionData[collection].title + " - My Covid Souvenir";

//draw cover
let coverTxt = coverContainer.append('div')
    .classed("col-6", true);

coverTxt.append("h1")
    .classed("collectionTitle", true)
    .html(collectionData[collection].title)

coverTxt.append("p")
    .html(collectionData[collection].text)

let coverImg = coverContainer.append('div')
    .classed("col-6", true);

coverImg.append("img")
    .classed("img-cover", true)
    .attr("src", collectionData[collection].coverImage)

myData = [];

//load json data
d3.json("data/souvenirs.json").then(function (myDataRaw) {

    allCountries = [];

    //FOR EACH row verify if the product fits into the category
    myDataRaw.forEach(function (product) {

        //array with product categories
        dataSemantics = product.semantic.split(', ').map(s => s.toLowerCase());
        dataVisuals = product.visual.split(', ').map(s => s.toLowerCase());

        //IF product includes the category -> add its data to myData (array with all products fitting)
        if (dataSemantics.includes(collection) || dataVisuals.includes(collection)) {

            myData.push(product)

            countries = product.country.split(', ').map(s => s.toLowerCase());
            allCountries = allCountries.concat(countries);

        } else if (collection == "leftovers" && dataSemantics == "" && dataVisuals == "") {

            myData.push(product)

            countries = product.country.split(', ').map(s => s.toLowerCase());
            allCountries = allCountries.concat(countries);

        }

    })

    setCountries = [...new Set(allCountries)];

    var countCountries = [{
        name: 'none',
        value: 0
    }];

    setCountries.forEach(function (country) {

        var count = 0;

        allCountries.forEach(function (newCountry) {

            if (newCountry == country) {
                count++
            }

        })

        thisCountry = {
            'name': country,
            'value': count
        }

        for (var i = 0; i < countCountries.length; i++) {
            if (thisCountry.value > countCountries[i].value) {
                countCountries.splice(i, 0, thisCountry)
                break
            }
        }
    })

    countCountries.pop();

    countryList = coverContainer.append('div')
        .classed("row", true);

    for (var i = 0; i < countCountries.length; i++) {
        name = countCountries[i].name
        value = countCountries[i].value
        countryList.append('p').html(name + ": " + value)
    }


    console.log(countCountries);

    //object type
    const productType = ['bracelets', 'caps', 'flags', 'masks', 'mugs', 'patches', 'pins', 'socks', 'stickers', 't-shirts', 'others']

    //display objects FOR EACH kind in myData
    productType.forEach(function (product) {

        let count = 0;

        //add 1 to count FOR each object of this kind in myData
        for (var object of myData) {
            if (object.category.toLowerCase() == product.toLowerCase()) {
                count++;
            }
        }

        //don't show object sections with 0 objects
        if (count > 0) {

            //display object name and count at the beginning of the section
            categoryName = souvenirContainer.append('div').classed('row categoryName', true)
            categoryName.append('h3').html(product + ': ' + count)

            //create souvenirContainer container
            let typeContainer = souvenirContainer.append("div")
                .classed("souvenir-grid", true);

            //FOR each object of this kind in my data show image
            for (var object of myData) {

                if (object.category.toLowerCase() == product.toLowerCase()) {

                    var card = typeContainer.append('div')
                        .classed("collCard productSize", true)
                        .attr('id','prod' + object.id);

                    card.append("div")
                        .classed("annotationContainer", true);

                    card.append("img")
                        .classed("thumbImg", true)
                        .attr("src", object.image)
                }
            }
        }

    });

    document.querySelectorAll('.collCard').forEach(item => {
        item.addEventListener('click', function () {
            var prodId = item.getAttribute("id");
            window.open('product.html' + '?id=' + prodId, "_self");
        })
    })

    annotationCreate();

})

function annotationCreate() {

    annotations.forEach(function (annotation) {

        annotatedProduct = d3.select('#prod' + annotation.id);

        console.log("prod: ", annotatedProduct);

        annotationContainer = annotatedProduct.select(".annotationContainer");

        console.log("cont: ", annotationContainer);

        var annotation = annotationContainer.append("div")
                                            .classed("annotation", true);
          annotation.append("div");
          annotation.append("p").html("!");

    })
}
