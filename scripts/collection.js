//containers as a const -> append later
const cards = d3.select("#all-souvenirs");
const coverContainer = d3.select("#coverContainer");

//retrieve category through link
const collection = new URLSearchParams(window.location.search).get('collection')

//page title
document.title = collection.toUpperCase();

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

    allCountries = [];

    //FOR EACH row verify if the product fits into the category
    myDataRaw.forEach(function (product) {

        //array with product categories
        dataSemantics = product.Semantic.split(', ').map(s => s.toLowerCase());
        dataVisuals = product.Visual.split(', ').map(s => s.toLowerCase());

        //IF product includes the category -> add its data to myData (array with all products fitting)
        if (dataSemantics.includes(collection) || dataVisuals.includes(collection)) {

            myData.push(product)

            countries = product.Country.split(', ').map(s => s.toLowerCase());
            allCountries = allCountries.concat(countries);

        }

    })

    console.log(allCountries);

    setCountries = [...new Set(allCountries)];

    console.log(setCountries);

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


    })

    console.log(countCountries);

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

function createDonutChart() {

    // set the dimensions and margins of the graph
    var width = 450
    height = 450
    margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#countryContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create dummy data
    var data = {
        a: 9,
        b: 20,
        c: 30,
        d: 8,
        e: 12
    }

    // set the color scale
    var color = d3.scaleOrdinal()
        .domain(data)
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })
    var data_ready = pie(d3.entries(data))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(100) // This is the size of the donut hole
            .outerRadius(radius)
        )
        .attr('fill', function (d) {
            return (color(d.data.key))
        })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

}