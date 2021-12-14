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

                textContainer.append('p')
                    .classed("product-tags", true)
                    .html(data[i].country)

            imgContainer.append('img')
                .classed("product-image", true)
                .attr("src", data[i].image)

            break
        }

    }

})