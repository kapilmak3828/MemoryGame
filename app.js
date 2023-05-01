const section = document.querySelector('section');
const livescount = document.querySelector('.livescount');
let playerlives = 8;
livescount.textContent = playerlives;

const resetBtn = document.querySelector('#rbtn')

const getData = ()=> [ 
        {imgSrc : './images2/jethalal.webp' , name : 'jethalal'},
        {imgSrc : './images2/babita.webp' , name : 'babita'},
        {imgSrc : './images2/biede.jpg' , name : 'biede'},
        {imgSrc : './images2/chachaji.webp' , name : 'chachaji'},
        {imgSrc : './images2/bhaga.webp' , name : 'bhaga'},
        {imgSrc : './images2/daya.webp' , name : 'daya'},
        {imgSrc : './images2/iyer.webp' , name : 'iyer'},
        {imgSrc : './images2/popatlal.webp' , name : 'popatlal'},
        {imgSrc : './images2/jethalal.webp' , name : 'jethalal'},
        {imgSrc : './images2/babita.webp' , name : 'babita'},
        {imgSrc : './images2/biede.jpg' , name : 'biede'},
        {imgSrc : './images2/chachaji.webp' , name : 'chachaji'},
        {imgSrc : './images2/bhaga.webp' , name : 'bhaga'},
        {imgSrc : './images2/daya.webp' , name : 'daya'},
        {imgSrc : './images2/iyer.webp' , name : 'iyer'},
        {imgSrc : './images2/popatlal.webp' , name : 'popatlal'}
    ];




const randomizer = () => {
const cardData = getData();
cardData.sort(() => Math.random() - 0.5);
// console.log(cardData);
return cardData;
}


const  cardGenerator = ()=>{

    const cardData = randomizer();
    
    //genearate the html

    cardData.forEach((item) =>{
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');

        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        face.src = item.imgSrc;
        card.setAttribute("name" , item.name);
        
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click' , (e) => {
            e.target.classList.toggle('toggleCard')
            checkCards(e);
        })
        
    });

};


const checkCards = (e) =>{
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCard = document.querySelectorAll('.flipped');
    const toggleCards = document.querySelectorAll('.toggleCard');
    
    if(toggleCards.length === 16){
       setTimeout(()=>{
        restart("You win");
       },100);
    }

    if(flippedCard.length  === 2){
        if(flippedCard[0].getAttribute('name') === flippedCard[1].getAttribute('name')){
            // console.log("match");
            playerlives++;
            livescount.textContent = playerlives;
            flippedCard.forEach((card) => {
                card.classList.remove('flipped');
            })
        }else{
            // console.log("wrong");
            flippedCard.forEach((card)=>{
                card.classList.remove('flipped');
                setTimeout(()=> card.classList.remove('toggleCard'),1000)
            })
            playerlives--;
            livescount.textContent = playerlives;
            if(playerlives === 0){
                restart("You Lose");
            }

        }
    }
}


const restart = (text) =>{
    let cardData = randomizer();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll('.card');
    resetBtn.disabled = true;
    resetBtn.style.backgroundColor = "red";
    section.style.pointerEvents = "none";
    cardData.forEach((item , index) => {
      cards[index].classList.remove('toggleCard'); 

      setTimeout(()=>{
       cards[index].style.pointerEvents = "all";
       faces[index].src = item.imgSrc;
       cards[index].setAttribute('name' , item.name);
       section.style.pointerEvents = "all";
       resetBtn.disabled = false;
       resetBtn.style.backgroundColor = "rgb(34, 123, 224)";
      },1000);
    });
    playerlives = 8;
    livescount.textContent = playerlives;

    setTimeout(()=>{
      
        window.alert(text);

    } , 100)
};


resetBtn.addEventListener('click' , ()=>{
    restart("Reset Game")
});


cardGenerator();