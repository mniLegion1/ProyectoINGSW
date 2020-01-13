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
            this.cor_elec = datos.cor_elec;
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

export interface Pariente{    
    antec_enferm:string
    apellidos:string
    dig_verif:string
    fec_nac_pariente:Date
    id_paciente:number
    id_parentezco:string
    nombres:string
    peso_pariente:number
    rut_pariente:number
    talla_pariente:number
    sexo:string
    vivo_pariente:boolean
}

export class Pariente{
    antec_enferm:string
    apellidos:string 
    fec_nac_pariente:Date
    id_paciente:number
    id_parentezco:string
    nombres:string
    peso_pariente:number
    sexo:string
    talla_pariente:number
    vivo_pariente:boolean

    constructor(datos?:Pariente){
        if(datos != null){
            this.antec_enferm = datos.antec_enferm
            this.apellidos = datos.apellidos
            this.fec_nac_pariente = datos.fec_nac_pariente
            this.id_paciente = datos.id_paciente
            this.id_parentezco = datos.id_parentezco
            this.nombres = datos.nombres
            this.peso_pariente = datos.peso_pariente
            this.sexo = datos.sexo
            this.talla_pariente = datos.talla_pariente
            this.vivo_pariente = datos.vivo_pariente
        }   
    }
}

export interface Exlab{
    idEX_LAB:number
    fecha_exam:Date
    Hb:number
    T3:number
    CT:number
    PT:number
    Hto:number
    T4:number
    T:number
    ALB:number
    GR:number
    TSH:number
    HDL:number
    SG:number
    GB:number
    Fe:number
    LDL:number
    creatinina:number
    EOS:number
    insulina:number
    uremia:number
    VHS:number
    glicemia:number
    orina:string
    parasito:string
    otros_exam:string
    radiografia:string
    id_control:number
}

export class Exlab{
    idEX_LAB:number
    fecha_exam:Date
    Hb:number
    T3:number
    CT:number
    PT:number
    Hto:number
    T4:number
    T:number
    ALB:number
    GR:number
    TSH:number
    HDL:number
    SG:number
    GB:number
    Fe:number
    LDL:number
    creatinina:number
    EOS:number
    insulina:number
    uremia:number
    VHS:number
    glicemia:number
    orina:string
    parasito:string
    otros_exam:string
    radiografia:string
    id_control:number

    constructor(datos?:Exlab){
        if(datos != null){
            this.idEX_LAB = datos.idEX_LAB
            this.fecha_exam = datos.fecha_exam
            this.Hb = datos.Hb
            this.T3 = datos.T3
            this.CT = datos.CT
            this.PT = datos.PT
            this.Hto = datos.Hto
            this.T4 = datos.T4
            this.T = datos.T
            this.ALB = datos.ALB
            this.GR = datos.GR
            this.TSH = datos.TSH
            this.HDL = datos.HDL
            this.SG = datos.SG
            this.GB = datos.GB
            this.Fe = datos.Fe
            this.LDL = datos.LDL
            this.creatinina = datos.creatinina
            this.EOS = datos.EOS
            this.insulina = datos.insulina
            this.uremia = datos.uremia
            this.VHS = datos.VHS
            this.glicemia = datos.glicemia
            this.orina = datos.orina
            this.parasito = datos.parasito
            this.otros_exam = datos.otros_exam
            this.radiografia = datos.radiografia
            this.id_control = datos.id_control
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
        if(datos != null){
            this.id_sexo = datos.id_sexo
            this.desc_sexo = datos.desc_sexo
        }
    }
}

export interface Parentezco{
    idTIPO_PARENTEZCO:number
    desc_parentezco:string
}

export class Parentezco{
    idTIPO_PARENTEZCO:number
    desc_parentezco:string

    constructor(datos?:Parentezco){
        if(datos != null){
            this.idTIPO_PARENTEZCO = datos.idTIPO_PARENTEZCO
            this.desc_parentezco = datos.desc_parentezco
        }
    }
}