products = document.querySelectorAll("article");
for (let i = 0; i < products.length; i++){
    let prodURL = products[i].querySelector("a").getAttribute("href").replace("https://www.saveonfoods.com/sm/planning/rsid/1982/product/", "")
    console.log(prodURL)

    fetch(`https://www.saveonfoods.com/sm/planning/rsid/1982/product/${prodURL}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        return response.text(); 
    })
    .then(data => {

        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        console.log(doc)

        let placeholder = doc.getElementsByClassName("ServingsItemDetails--1r4nlgl")
        let rawSugarContent = []
        for (let i = 0; i < placeholder.length; i++){
            rawSugarContent.push(placeholder[i].innerText)
        }
        console.log(rawSugarContent[5])
        let fixedSugar = Number(rawSugarContent[5].replace("g",""))
        if (fixedSugar <= 3){
            products[i].style.border = "5px solid #00FF00";
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

