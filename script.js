const mobile_nav = document.querySelector(".mobile-navbar-btn")
const nav_header = document.querySelector(".header")

const tooglenavbar = () => {
    nav_header.classList.toggle("active");
};


mobile_nav.addEventListener('click', () => tooglenavbar());




news();
var cur_articles;

function news(news_type) {

    document.getElementById("container").innerHTML = '';
    let url;

    if (news_type == undefined) {
        url = `https://newsapi.org/v2/everything?q=coding&language=en&sortBy=publishedAt&apiKey=a431c59245b846ca86b3e311c3c6d02c`;
    } else {
        url = `https://newsapi.org/v2/top-headlines?country=in&category=${news_type}&language=en&apiKey=a431c59245b846ca86b3e311c3c6d02c`;
    }
fetch_news(url)
  
}
function fetch_news(url)
{
    fetch("https://apiinvoker.pythonanywhere.com/api/",{method:"POST",body:JSON.stringify({'api':url})}).then((response) => response.json()).then(data => {
        // console.log(data);
        cur_articles = data.articles;
        for (let i = 0; i < data.articles.length; i++) {
            let curr = data.articles[i];
         


              console.log(i)
                  console.log(curr)
                document.getElementById("container").innerHTML += `
                  <div id="card" onclick="tooltip(${i})">  
              <img src="${curr.urlToImage}" alt="Image not available">
              
             <h3 id="title">${curr.title}</h3>
             <p id="description"> ${curr.description}
             </p>

           </div> `;
                
            

        }


    });
    
}
// function to show pop up or tool tip
function tooltip(i) {

    console.log(cur_articles[i]);
    document.getElementById("tooltip_image").src = cur_articles[i].urlToImage;
    document.getElementById("tooltip_box_heading").innerText = cur_articles[i].title;
    document.getElementById("tooltip_box_desc").innerHTML = cur_articles[i].description;
    document.getElementById("source_url").innerHTML = cur_articles[i].url;
    document.getElementById("source_url").href = cur_articles[i].url;
    document.getElementById("tooltip_box").style.display = "flex";
}
function hideTooltip() {
    document.getElementById("tooltip_box").style.display = "none";
}

