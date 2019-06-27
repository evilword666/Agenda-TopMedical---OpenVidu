import { Component, OnInit, Inject } from '@angular/core';
import {Http, Headers } from '@angular/http';
import { AlertController,NavParams,ModalController,LoadingController,Platform,NavController} from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

//import { DatePicker } from '@onic-native/date-picker/ngx';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  data:any = {};
  fecha_consulta: String;
  hora_inicio:String;
  hora_fin:String;
  detalles_cita:any;
  tipo_servicio:any;
  link_token:any;
  checkRango:any;

  booking_id:any;
  edad_paciente:any;
  Sexo:any;
  padecimiento:any;
  nombre_completo_paciente:any;

  //constructor() { }
  constructor(private http:Http, public alertController: AlertController, /*private datePicker: DatePicker,*/public plt: Platform, private iab: InAppBrowser, public navCtrl: NavController, /*@Inject(NavParams) private navParams: NavParams*/) {

    this.http = http;  
    this.data.hora_inicio = '';
    this.data.hora_fin = '';    
    this.data.detalles_cita = '';    
    this.data.tipo_servicio = '';  
    this.data.link_token_original = ''; 
    this.data.link_token = '';   
    this.data.fecha_consulta = '';
    this.data.checkRango = '';

    this.data.booking_id='';
    this.data.edad_paciente='';;
    this.data.Sexo='';;
    this.data.padecimiento='';;
    this.data.nombre_completo_paciente='';

  }

  ngOnInit() {
/*
    const data = this.navParams.get('data');   
    

    //alert("En el modal: "+JSON.stringify(data))
    //console.log("En el modal: "+JSON.stringify(data))
    this.data.fecha_consulta = data.fecha_consulta;
    this.data.hora_inicio = data.hora;
    this.data.hora_fin  = data.horb;
    this.data.detalles_cita = data.descripcion;
    this.data.tipo_servicio = data.tipo_servicio;
    this.data.link_token = "https://topmeddr.com:3005/"+data.link_token+"/d";
    this.data.link_token_original = data.link_token;  

    this.data.booking_id=data.booking_id;
    this.data.edad_paciente=data.edad_paciente;
    this.data.Sexo=data.Sexo;
    this.data.padecimiento=data.padecimiento;
    this.data.nombre_completo_paciente=data.nombre_completo_paciente;
    //this.checkRango = this.verificarRangoDeFechasPorCita(this.data.fecha_consulta,this.data.hora_inicio,this.data.hora_fin)
    //alert(this.checkRango)

    */
  }

  

}
