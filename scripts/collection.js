//containers as a const -> append later
const souvenirContainer = d3.select("#all-souvenirs");
const coverContainer = d3.select("#coverContainer");

//retrieve category through link
const collection = new URLSearchParams(window.location.search).get('collection');

//page title
document.title = collectionData[collection].title + " - My Covid Souvenir";

//draw cover

    let coverImg = coverContainer.append('div')
        .classed("col-6", true);

    coverImg.append("img")
        .classed("img-cover", true)
        .attr("src", collectionData[collection].coverImage)

    let coverTxt = coverContainer.append('div')
        .classed("col-6", true);

    coverTxt.append("h1")
        .classed("collectionTitle", true)
        .html(collectionData[collection].title)

    coverTxt.append("p")
        .html(collectionData[collection].text)

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

        }

    })

    setCountries = [...new Set(allCountries)];

    var countCountries = [];

    setCountries.forEach(function (country) {

        var count = 0;

        allCountries.forEach(function (newCountry) {

            if (newCountry == country) {
                count++
            }

        })

        countCountries.push({
            'name': country,
            'value': count
        })

        createDonutChart({
            a: count,
            b: myData.length - count
        });

    })

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
            categoryName = souvenirContainer.append('div').classed('categoryName', true)
            categoryName.append('h2').html(product + ': ' + count)

            //create souvenirContainer container
            let typeContainer = souvenirContainer.append("div")
                .classed("souvenir-grid", true);

            //FOR each object of this kind in my data show image
            for (var object of myData) {

                if (object.category.toLowerCase() == product.toLowerCase()) {

                    let card = typeContainer.append('div')
                        .classed("collCard productSize", true);

                    card.append("img")
                        .classed("thumbImg", true)
                        .attr("src", object.image)
                }
            }
        }

    });

})

function createDonutChart(data) {

    // set the dimensions and margins of the graph
    const width = 200,
        height = 200,
        margin = 8;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select("#countryContainer")
        .append("svg")
        .classed("pieChart", true)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    // set the color scale
    const color = d3.scaleOrdinal()
        .range(["#ff0000", '#d2d2d2'])

    // Compute the position of each group on the pie:
    const pie = d3.pie().sort(null)
        .value(d => d[1])

    const data_ready = pie(Object.entries(data))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('whatever')
        .data(data_ready)
        .join('path')
        .attr('d', d3.arc()
            .innerRadius(radius / 1.2) // This is the size of the donut hole
            .outerRadius(radius)
        )
        .attr('fill', d => color(d.data[0]))
        .style("opacity", 0.7)

}
