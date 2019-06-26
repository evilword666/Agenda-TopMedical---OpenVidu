import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {Http, Headers } from '@angular/http';
import { HomePage } from '../home/home.page'
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  data:any = {};

  user:String;
  pass:String;
  loading:any;
  passwordType:string='password';
  passwordShowed:boolean=false;
  
  constructor(private navCtrl:NavController, private router: Router, public loadingController: LoadingController, public alertController: AlertController, private http: Http) {       
    this.data.username = '';
    this.data.response = '';    
    this.http = http;
  }
  
ngOnInit(): void {
  this.user = "promedic.romero@gmail.com";
  this.pass = "b44ESjktTOhNba@6&Y";  
}

  async presentLoadingCustom() {
    this.loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
     // duration: 2000
    });
    await this.loading.present();

    //const { role, data } = await this.loading.onDidDismiss();

    //console.log('Loading dismissed!');

  }

/*
  presentLoadingCustom() {
      this.loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box">Iniciando sesión...</div>
        </div>`,
      //duration: 5000
    });
  
    this.loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    this.loading.present();
  }
*/

  mostrarPassword(){
    //alert("Entrando a la funcion")
    if(this.passwordShowed){
      this.passwordShowed = false;
      this.passwordType = 'password';
    }else{
      this.passwordShowed = true;
      this.passwordType = 'text';
  
    }
    
  }

  async errorLogin() {
    this.loading.dismiss()

    const alert = await this.alertController.create({
      header: 'Error en inicio de sesión',
      subHeader: '',
      message: 'Usuario o contraseña incorrectos',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  
  async camposVacios() {
    const alert = await this.alertController.create({
      header: 'Error en inicio de sesión',
      subHeader: '',
      message: 'Ambos campos deben llenarse',
      buttons: ['Aceptar']
    });

    await alert.present();
  }


  exitoLogin(){  
    //alert("Entrando a funcion de exito")
    this.loading.dismiss(); 
//    this.navCtrl.push(HomePage);    
  }


  login(){    
         

    if(this.user != "" && this.pass != "")
    {
      
      //alert("boton presionado!")
//      var link = 'http://93.104.215.239/ecg_mqtt/DATABASE/agendaMedicos.php';
//      var link = 'https://topmedic.com.mx/accessDatabase/AgendaTopMedicos/agendaMedicos.php';     
      var link = 'https://topmedic.com.mx/accessDatabase/wp_DB/service/recibirDatos.php';            
      var credentials = JSON.stringify({username: this.user,password:this.pass});
      //alert(credentials)

      this.presentLoadingCustom();
      
      try {
      

      this.http.post(link, credentials)                  
      .subscribe(data => {
        

        this.data.response = data["_body"]; 

        var resp = JSON.parse(this.data.response);
        console.log(JSON.stringify(resp))
        //alert(JSON.stringify(resp))
        //alert(resp['id'])
        //alert(resp['response'])
        
            if(resp['response'] == "200"){
              window.localStorage.setItem("user", String(this.user));  
              window.localStorage.setItem("pass", String(this.pass));  
              window.localStorage.setItem("id_doctor", String(resp['id']));  
              this.exitoLogin();              
            }else{
              this.errorLogin();               
              //this.exitoLogin();
            }
        }, error => {
          console.log("Oooops!");
          this.loading.dismiss(); 
          alert("No se pudieron enviar los datos\nIntentelo mas tarde");          
        });

      } catch (error) {
        alert("Hay un error en el servidor")
      }

      }else{
        this.camposVacios();
      }
}

  routingIonic4(){
    this.navCtrl.navigateForward('/videoasistencia')
  }

}
