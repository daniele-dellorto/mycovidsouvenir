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

            imgContainer.append('img')
                .classed("product-image", true)
                .attr("src", data[i].image)

            imgContainer.append('a')
                .classed("amazon-link", true)
                .attr("href", data[i].link)
                .attr("target", "_blank")
                .html("link")

            let semContainer = textContainer.append('div')
                .classed("product-tag", true)

            semContainer.append("p")
                .classed("tag-title", true)
                .html("messages: ")

            let visContainer = textContainer.append('div')
                .classed("product-tag", true)
    
            visContainer.append("p")
                .classed("tag-title", true)
                .html("visuals: ")

            semTags = data[i].semantic.split(', ').map(s => s.toLowerCase());
            visTags = data[i].visual.split(', ').map(s => s.toLowerCase());

            semTags.forEach(function (semTag) {                

                var linkTag = "collection.html" + "?collection=" + semTag;

                semContainer.append('a')
                    .classed("tag", true)                    
                    .attr("href", linkTag)
                    .html(semTag)

            })

            visTags.forEach(function (visTag) {                

                var linkTag = "collection.html" + "?collection=" + visTag;

                visContainer.append('a')
                    .classed("tag", true)                    
                    .attr("href", linkTag)
                    .html(visTag)

            })
            
            countries = data[i].country.split(', ').map(s => s.toLowerCase());

            countries.forEach(function (country) {

                noDots = country.split(".").join("");
                flagLink = "./assets/svg/" + noDots + ".svg";

                let marketplace = textContainer.append('div')
                    .classed("marketplace", true)

                marketplace.append('img')
                    .classed("flag", true)
                    .attr("src", flagLink)

                marketplace.append('p')
                    .classed("domain", true)
                    .html(country)

            })

            break
        }

    }

})