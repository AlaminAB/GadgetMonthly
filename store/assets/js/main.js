var d=new Date,month=new Array;month[0]="January",month[1]="February",month[2]="March",month[3]="April",month[4]="May",month[5]="June",month[6]="July",month[7]="August",month[8]="September",month[9]="October",month[10]="November",month[11]="December";var month_name=month[d.getMonth()],day_of_month=d.getDate(),current_year=d.getFullYear(),dayOfMonthElement=document.getElementById("current_day"),currentMonthElement=document.getElementById("current_month"),currentYearElement=document.getElementById("current_year");!function(){currentMonthElement.innerHTML=month_name,dayOfMonthElement.innerHTML=day_of_month,currentYearElement.innerHTML=current_year}();

// flag 
$.get('https://freegeoip.app/json/',function(response){
    let img = `<img src="https://www.countryflags.io/${response.country_code}/flat/64.png">`
   $("#flag").append(img)
   
    },'json');


    const client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: "1h1pkelrmug3",
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: "87dl1xafztVIfV5KhUF1sAS2pP6cCJhXGWSTOGqDbfw"
      });
  
  // Product section *****************************
  
        client.getEntries({
        content_type: "title"
      })
        .then(function (entries) {
  const store ={}
    
    const alldata =  entries.items.map( data=>{
      
       const paragraph= data.fields.description.content.map(maindata =>{
         
           const datas = documentToHtmlString(maindata)
        
           return {
            datas
           }
        })
       
  
  // returning all data 
       return {
         img:data.fields.img.fields.file.url,
         paragraph:paragraph,
         officialLink:data.fields.officialLink2,
         oldPrice : data.fields.oldPrice,
         price:data.fields.price,
         rating:data.fields.rating,
         totalrating: data.fields.totalrating,
         reviewLink : data.fields.reviewLinkbottom
  
       }
       
      })
      // console.log(alldata[1].officialLink)
     

      alldata.map((data,index)=>{
    
  const singleProduct = `<div class="product-card ${index+1==1? "mt-0":"mt-5"}">
    <div class="product-card-1">
      <p class="number ${index+1 == 1? "green": ""}">${index+1}.</p>
      ${index+1 == 1 ? ` <p class="best-rated"> <i class="fas fa-crown"></i> Best Rated November 2020</p>`: ""}
      <img src=" ${data.img ?  `${data.img}` : " " }" alt="Kerosene-Convection-Tower-Heater">
    </div>
  
    <div class="product-card-3">
      <div class="product-card-3-info">
        <div class="product-price d-block d-md-none">
          <div class="two-price">
            <div class="new-price">
              ${data.price ?  `<h5>$${data.price} </h5>` : " " }
              
            </div>
           
           <div class="old-price">
            ${data.oldPrice ?  `<h5>$${data.oldPrice} </h5>` : " " }
             
            </div>
          </div>
        </div>
        <h3> ${data.rating ?  `${data.rating}` : "0" }</h3>
        <h5>EXCELLENT</h5>
        <div class="score-wrap">
          <div class="score">
          <span class="stars-active" style="width: ${data.rating*20}%;">
            <i class="fa fa-star"></i> 
            <i class="fa fa-star"></i>
             <i class="fa fa-star"></i> 
             <i class="fa fa-star"></i> 
             <i class="fa fa-star"></i>
            </span>
              <span class="stars-inactive" >
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                <i class="far fa-star"></i>
                </span>
              </div>
        </div>
        <p>User Ratings (${data.totalrating})</p>
        
        <a href="${data.officialLink ?  `${data.officialLink}` : "" }" class="visit-btn d-none d-md-block">Visit Official Site</a>
      </div>
  
    </div>
  
  
    <div class="product-card-2">
      <div class="product-rating-price d-none d-md-flex">
        <div class="product-rating">
          <p>Our Rating</p>
  
          <div class="score-wrap">
            <div class="score">
            <span class="stars-active" style="width: ${data.rating*20}%;">
              <i class="fa fa-star"></i> 
              <i class="fa fa-star"></i>
               <i class="fa fa-star"></i> 
               <i class="fa fa-star"></i> 
               <i class="fa fa-star"></i>
              </span>
                <span class="stars-inactive" >
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  <i class="far fa-star"></i>
                  </span>
                </div>
          </div>
  
        </div>
  
        <div class="product-price ">
          <p>Price</p>
          <div class="two-price">
            <div class="new-price">
              ${data.price ?  `<h5>$${data.price} </h5>` : " " }
            </div>
            <div class="old-price">
              ${data.oldPrice ?  `<h5>$${data.oldPrice} </h5>` : " " }
            </div> 
          </div>
        </div>
      </div>
    
      <div class="product-description">
        <ul>
          ${data.paragraph.map(data=>{
            // console.log(data)
            return `<li><i class="fas fa-check-square"></i> ${data.datas} </li>`
            }).join('')}
          
          
        </ul>
        <a href="" class="visit-btn d-block d-md-none text-center">Visit Official Site</a>
      </div>
      <a href="${data.reviewLink}" class="review">Read Review</a>
    </div>
  
  
  
  </div>
  ${index+1==1? `<div class="update">
    <strong>UPDATE:</strong> Due to popular demand, we have secured a limited amount of 50% discount codes for the FitTrack! First time buyers only. A few remain, <a href="">claim yours by clicking here.</a>
  </div>`: ""}
  `;
  

  $("#allproduct").append(singleProduct)
  
  })
        
   
   
  
        })
        // .catch(error => console.log(error));   
  
  
  // banner section *****************************
      client.getEntries({
        content_type: "header"
      }).then(response => {
        response.items.map(data=>{
  
          const banner= `  <div class="banner-area"
      style="background-image: linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${data.fields.bannerImg.fields.file.url});">
      <div class="container">
        <div class="banner-wraper d-flex align-items-center">
          <div class="left-heading">
            <h1>${data.fields.bigHeading}
            </h1>
          </div>
          <div class="right-badge">
            <img src="${data.fields.bannerLogo.fields.file.url}" alt="Product-banner">
          </div>
        </div>
      </div>
    </div>`;
          $("#banner-section").append(banner);
          $("title").html(data.fields.bigHeading)
        })
      });
  
      
      
  
  
  // top Description section *****************************
  client.getEntries({
        content_type: "topdescription"
      }).then(entries => {
  const arr=[]
   entries.items.map( data=>{
  data.fields.topDescription.content.map(maindata =>{
          arr.push(documentToHtmlString(maindata))
       })
     })
            const topdescription= `  <div class="top-single-description">
              ${arr.map(data=>{
            return `<p> ${data} </p>`
            }).join('')}
        
      </div>`;
  
          $("#top-description").append(topdescription);
  
      });
  
    
      
      // Bottom Description section *****************************
  client.getEntries({
        content_type: "bottomDescription"
      }).then(entries => {
  const arr=[]
   entries.items.map( data=>{
  data.fields.bottomDescription.content.map(maindata =>{
          arr.push(documentToHtmlString(maindata))
       })
     })
            const bottomDescription= `  <div class="full-description">
              ${arr.map(data=>{
            return `${data}`
            }).join('')}
        
      </div>`;
  
          $("#bottom-description").append(bottomDescription);
  
      });