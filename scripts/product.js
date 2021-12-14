const id = new URLSearchParams(window.location.search).get('id');

//containers as a const -> append later
const imgContainer = d3.select("#prodImg");
const textContainer = d3.select("#prodText");

d3.json("data/souvenirs.json").then(function (data) {

    //FOR EACH row verify if the product fits into the category
    for (var i = 0; i < data.length; i++) {

        if (data[i].id == id) {

            textContainer.append('h2')
                .classed("product-name", true)
                .html(data[i].name)

            textContainer.append('h3')
                .classed("product-category", true)
                .html(data[i].category)

            textContainer.append('p')
                .classed("product-tags", true)
                .html("message: " + data[i].semantic)

            textContainer.append('p')
                .classed("product-tags", true)
                .html("message: " + data[i].visual)

            imgContainer.append('img')
                .classed("product-image", true)
                .attr("src", data[i].image)

            countries = data[i].country.split(', ').map(s => s.toLowerCase());

            countries.forEach(function (country) {

                flagLink = "./assets/svg/" + country + ".svg"

                textContainer.append('img')
                    .classed("flag", true)
                    .attr("src", flagLink)

            })

            break
        }

    }

})