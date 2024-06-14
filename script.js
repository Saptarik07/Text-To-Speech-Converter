let voiceList = document.getElementById('voiceList')
let textInput = document.getElementById('textInput')
let ratevalue = document.getElementById('ratevalue')
let rate = document.getElementById('rate')
let pitchValue = document.getElementById('pitchValue')
let pitch = document.getElementById('pitch')
let speakBtn = document.getElementById('speakBtn')

let synth = window.speechSynthesis;

let voices=[];

function getvoiceList(){
    voices = synth.getVoices();
    voices.forEach(voice =>{
        let listItem = document.createElement('Option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang',voice.lang);
        listItem.setAttribute('data-name',voice.name);
        voiceList.appendChild(listItem);
    });
}

if(synth.onvoiceschanged !==undefined){
    synth.onvoiceschanged = getvoiceList;
}

pitch.addEventListener('input', function(){
    pitchValue.textContent = pitch.value;
});

rate.addEventListener('input', function(){
    ratevalue.textContent = rate.value;
});

speakBtn.addEventListener('click', function(){
    let utterance = new SpeechSynthesisUtterance(textInput.value);
    let selectedVoice = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach(voice =>{
        if(voice.name == selectedVoice){
            utterance.voice = voice;
        }
    });
    utterance.rate = rate.value;
    utterance.pitch = pitch.value;
    synth.speak(utterance);
});