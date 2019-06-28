import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID, Input } from '@angular/core';
import { AlertController,NavParams,ModalController,LoadingController,Platform,NavController} from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ModalPage } from '../modal/modal.page';

//import {DatabaseService } from '../database.service';

import {Http, Headers } from '@angular/http';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

/*
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/es-MX';
registerLocaleData(locale);
*/
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @Input() value: any;
  
  loading:any;
  isPainted:boolean = false;
  resp:any;
  band=0;
  data:any = {};
  data2:any = {};
  horarios_medico:any;
  numeroFilas:any;
  eventsCalendar = [];
  contadorCitas = 0;
  bodyNotification:string = "Corriendo en segundo plano";
  isIosDevice:boolean=false;
  fechaActual:any;
    
 
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',    
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(@Inject(LOCALE_ID) private locale: string, private uniqueDeviceID: UniqueDeviceID, public loadingCtrl: LoadingController, public plt: Platform, private localNotifications: LocalNotifications, public nativeAudio: NativeAudio , private backgroundMode: BackgroundMode,public navCtrl: NavController, private http:Http,private alertCtrl: AlertController, /*private database: DatabaseService*/ private modalCtrl:ModalController, /*private navParams: NavParams*/){ 


    this.data.username = '';
    this.data.response = '';    
    this.http = http;  
    this.fechaActual = new Date().toISOString();
    
    if(window.localStorage.getItem("numFilasDBremota") == null){
        window.localStorage.setItem("numFilasDBremota","0")
    }
    
    
    //Precargamos el audio para poder utilizarlo en las notificaciones de una actualizacion de la BD
    this.nativeAudio.preloadSimple('audio1', 'audio/good.mp3').then((msg)=>{
        console.log("message: " + msg);
    }, (error)=>{
        console.log("error: " + error);
    });
  
    this.backgroundMode.setDefaults({
        title: "Agenda TM",
        text: this.bodyNotification,
        icon: 'icon2.png', // this will look for icon.png in platforms/android/res/drawable|mipmap
        color: '65cab6', // hex format like 'F14F4D'
        bigText: true    
    })


    this.uniqueDeviceID.get()
  .then((uuid: any) => {
    console.log("UUID Nuevo: "+uuid)
    localStorage.setItem("UUID_Phone",uuid);


    //this.verificarActualizacionDeDatosRemotosEnBackground() //Verificaremos los datos de la BD remota cada 10 segundos
    //this.insertIdMedicoToken()

    
  })
  .catch((error: any) => {
    console.log("ERROR Nuevo: "+error)
  });

 

  localStorage.setItem("alertDatosConsultadosLanzada","0")
    


  }//Fin del constructor
 
  ngOnInit() {
    //this.closeModal()
    this.resetEvent();


    this.consultarHorariosBDremota2()


    if (this.plt.is('android')) {
      setInterval(() => {
        if(this.backgroundMode.isActive()==false){
            console.log("checarCambiosNotificacionesRecibidas() En el foreground")
            this.checarCambiosNotificacionesRecibidas()
        }
      }, 3000);   
    }


  }
 
/**************************************************************************************************/
/***************************** Funciones default del plugin del calendario ************************/
/**************************************************************************************************/
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  // Change current month/week/day
 next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}
 
back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
 
// Change between month/week/day
changeMode(mode) {
  this.calendar.mode = mode;
}
 
// Focus today
today() {
  this.calendar.currentDate = new Date();
}
 
// Selected date reange and hence title changed
onViewTitleChanged(title) {
  this.viewTitle = title;
}
 
// Calendar event was clicked
async onEventSelected(event) {
  // Use Angular date pipe for conversion
  let start = formatDate(event.startTime, 'medium', this.locale);
  let end = formatDate(event.endTime, 'medium', this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK']
  });
  alert.present();
}
 
// Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected.toISOString());
}

returnLogin(){
  this.navCtrl.navigateForward('/login')
}


/************************ Fin de funciones default del plugin de calendario************************/


/**************************************************************************************************/
/**************** Funciones para funcionamiento correcto de la agenda del medico ******************/
/**************************************************************************************************/



agregarCita(){
  //this.navCtrl.push(CrearCitaPage);  
  this.navCtrl.navigateForward('/home')
}

abrirOpenVidu(){
//  this.navCtrl.push(OpenviduPage);  
  
}


