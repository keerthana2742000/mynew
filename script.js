const myform = document.getElementById("enter");

myform.addEventListener("click", (e) => {
  e.preventDefault();

  let uname = document.getElementById("username");
  let pass = document.getElementById("password");

  let u = uname.value;
  let p = pass.value;
  if (!u || !p) {
    alert("Cannot be empty");
    return false;
  }

  validateUserLogin(u, p);
});

const gitHubForm = document.getElementById("gitHubForm");

gitHubForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let usernameInput = document.getElementById("usernameInput");

  let gitHubUsername = usernameInput.value;

  requestUserRepos(gitHubUsername);
});
function validateUserLogin(u,p)
{

    console.log("function loaded");

   /* fetch('/data/users.json')
    .then(response => response.json())
  .then(data => console.log(data));*/
    

  const url = 'users.json';
  const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, true);
    xmlhttp.onload = function() {

        // Parse API data into JSON
        const data = JSON.parse(this.response);
        console.log(data);
        
        //console.log(data[1].username);
        //console.log(data[1].password);
        console.log("huuuuuuuuuuu");
        console.log(u);
        console.log(p);
let i,flag=0;
    
  for(i=0;i<4;i++)
 {
  
 if((u==data[i].username)&&(p==data[i].password))
    {
        flag=1;
        break;
    }
    

}
if(flag===1)
    {
        console.log("success");
        document.getElementById("sec1").style.display="none";
        document.getElementById("sec2").style.display="block";


    }
    else
    {
        alert("enter correct username and password");
    }

};
    
    xmlhttp.send();
    }


function requestUserRepos(username) {
  const xhr = new XMLHttpRequest();

  const url = `https://api.github.com/users/${username}/repos`;

  xhr.open("GET", url, true);

  xhr.onload = function () {
    const data = JSON.parse(this.response);
    let root = document.getElementById("userRepos");
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    if (data.message === "Not Found") {
      let ul = document.getElementById("userRepos");

      let li = document.createElement("li");

      li.classList.add("list-group-item");

      li.innerHTML = `
                <p><strong>No account exists with username:</strong> ${username}</p>`;

      ul.appendChild(li);
    } else {
      let ul = document.getElementById("userRepos");
      let p = document.createElement("p");
      p.innerHTML = `<p><strong>Number of Public Repos:${data.length}</p>`;
      ul.appendChild(p);

      for (let i in data) {
        let li = document.createElement("li");

        li.classList.add("list-group-item");

        li.innerHTML = `
                <p><strong>Repo:</strong> ${data[i].name}</p>
                <p><strong>Description:</strong> ${data[i].description}</p>
                <p><strong>URL:</strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            `;

        ul.appendChild(li);
      }
    }
  };

  xhr.send();
}
