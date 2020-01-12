import { DatetimeOptions } from '@ionic/core'
import { Timestamp } from 'rxjs/internal/operators/timestamp'
import { __exportStar } from 'tslib';

export class User{
    email:string;
    password:string;
}


export interface Paciente{
    actividad:string
    apellidos:string
    comuna:string
    cor_elec:string
    deporte:string
    dig_verif:string
    direccion:string
    edad_menarq:number
    fec_ingreso:Date
    fec_menarq:Date
    fec_nacim:Date
    fono:string
    id_prevision:number
    nombres:string
    prof_futuro:string
    rendimiento:Float32Array
    rut_paciente:number
    sexo:number
    tiempo_libre:string
}

export class Paciente{
    actividad:string
    apellidos:string
    comuna:string
    cor_elec:string
    deporte:string
    dig_verif:string
    direccion:string
    edad_menarq:number
    fec_ingreso:Date
    fec_menarq:Date
    fec_nacim:Date
    fono:string
    id_prevision:number
    nombres:string
    prof_futuro:string
    rendimiento:Float32Array
    rut_paciente:number
    sexo:number
    tiempo_libre:string

    constructor(datos?: Paciente ){
        if(datos != null){
            this.actividad = datos.actividad;
            this.apellidos = datos.apellidos;
            this.comuna = datos.comuna;
            this.cor_elec = datos.actividad;
            this.deporte = datos.deporte;
            this.dig_verif = datos.dig_verif;
            this.direccion = datos.direccion;
            this.edad_menarq = datos.edad_menarq;
            this.fec_ingreso = datos.fec_ingreso;
            this.fec_menarq = datos.fec_menarq;
            this.fec_nacim = datos.fec_nacim;
            this.fono = datos.fono;
            this.id_prevision = datos.id_prevision;
            this.nombres = datos.nombres;
            this.prof_futuro = datos.prof_futuro;
            this.rendimiento = datos.rendimiento;
            this.rut_paciente = datos.rut_paciente;
            this.sexo = datos.sexo;
            this.tiempo_libre = datos.tiempo_libre;
        }
    }
}

export interface Prevision{
    idPREVISION:number
    desc_prevision:string
}
export class Prevision{
    idPREVISION:number
    desc_prevision:string

    constructor(datos?:Prevision){
        if(datos != null){
            this.idPREVISION = datos.idPREVISION
            this.desc_prevision = datos.desc_prevision
        }
    }
}

export interface Sexo{
    id_sexo:number
    desc_sexo:string
}

export class Sexo{
    id_sexo:number
    desc_sexo:string

    constructor(datos?:Sexo){
        this.id_sexo = datos.id_sexo
        this.desc_sexo = datos.desc_sexo
    }
}

/**export class Pariente{
    apellidos:string
    comuna:string
    fec_nac_pariente:Date
    id_paciente:number
    id_parentezco:string
    nombres:string
    peso_pariente:
    rendim:Float32Array
    rut_paciente:number
    sexo:boolean
    tiem_lib:string
}**/

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