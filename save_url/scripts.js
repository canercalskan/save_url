const inputButton = document.getElementById('input-btn');
const clearButton = document.getElementById('clear-btn');
const inputText = document.getElementById('input-el');
const saveURLButton = document.getElementById('save-url');
const ulEl = document.getElementById('ul-el');
var savedInputs = [];
var descriptions = [];
var dates = [];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let leadsFromLocalStorage = JSON.parse(localStorage.getItem('leads')); //localstorage daki tüm stringi parse ile arraye çevirip yerel değişkene atıyoruz.
let descriptionsFromLocalStorage = JSON.parse(localStorage.getItem('descriptions'));
let datesFromLocalStorage = JSON.parse(localStorage.getItem('dates'));
if(leadsFromLocalStorage) {
    savedInputs = leadsFromLocalStorage;
    descriptions = descriptionsFromLocalStorage;
    dates = datesFromLocalStorage;
    renderLeads();
}

function renderLeads() {
    let listItems = '';

    for (let i = 0; i < savedInputs.length; i++) {
         if(savedInputs[i] != null) {
             listItems += '<li><a href="' + savedInputs[i] + '" target="_blank">' + savedInputs[i] + '</a>' ;           
            }
        if(dates[i] != null) {
            listItems += '<span class="text-warning ms-3 lowtext">' + dates[i] +'</span> ';
        }
         if(descriptions[i]) {
            listItems += '<br> <img src="comment-dots-regular.svg"> ' + '<p class=" d-inline-block lowtext text-info">' + descriptions[i]+ '</p>' +  '</li>';; 
         }
     }
    ulEl.innerHTML = listItems;
}

clearButton.addEventListener('click' , function() {
    savedInputs = [];
    descriptions = [];
    dates = [];
    // ulEl.textContent = null;
    localStorage.clear();
    renderLeads(); // does the same thing with ulEl.textContent = null.
})

saveURLButton.addEventListener('click' , function() {
    var date = new Date();
    let month = months[date.getMonth()];
    let day = days[date.getDay()];
    var minute = date.getMinutes();
    this.ide = 1 ;
    if(minute < 10) {
        minute = '0' + minute;
    }
    var currentdate = day  + ' ' +date.getHours() + ':' + minute;
    chrome.tabs.query({active:true ,currentWindow : true }, function(tabs) {
        savedInputs.push(tabs[0].url);
        dates.push(currentdate);
        descriptions.push(inputText.value);
        localStorage.setItem('leads' , JSON.stringify(savedInputs));
        localStorage.setItem('descriptions' , JSON.stringify(descriptions));
        localStorage.setItem('dates' , JSON.stringify(dates));
        inputText.value = '';
        renderLeads();
    })
})



// inputButton.addEventListener('click' , function(event) {
//     savedInputs.push(inputText.value.toLowerCase());
//     inputText.value = '';
//     localStorage.setItem('leads' , JSON.stringify(savedInputs)); // tüm savedinputs arrayini stringe çevirip localstorage e depoluyoruz.
//     renderLeads(); 
// });


// ulEl.innerHTML += '<li> '+ savedInputs[i] +  '</li>'; BU METHOD TEHLİKELİDİR. İNNERHTML HACKLENEBİLİR
    // const li = document.createElement('li'); // BU METHOD EN GÜVENLİ METHODLARDAN BİRİSİDİR.
    // li.textContent = savedInputs[i];
    // ulEl.append(li); 



    //bizimhangar.com