const hover = d3.select(".collCard");

hover.onmouseover="this.src='img/newsHover.png'" 

document.querySelectorAll('.collCard').forEach(item => {
    item.addEventListener('mouseenter', event => {

        var time = 1000;

        for (var i = 0; i < 3; i++){
            setInterval(myTimer, time);
        }
    })
  })


  

  function myTimer(i) {
    console.log(i);
  } 


  

 
