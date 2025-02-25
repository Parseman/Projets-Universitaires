const pingouin=document.getElementById('pingouin');
const eau     =document.getElementById('eau'     );

let score=0;

// Réagir quand l'utilisateur appuie sur une touche.
// Tous les évènements remontent (bubbling) jusqu'à document.
// Donc, quand on veut attraper un événement où qu'il survienne sur la page, on peut écouter sur document.
document.addEventListener('keydown',function(event){
  // La position verticale du haut du pingouin.
  // On utilisez parseInt pour passer de la chaîne "123px" au nombre 123.
  let top=parseInt(pingouin.style.top);
  if(event.code ==="ArrowUp"  ){top-=30;}
  if(event.code ==="ArrowDown"){top+=30;}
  // Éviter que le pingouin ne sorte de l'eau
  if(top<0     ){top=0;}
  if(top>450-60){top=450-60;}
  // Mettre à jour la position
  pingouin.style.top=top+'px';
});

// On crée un poisson à intervalles réguliers. C'est à dire tous les ? millisecondes.
window.setInterval(function(){
  console.log('Création poisson');
  // Création d'une image. Elle n'est pas encore dans l'arbre DOM.
  const poisson=document.createElement('img');
  poisson.src='poisson.svg';
  poisson.className='poisson';
  // On insère l'image dans l'arbre DOM, dans l'élément eau (c'est que les poissons aiment).
  eau.append(poisson);
  // Position verticale aléatoire. L'eau fait 450 px de haut, et le poisson 18px.
  poisson.style.top=(Math.random()*(450-18))+'px';
  poisson.style.left='840px';
  // Compliqué. On demande au navigateur de prendre en compte la situation actuelle.
  // Ceci va permettre de déclencher l'animation du poisson à la ligne suivante (transition CSS).
  window.getComputedStyle(poisson).top;
  // Ceci ne se fait pas immédiatement. La transition CSS dit que ca se fera en 2 secondes.
  // C'est ce qui crée le défilement du poisson.
  poisson.style.left='-40px';
  // On sait que le poisson atteindra la gauche de l'écran dans 2 secondes. 
  // On utilise setTimeout pour exécuter la fonction dans 2000 millisecondes (2 secondes).  
  window.setTimeout(function(){
    // On fait disparaître le poisson en l'enlevant de l'arbre DOM.
    poisson.remove();
  },2000);
  // On sait que le poisson atteindra le bec du pingouin dans 1650 millisecondes. 
  window.setTimeout(function(){
    // Voir si le pingouin touche le poisson.
    const rectPingouin=pingouin.getBoundingClientRect();
    const rectPoisson =poisson.getBoundingClientRect();
    // Si oui, on augmente le score.
    if(rectPingouin.bottom>rectPoisson.top && rectPingouin.top<rectPoisson.bottom)
    {
      score++;
      document.getElementById('score').textContent=score;
      // On fait disparaître le poisson en l'enlevant de l'arbre DOM.
      poisson.remove();
    }
  },1650);
},500);


// On crée un phoque à intervalles réguliers.
window.setInterval(function(){
  console.log('Création phoque');
  const phoque=document.createElement('img');
  phoque.src='phoque.svg';
  phoque.className='phoque';
  eau.append(phoque);
  // Position verticale aléatoire. L'eau fait 450 px de haut, et le phoque 117px.
  phoque.style.top=(Math.random()*(450-117))+'px';
  phoque.style.left='920px';
  // Compliqué. On demande au navigateur de prendre en compte la situation actuelle.
  // Ceci va permettre de déclencher l'animation du phoque à la ligne suivante (transition CSS).
  window.getComputedStyle(phoque).top;
  // Ceci ne se fait pas immédiatement. La transition CSS dit que ca se fera en 2 secondes.
  // C'est ce qui crée le défilement du phoque.
  phoque.style.left='-120px';
  // On sait que le phoque atteindra la gauche de l'écran dans 2 secondes. 
  // On utilise setTimeout pour exécuter la fonction dans 2000 millisecondes (2 secondes).  
  window.setTimeout(function(){
    // On fait disparaître le phoque en l'enlevant de l'arbre DOM.
    phoque.remove();
  },2000);
  // On sait que le phoque atteindra le bec du pingouin dans 1625 millisecondes. 
  window.setTimeout(function(){
    // Voir si le pingouin touche le phoque.
    const rectPingouin=pingouin.getBoundingClientRect();
    const rectPhoque =phoque.getBoundingClientRect();
    // Si oui, on perd
    if(rectPingouin.bottom>rectPhoque.top && rectPingouin.top<rectPhoque.bottom)
    {
      alert('Mangé par le phoque!');
    }
  },1625);
},4000);