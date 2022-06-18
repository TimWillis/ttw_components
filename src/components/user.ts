export default (user) => {
  const get_initials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join(' ');
  };
  const html = /*html*/ `
        <style>
        li{                        
            height: 20px;
            right: 100px;
            padding: 5px 10px;
            cursor: pointer;
            white-space: nowrap;
        }
            ul{                  
                width: fit-content;
                position: relative;
                right: 80px;
                color: black;
                box-shadow: 1px 3px 4px -1px rgba(0, 0, 0, 0.55);
                background: white;
                padding: 5px 10px;
                cursor: pointer;
            }
            #user_dd img{
                height: 100%;
                width: auto;
                margin-right: 5px;  
            }
        </style>
        <div class='layout vertical'>
            <div style='border-radius: 50%; box-shadow: 1px 3px 4px -1px rgba(0, 0, 0, 0.55);   letter-spacing: -1px; background-color: white; width: 35px; cursor: pointer;
                height: 35px; color: black; margin-right: 10px;' 
                class='layout vertical center-center'>
                ${get_initials(user.name)}
            </div>
            <div id='user_dd' class='hidden' style='height: 0; width: 0; overflow: visable; '>
                <ul style='list-style-type: none; margin: 7px 0; '>
                    <li id='user_name' style='font-size: 11px; font-weight: bolder' class="layout vertical center-justified start">
                        ${user.name}
                    </li>
                    <li id='signout' style='font-size: 12px;' class="layout horizontal start-justified center">
                        <img src="/resources/images/logout.png"/>
                        Log Out
                    </li>
                </ul>
            </div>
        </div>
    
    `;

  setTimeout(() => {
    document.getElementById('user').addEventListener('click', (e) => {
      /*show signout and other options, like a dropdown list*/
      const class_list = document.getElementById('user_dd').classList;
      class_list.contains('hidden') ? class_list.remove('hidden') : class_list.add('hidden');
    });
    document.getElementById('signout').addEventListener('click', (e) => {
      /*show signout and other options, like a dropdown list*/
      sessionStorage.setItem('user', '');
      location.reload();
    });
  }, 0);

  return html;
};
