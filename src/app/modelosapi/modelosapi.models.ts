import { DatetimeOptions } from '@ionic/core'
import { Timestamp } from 'rxjs/internal/operators/timestamp'

export interface datosvidrios{
    cantKg: number
    dia: string
    fecha: Date
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