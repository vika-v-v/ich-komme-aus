var country_rule = {
    "Polen":"aus",
    "Ukraine":"aus der",
    "USA":"aus den",
    "Deutschland":"aus",
    "Afghanistan":"aus",
    "Ägypten":"aus",
    "Albanien":"aus",
    "Argentinien":"aus",
    "Bahamas":"aus den",
    "Belgien":"aus",
    "Bulgarien":"aus",
    "China":"aus",
    "Dänemark":"aus",
    "Dominikanische Republik":"aus der",
    "England":"aus",
    "Estland":"aus",
    "Finnland":"aus",
    "Frankreich":"aus",
    "Georgien":"aus",
    "Griechenland":"aus",
    "Grönland":"aus",
    "Großbritannien":"aus",
    "Holland":"aus",
    "Niederlanden":"aus den",
    "Indien":"aus",
    "Irak":"aus dem",
    "Iran":"aus dem",
    "Ireland":"aus",
    "Island":"aus",
    "Israel":"aus",
    "Italien":"aus",
    "Japan":"aus",
    "Jemen":"aus dem",
    "Kanada":"aus",
    "Komoren":"aus den",
    "Kongo":"aus dem",
    "Kosovo":"aus dem",
    "Kroatien":"aus",
    "Lettland":"aus",
    "Libanon":"aus dem",
    "Liechtenstein":"aus",
    "Litauen":"aus",
    "Malediven":"aus den",
    "Moldau":"aus",
    "Mongolei":"aus der",
    "Neuseeland":"aus",
    "Niger":"aus dem",
    "Nordkorea":"aus",
    "Norwegen":"aus",
    "Oman":"aus dem",
    "Österreich":"aus",
    "Philippinen":"aus den",
    "Portugal":"aus",
    "Rumänien":"aus",
    "Schottland":"aus",
    "Schweden":"aus",
    "Schweiz":"aus der",
    "Senegal":"aus dem",
    "Slowakei":"aus der",
    "Sudan":"aus dem",
    "Thailand":"aus",
    "Tschad":"aus dem",
    "Tschechien":"aus",
    "Türkei":"aus der",
    "Ungarn":"aus",
    "Belarus":"aus"
};

var ans;
var points = 0;
var all_count = 0;
var randomCountry;
var started = false;

window.onload = Start;

// !ask mailing details
var ask_for_mail = false;
var mail;
var student;
var sex;
var mailing_interwal = [1, 50, 100, 200, 500, 1000, 2000, 10000];

function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        }
        else {
          error(xhr);
        }
      }
    };
    xhr.open('GET', path, true);
    xhr.send();
  }

function Read_json_image()
{
    //alert("work");
    loadJSON("https://serpapi.com/search.json?q=Apple&tbm=isch&ijn=0&api_key=e16c798495735f7211af4c1ac46ba36d81f9b2450d12c0feee7e03b0c8daed3c",Work_json,'jsonp');
    
}

function Work_json(Data)
{
    alert("working");
    //alert(Data.images_results[0].position);
}

// get random key from dictionary
function Get_random_value()
{
    var countryArray  = Object.keys(country_rule);
    var randomNumber = Math.random();
    var countryIndex  = Math.floor(randomNumber * countryArray.length);
    var randomKey    = countryArray[countryIndex];
    // This will course this will return the value of the randomKey

    return randomKey;
}

// assign text to element with id
function Set_id_to_txt(id, txt)
{
    var element = document.getElementById(id);
    element.textContent = txt;
}

// set display of element to block (true) or none (false)
function Set_id_visible(id, vis)
{
    var el = document.getElementById(id);

    if(vis)
        el.style.display = "block";
    else
        el.style.display = "none";
}

// create a queation
function Start()
{
    if(!started) { // at the beginning of the work
        Set_id_visible("right_wrong", false);
        Set_id_visible("table", false);

        // ask info for mail
        if(ask_for_mail) {
            student = prompt('Как тебя зовут?', 'Моё имя');
            sex = prompt('Какой твой пол? (м, ж)', 'м');
            mail = prompt('Какой email у твоего преподавателя?', 'vika.vovchenkoo@gmail.com');
        }

        started = true;
    }
    // hide panel with answer
    Set_id_visible("dublicate", false);
    Set_id_visible("training", true);
    
    // set country and ans
    randomCountry = Get_random_value();
    ans = country_rule[randomCountry];

    // set question
    Set_id_to_txt("ich-komme-txt", "Ich komme ... " + randomCountry);
    Read_json_image();
}

// send email to teacher
function Send_email()
{
    if(sex == "м")
        window.open('mailto:' + mail + '?subject=Результаты%20ученика%20' + student + '&body=Ваш%20ученик%20' + student + '%20набрал%20' + points + '/' + all_count + '%20в%20тренажёре%20Ich%20komme%20aus');
    else
        window.open('mailto:' + mail + '?subject=Результаты%20ученицы%20' + student + '&body=Ваша%20ученица%20' + student + '%20набрала%20' + points + '/' + all_count + '%20в%20тренажёре%20Ich%20komme%20aus');
    
}

// one of the button answers clicked
function Smth_cliked(clicked)   
{
    // add point to "all answers"
    all_count++;

    // set answer at answer panel
    Set_id_to_txt("ich-komme-txt-ans", "Ich komme " + ans + " " + randomCountry);

    if(clicked == ans) { // if correct

        // add point
        points++;

        // send letter to teacher if enaugh points
        if(ask_for_mail) {
            mailing_interwal.forEach(element => {
                if(element == points)
                    Send_email(); });
        }

        Set_id_to_txt("result", "Richtig - верно!");
        
        // show panel with answer
        Set_id_visible("right_wrong", true);

        // style to be green
        document.getElementById("right_wrong").className = "right";
        
        Start();

    } else { // if wrong
        
        // show table
        Set_id_visible("table", true);

        // hide question
        Set_id_visible("training", false);
        
        // user has to type anwer manually
        Set_id_visible("dublicate", true);

        // show panel with answer
        Set_id_visible("right_wrong", true);

        Set_id_to_txt("result", "Falsch - неверно");
        
        // style to be red
        document.getElementById("right_wrong").className = "wrong";

        // check wether country is already on the list
        var found = false;
        var table = document.getElementById("table");
        for(var i = 0; i < table.children.length; i++) {
            
            // get child of table - tr, and child of tr - td or th
            var item = table.children[i].childNodes[1];
            if(item.innerText == randomCountry) {
                found = true;
                // set class to make it red in css
                table.children[i].className = "once_again";
                break;
            }
        }

        // if not found, add to the table
        if(!found) {
            
            // create country, answer and table row elements
            var new_country = document.createElement("td");
            var new_ans = document.createElement("td");
            var new_row = document.createElement("tr");

            // assign text
            new_country.textContent = randomCountry;
            new_ans.textContent = ans;
        
            // append answer and country to the row
            new_row.appendChild(new_ans);
            new_row.appendChild(new_country);
            
            // append row to the table
            table.appendChild(new_row);
            
        }
    }

    Set_id_to_txt("punkte", "Punkte: " + points + "/" + all_count);
}

// text in text typing window changed
function Answer_typed(val)
{
 
    // if typed correctly
    if(val == 'Ich komme ' + ans + ' ' + randomCountry)
    {
        // hide panel with answer
        Set_id_visible("right_wrong", false);
        // next question
        Start();
    }
}



