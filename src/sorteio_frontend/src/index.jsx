import { useState } from 'react';
import {AuthClient} from "@dfinity/auth-client"

function index() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Utilizado para apresentar os botão Login e Logout

  async function login() {

      // Criar o authClient
      let authClient = await AuthClient.create();

      // Inicia o processo de login e aguarda até que ele termine
      await authClient.login({
        // Redireciona para o provedor de identidade da ICP (Internet Identity)
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: async () => {   
          // Caso entrar neste bloco significa que a autenticação ocorreu com sucesso!
          const identity = authClient.getIdentity();
          setIsLoggedIn(true);
          window.location.href = "/sorteio/";
          
          
        },
        
        windowOpenerFeatures: `
                                left=${window.screen.width / 2 - 525 / 2},
                                top=${window.screen.height / 2 - 705 / 2},
                                toolbar=0,location=0,menubar=0,width=525,height=705
                              `,
      })
      
      return false;
      
  };

  async function logout() {
      const authClient = await AuthClient.create();        
      await authClient.logout();     
      document.getElementById("principalText").innerText = "";
      setIsLoggedIn(false);
  };  

  document.addEventListener("DOMContentLoaded", function() {    
     document.getElementById("logout").style.display = "none";
  });
  
  
  return (           

    <section class="">
        <div class="">
            <h1 class="">ROLL</h1>
            
            <div class="centralizar">
            {!isLoggedIn && (
                <button
                    onClick={login}
                    class="but">
                    CONECTAR
                    </button>
                )}    
            </div>
            
        </div>
    </section>

  );
}


export default index;