addZero=(i)=>{
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

obtenerFecha(formatoDate){

  let dd = formatoDate.getDate();

  let  mm = formatoDate.getMonth()+1; 
  let yyyy = formatoDate.getFullYear();

  if(dd<10) 
  {
    dd='0'+dd;
  } 

  if(mm<10) 
  {
    mm='0'+mm;
  } 


  let fecha = yyyy+'-'+mm+'-'+dd;
  return fecha;
}

obtenerHora(formatoDate){
  let h = this.addZero(formatoDate.getHours());
  var m = this.addZero(formatoDate.getMinutes());
  var s = this.addZero(formatoDate.getSeconds());
  return h+":"+m+":"+s;
}
async verDetallesCita()
{

  let evento = {
    "fecha_consulta": "28-06-2019", 
    "hora": "08:00:00", 
    "horb": "08:30:00", 
    "descripcion": "Esta es mi cita de prueba", 
    "link_token": "jghavdshvdfhagvdfhagvdshnvf", 
    "tipo_servicio": "Video asistencia",
    "booking_id":"8",
    "edad_paciente":"27",
    "Sexo":"Hombre",
    "padecimiento":"Dolor estomacal severo",
    "nombre_completo_paciente":"Xavi Avelino"
  };

  //const evento = {nombre:"Xavi",edad:"27"}

  const myModal = await this.modalCtrl.create({
   component: ModalPage,
   componentProps: { datos: evento }
 });
 // Get returned data
//const { data } = await modal.onWillDismiss();
//alert("Datos regresados: "+JSON.stringify(data))

  //myModal.onWillDismiss()
  


 return await myModal.present();

 
}

async verDetallesEventoModal(evento){  

  const myModal = await this.modalCtrl.create({
    component: ModalPage,
    componentProps: { datos: evento }
  });

  return await myModal.present();

}




async actualizarAgenda(){

  localStorage.setItem("alertDatosConsultadosLanzada","0")

this.consultarHorariosBDremota2();//Descomentar

//Mensaje de actualizacion con un spinner
  this.loading = await this.loadingCtrl.create({
    message: 'Actualizando las citas de su agenda...',
    spinner: 'crescent',
    //duration: 1000
  });

  this.loading.onDidDismiss(() => {
    console.log('Dismissed loading');
  });

  await this.loading.present();
}

// Schedule a single notification
lanzarNotificacion2(){
this.localNotifications.schedule({  
  title: 'Notificacion demo',  
  text:"Mi texto"
});
}

lanzarNotificacion(){ //Hay un problema al tener notificaciones locales y notificaciones push en ios y android > 6
  console.log("Lanzando notificacion\n"+"Titulo: "+localStorage.getItem("TitleNotification")+"\nTexto: "+localStorage.getItem("MessageNotification"))
    this.localNotifications.schedule({
        title: localStorage.getItem("TitleNotification"),
        text: localStorage.getItem("MessageNotification"),
        //attachments: ['file://img/activado.png'],//Pone una imagen en la notificacion
        sound: 'file://audio/good.mp3', //Solo funciona en iOS
        icon: 'file://img/green_notification.png', // this will look for icon.png in platforms/android/res/drawable|mipmap
        foreground: true
    });
}


verificarActualizacionDeDatosRemotosEnBackground(){
  this.backgroundMode.enable(); //Habilitamos el modo background
  //alert("Mensaje desde funcion en fondo")
  
  var resultadoBoolean = this.backgroundMode.isEnabled(); //Esto nos servira para saber si esta habilitado
  //alert("Esta habilitado BackgroundMode: "+resultadoBoolean)

  //Funcion que se ejecuta cuando se minimiza el app
  this.backgroundMode.on("activate").subscribe(()=>{        
      //alert("Imprimiendo datos de fondo...Esta activo")


   
if(this.plt.is('android')) {
  setInterval(() => {
    if(this.backgroundMode.isActive()==true){
        console.log("checarCambiosNotificacionesRecibidas() En el background")
        this.checarCambiosNotificacionesRecibidas();
    }
  }, 3000); 
}

  }); 
      
}

public playAudio(){
  /*      
      this.backgroundMode.enable();    
      this.backgroundMode.on("activate").subscribe(()=>{
        this.nativeAudio.play("audio1");  
      });
  */    
      this.nativeAudio.play("audio1"),() => console.log('audio1 is done playing');
  
    }


    checarCambiosNotificacionesRecibidas(){  
  
      if(localStorage.getItem("NotificacionRecibida") != null){
        console.log("VaLOR DEL ESTADO DE NOTIFICACIONES: "+localStorage.getItem("NotificacionRecibida"))
        //this.backgroundMode.on("activate").subscribe(()=>{  
          if(localStorage.getItem("NotificacionRecibida") == "1"){
              this.consultarHorariosBDremota2()          
          }
        //})
      }  
    }

  /**************************************************************************************************************/
  /********** Esta se tiene que ejecutar para obtener los datos de la BD en el servidor de expediente ***********/
  /**************************************************************************************************************/          
  consultarHorariosBDremota2(){
/*
  
    console.log("Estado notificacion recibida: "+localStorage.getItem("NotificacionRecibida"))
    //alert("Se haran cambios en la base local por que se detectó una notificacion") 

    var link = 'https://topmedic.com.mx/accessDatabase/wp_DB/service/recibirDatos.php';
    
    var id_medico = JSON.stringify({id_medico: window.localStorage.getItem("id_doctor")});
          
      this.http.post(link, id_medico)
      .subscribe(data => {
          this.data.response = data["_body"]; 

          this.resp = JSON.parse(this.data.response);

          //alert("RespValue: "+this.resp['respValue'])

                if(this.resp['respValue'] == "200" ){
                  this.horarios_medico = JSON.stringify(this.resp['horarios']);
                  this.numeroFilas = JSON.stringify(this.resp['numFilas']);
                  console.log("Resultado consulta: "+JSON.stringify(this.resp))
                  window.localStorage.setItem("numFilasDBActual",this.numeroFilas)
                  //alert("LocalStorageXD: "+window.localStorage.getItem("numFilasDBremota")+" numberFilas:"+this.numeroFilas)
                                
                  //Limpiamos la BD local para poder insertar los nuevos valores de la BD remota
                  //alert("Hay datos nuevos que agregar ")
                  this.isPainted = false;
                  this.eventsCalendar.splice(0,this.eventsCalendar.length) //Vaciar el arreglo que contiene los elementos a pintar en el calendario
                  this.clearTable();       
                  //alert("Estado notificacion: "+localStorage.getItem("NotificacionRecibida"))
                  if(localStorage.getItem("NotificacionRecibida")=="1"){
                    //alert("Ha llegado una notificacion!")
                    this.lanzarNotificacion();
                  }
                  //this.playAudio(); //Esta funcion la utilizabamos antes de usar las notificaciones
                  localStorage.setItem("NotificacionRecibida","0")
              }else if(this.resp['respValue'] == "400" ){
                //this.resp="400"
                this.loading.dismiss();
                if(localStorage.getItem("alertDatosConsultadosLanzada") == "0"){
                  this.clearCalendar()
                  alert("No hay citas disponibles")
                  //this.consultarHorariosBDremota2()
                }
                localStorage.setItem("alertDatosConsultadosLanzada","1")               
              }

      },  error => {
          console.log("Oooops!");
          alert("No se pudieron enviar los datos\nIntentelo mas tarde");
          });
*/
}

/**************************************************************************************************************/
/**************************************************************************************************************/            
/**************************************************************************************************************/            


insertIdMedicoToken(){    

  //var link = 'http://93.104.215.239/ecg_mqtt/DATABASE/insertarAgendaMedicos.php';
  var link = 'https://topmedic.com.mx/accessDatabase/wp_DB/service/recibirDatos.php';
  
  var id_token = JSON.stringify({id_medico: window.localStorage.getItem("id_doctor"), tokenPhoneMedico:localStorage.getItem("phoneToken"),UUID_Phone:localStorage.getItem("UUID_Phone")});
        
  
  //alert("Se enviaran los datos: "+JSON.stringify({id_medico: window.localStorage.getItem("id_doctor"), tokenPhoneMedico:localStorage.getItem("phoneToken")}))

        try {

          this.http.post(link, id_token)                  
          .subscribe(data => {              
    
            this.data2.response = data["_body"]; 

            //alert(JSON.stringify(this.data2.response))
   
            var resp = JSON.parse(this.data2.response);                            
            
                if(resp['response'] == "200"){
                      //alert("Se insertaron correctamente los datos en la bd")
                      console.log("Se insertaron correctamente los datos en la bd")
                }else if(resp['response'] == "100"){
                  //alert("Los datos de este medico ya se habian registraron en la BD")
                  console.log("El token de las notificaciones push se ha actualizado en la BD")
                }else{
                  //alert("No se pudieron insertar los datos :(")
                  console.log("No se pudieron insertar los datos :(")
                }
                
            }, error => {

              alert("No se pudieron enviar los datos\nIntentelo mas tarde");          
            });
    
          } catch (error) {
            alert("Hay un error en el servidor")
          }        
}

/*     
almacenarHorariosEnLocalBD(fecha_consulta: string, hora:string, horb:string, descripcion: string, link_token: string,tipo_servicio:string, booking_id:string, edad_paciente: string, Sexo:string, padecimiento: string,nombre_completo_paciente:string, numCitas:number){
  this.database.almacenarCitasEnBD(fecha_consulta, hora,horb,descripcion, link_token,tipo_servicio,booking_id, edad_paciente, Sexo, padecimiento,nombre_completo_paciente, numCitas).then((data) =>{                
      console.log(JSON.stringify("Numero de datos insertados: "+data))
      
      if(JSON.stringify(data) == numCitas+""){
          //alert("Se agregaron todas las citas de la BD remota a la DB local")
          this.getCitas();
      }

  },(error) => {
      console.log("Error al crear usuario: "+error)
      //alert("xdxdxd: "+error)
      //alert("Error al crear: "+error)
  })
  
}

*/





}