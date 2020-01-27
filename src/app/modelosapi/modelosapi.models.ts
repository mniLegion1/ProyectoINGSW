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
    fec_nac_pariente:Date
    id_paciente:number
    id_parentezco:number
    id_pariente:number
    nombres:string
    peso_pariente:number
    talla_pariente:number
    sexo:string
    vivo_pariente:boolean
}

export class Pariente{
    antec_enferm:string
    apellidos:string 
    fec_nac_pariente:Date
    id_paciente:number
    id_parentezco:number
    id_pariente:number
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
            this.id_pariente = datos.id_pariente
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
    fecha_examen:Date
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
}

export class Exlab{
    idEX_LAB:number
    fecha_examen:Date
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

    constructor(datos?:Exlab){
        if(datos != null){
            this.idEX_LAB = datos.idEX_LAB
            this.fecha_examen = datos.fecha_examen
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

export interface Control{
    evolucion:string
    id_control:number
    fec_control:Date
    edad:number
    MG:number
    MM:number
    MB:number
    GV:number
    agua:number
    imc:number
    peso:number
    talla:number
    var_masa:number
    var_talla:number
    veloc_masa:number
    veloc_talla:number
    peso_acum:number
    vello:number
    mama:number
    genital:number
    test_izq:number
    test_der:number
    id_interconsulta:number
    observaciones:string

}

export class Control{
    evolucion:string
    id_control:number
    fec_control:Date
    edad:number
    MG:number
    MM:number
    MB:number
    GV:number
    agua:number
    imc:number
    peso:number
    talla:number
    var_masa:number
    var_talla:number
    veloc_masa:number
    veloc_talla:number
    peso_acum:number
    vello:number
    mama:number
    genital:number
    test_izq:number
    test_der:number
    id_interconsulta:number
    observaciones:string

    constructor(datos?:Control){
        if(datos != null){
            this.id_control = datos.id_control
            this.fec_control = datos.fec_control
            this.edad = datos.edad
            this.MG = datos.MG
            this.MM = datos.MM
            this.MB = datos.MB
            this.GV = datos.GV
            this.agua = datos.agua
            this.imc = datos.imc
            this.peso = datos.peso
            this.talla = datos.talla
            this.var_masa = datos.var_masa
            this.var_talla = datos.var_talla
            this.veloc_masa = datos.veloc_masa
            this.veloc_talla = datos.veloc_talla
            this.peso_acum = datos.peso_acum
            this.vello = datos.vello
            this.mama = datos.mama
            this.genital = datos.genital
            this.test_izq = datos.test_izq
            this.test_der = datos.test_der
            this.id_interconsulta = datos.id_interconsulta
            this.observaciones = datos.observaciones
            this.evolucion = datos.evolucion
        }
    }
}

export interface Especialidad{
    idESPECIALIDAD:number
    desc_especilidad:number
}

export class Especialidad{
    idESPECIALIDAD:number
    desc_especilidad:number

    constructor(datos?:Especialidad){
        if(datos != null){
            this.idESPECIALIDAD = datos.idESPECIALIDAD
            this.desc_especilidad = datos.desc_especilidad
        }
    }
}

export interface Interconsulta{
    idINTERCONSULTA:number
    id_especialidad:number
    motivo_intercon:string
    fec_intercon:Date
    id_paciente:number
    coment_interconsulta:string
}

export class Interconsulta{
    idINTERCONSULTA:number
    id_especialidad:number
    motivo_intercon:string
    fec_intercon:Date
    id_paciente:number
    coment_interconsulta:string

    constructor(datos?:Interconsulta){
        if(datos != null){
            this.idINTERCONSULTA = datos.idINTERCONSULTA
            this.id_especialidad = datos.id_especialidad
            this.motivo_intercon = datos.motivo_intercon
            this.fec_intercon = datos.fec_intercon
            this.id_paciente = datos.id_paciente
            this.coment_interconsulta = datos.coment_interconsulta
        }
    }
}

export interface Indicacion{
    idINDICACION:number
    desc_indicacion:number
    id_interconsulta:number
}

export class Indicacion{
    idINDICACION:number
    desc_indicacion:number
    id_interconsulta:number

    constructor(datos?:Indicacion){
        if(datos != null){
            this.idINDICACION = datos.idINDICACION
            this.desc_indicacion = datos.desc_indicacion
            this.id_interconsulta = datos.id_interconsulta
        } 
    }
}

export interface Diagnostico{
    idDIAGNOSTICO:number
    desc_diagnostico:number
    id_interconsulta:number
}

export class Diagnostico{
    idDIAGNOSTICO:number
    desc_diagnostico:number
    id_interconsulta:number

    constructor(datos?:Diagnostico){
        if(datos != null){
            this.idDIAGNOSTICO = datos.idDIAGNOSTICO
            this.desc_diagnostico = datos.desc_diagnostico
            this.id_interconsulta = datos.id_interconsulta
        } 
    }
}

export interface Medico{
    idMEDICO:number
    nombres_medico:string
    apellidos_medico:string
}

export class Medico{
    idMEDICO:number
    nombres_medico:string
    apellidos_medico:string

    constructor(datos?:Medico){
        if(datos != null){
            this.idMEDICO = datos.idMEDICO
            this.nombres_medico = datos.nombres_medico
            this.apellidos_medico = datos.apellidos_medico
        }
    }
}