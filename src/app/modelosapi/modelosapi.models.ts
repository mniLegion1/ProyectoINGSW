import { DatetimeOptions } from '@ionic/core'
import { Timestamp } from 'rxjs/internal/operators/timestamp'
import { __exportStar } from 'tslib';

export class User{
    email:string;
    password:string;
}


export class Paciente{
    rut:number
    nombres:string
    apellidos:string
    direccion:string
    cor_elec:string
    comuna:string
    fono:string
    sexo:boolean
    edad_menarq:number
    fec_menarq:Date
    actividad:string
    deporte:string
    fec_ingreso:Date
    tiem_lib:string
    rendim:Float32Array
    prof_futuro:string
    
}

export interface grupofamiliar{
    
}

export class datosvidrios{
    cantKg: number
    dia: string
    fecha: Date
    constructor(datos?: datosvidrios){
        if(datos != null ){
            this.cantKg=datos.cantKg
            this.dia=datos.dia
            this.fecha=datos.fecha
            return
        }
            this.cantKg=this.cantKg
            this.dia=this.dia
            this.fecha=this.fecha
            return
    }
}

export class deposito_metales{
    kilos: number
    dia: string
    fecha_ingreso: Date
    constructor(datos?: deposito_metales){
        if(datos != null ){
            this.kilos=datos.kilos
            this.dia=datos.dia
            this.fecha_ingreso=datos.fecha_ingreso
            return
        }
            this.kilos=this.kilos
            this.dia=this.dia
            this.fecha_ingreso=this.fecha_ingreso
            return
    }
}