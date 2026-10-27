const ids=['login','shiva','birthday','special','memories','video','little','letter','motivation','final'];
let current=0;
const blessings=['May Shiva give you peace and courage. 🔱','May your days be full of joy. 🧡','Your kindness is your strength. 🌸','Every memory is a little treasure. ✨','Keep creating beautiful memories. 🌼','Keep believing in your dreams. 🔱','You deserve happiness and success. 🧡','You are stronger than you think. 🌻','May Lord Shiva guide your journey. 🔱'];
function goTo(i) {
  if(i<0||i>=ids.length)return;
  current=i;
  document.querySelectorAll('.page').forEach((p,n)=>p.classList.toggle('active',n===i));
  document.getElementById('top').hidden=i===0;
  document.getElementById('nav').hidden=i===0;
  document.getElementById('blessing').hidden=i===0;
  document.getElementById('progress').textContent=`${i+1} / ${ids.length}`;
  document.getElementById('back').style.visibility=i===1?'hidden':'visible';
  document.getElementById('forward').textContent=i===ids.length-1?'Celebrate 🎉':'Next →';
  document.getElementById('blessingText').textContent=blessings[(i-1)%blessings.length];
  window.scrollTo(0,0);
  if(i===ids.length-1)celebrate()
}
function next() {
  if(current===ids.length-1)celebrate();
  else goTo(current+1)
}
function prev() {
  goTo(current-1)
}
document.getElementById('loginForm').addEventListener('submit',e=> {
  e.preventDefault();
  const name=document.getElementById('username').value.trim().replace(/\s+/g,' ').toUpperCase();
  const pass=document.getElementById('password').value.trim().replace(/\s+/g,' ').toLowerCase();
  if(name==='REP AKKA'&&pass==='thava ila ma pesatha') {
    document.getElementById('error').textContent='';
    startBirthdayMusic();
    goTo(1);
  }
  else document.getElementById('error').textContent='Please check the username or password 🧡'
});
function startBirthdayMusic() {
  const music = document.getElementById('music');
  const button = document.getElementById('musicBtn');
  music.volume = 0.65;
  music.play().then(() => {
    button.textContent = '⏸ Pause Birthday Music';
  }).catch(() => {
    button.textContent = '♫ Tap to Play Birthday Music';
  });
}
function toggleMusic() {
  const music = document.getElementById('music');
  const button = document.getElementById('musicBtn');
  if (music.paused) {
    music.play().then(() => {
      button.textContent = '⏸ Pause Birthday Music';
    }).catch(() => {
      button.textContent = '♫ Tap to Play Birthday Music';
    });
  } else {
    music.pause();
    button.textContent = '♫ Play Birthday Music';
  }
}
function openLetter() {
  document.getElementById('letterBody').hidden=false;
  document.getElementById('envelope').textContent='💌 Letter Opened'
}
function photoMissing(img) {
  const p=document.createElement('div');
  p.className='placeholder';
  p.textContent='📸 Add '+img.getAttribute('src');
  img.replaceWith(p)
}
function celebrate() {
  for(let i=0;
  i<45;
  i++) {
    const e=document.createElement('span');
    e.className='petal';
    e.textContent=['🌸','🧡','✨','🌼','🎉'][i%5];
    e.style.left=Math.random()*100+'vw';
    e.style.fontSize=(12+Math.random()*17)+'px';
    e.style.animationDuration=(3+Math.random()*4)+'s';
    e.style.animationDelay=(Math.random()*1.5)+'s';
    document.getElementById('petals').append(e);
    setTimeout(()=>e.remove(),8500)
  }
}


// Celebration only: original text, images, login and music are unchanged.
function birthdayFireworks() {
  const layer = document.getElementById('fireworks');
  if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#ff9c32','#ffd35c','#ff76ad','#75cce8','#a78bfa','#ffffff'];
  function burst(x,y) {
    const group=document.createElement('div');
    group.className='firework-burst';
    group.style.left=x+'%'; group.style.top=y+'%';
    for(let j=0;j<20;j++){
      const dot=document.createElement('span'); dot.className='firework-spark';
      const angle=(Math.PI*2*j)/20; const distance=55+Math.random()*75;
      dot.style.setProperty('--dx',Math.cos(angle)*distance+'px');
      dot.style.setProperty('--dy',Math.sin(angle)*distance+'px');
      dot.style.setProperty('--spark-color',colors[j%colors.length]);
      dot.style.setProperty('--delay',Math.random()*100+'ms');
      group.appendChild(dot);
    }
    layer.appendChild(group); setTimeout(()=>group.remove(),1500);
  }
  [0,300,650,1000,1400,1800].forEach((delay,i)=>setTimeout(()=>burst(18+(i*19)%67,16+(i*13)%43),delay));
  for(let i=0;i<65;i++){
    const piece=document.createElement('span'); piece.className='celebration-confetti';
    piece.style.left=Math.random()*100+'%';
    piece.style.setProperty('--confetti-color',colors[i%colors.length]);
    piece.style.setProperty('--drift',(Math.random()*160-80)+'px');
    piece.style.setProperty('--fall-time',(2.6+Math.random()*2)+'s');
    piece.style.animationDelay=Math.random()*0.8+'s';
    layer.appendChild(piece); setTimeout(()=>piece.remove(),5500);
  }
}
// Run only after a successful login (the Shiva page is page index 1).
const originalGoTo = goTo;
goTo = function(index) {
  originalGoTo(index);
  if (index === 1 || index === 2) birthdayFireworks();
};

// Pause background music while the memory video plays.
(() => {
  const video = document.querySelector('#video video');
  const music = document.getElementById('music');
  if (!video || !music) return;
  let resumeMusic = false;
  video.addEventListener('play', () => {
    resumeMusic = !music.paused;
    if (resumeMusic) music.pause();
  });
  function restoreMusic() {
    if (resumeMusic) {
      music.play().catch(() => {});
      resumeMusic = false;
    }
  }
  video.addEventListener('pause', restoreMusic);
  video.addEventListener('ended', restoreMusic);
})();

// Fetch and prepare birthday music while the login page is visible.
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("music");
  if (audio) { audio.preload = "auto"; audio.load(); }
});
