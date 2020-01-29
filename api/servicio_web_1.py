import mysql.connector
import flask
import smtplib
import time
from flask import request, jsonify, Flask, redirect, url_for, render_template
from flask_cors import CORS, cross_origin
from datetime import date, datetime, timedelta
import jsonplus as json


app = flask.Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

#GET Pacientes
@app.route('/pacientes', methods=['GET'])
def getPacientes():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT rut_paciente,dig_verif,nombres,apellidos,direccion,cor_elec,comuna,fono,id_prevision,(DATE_ADD(fec_nacim, INTERVAL 1 DAY))fec_nacim,sexo,edad_menarq,DATE_ADD(fec_menarq, INTERVAL 1 DAY)fec_menarq,actividad,deporte,DATE_ADD(fec_ingreso, INTERVAL 1 DAY)fec_ingreso,tiempo_libre,rendimiento,prof_futuro
                    FROM medicinaingsw.paciente
                    ORDER BY paciente.apellidos"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET Medicos
@app.route('/medicos', methods=['GET'])
def getMedicos():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT * from medicinaingsw.medico
                ORDER BY medicinaingsw.medico.apellidos_medico"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET Parientes(rut_paciente)
@app.route('/parientes/<string:rut>', methods=['GET'])
def getParientes(rut):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT pariente.id_pariente, pariente.nombres, pariente.apellidos, pariente.sexo, pariente.id_parentezco, pariente.peso_pariente, pariente.talla_pariente, pariente.vivo_pariente, pariente.antec_enferm,(DATE_ADD(pariente.fec_nac_pariente, INTERVAL 1 DAY))fec_nac_pariente
                FROM medicinaingsw.pariente JOIN medicinaingsw.paciente
                WHERE paciente.rut_paciente = pariente.id_paciente AND paciente.rut_paciente = """ + rut
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-parientes)"}

#GET Control(idINTERCONSULTA)
@app.route('/control/<string:id_intercon>', methods=['GET'])
def getControl(id_intercon):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT * 
                FROM medicinaingsw.control JOIN medicinaingsw.interconsulta
                WHERE interconsulta.idINTERCONSULTA=control.id_interconsulta AND interconsulta.idINTERCONSULTA = """ + id_intercon
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-parientes)"}

#GET Historial(rut)
@app.route('/historial/<string:rut>', methods=['GET'])
def Historial(rut):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT interconsulta.idINTERCONSULTA,interconsulta.motivo_intercon,
                CONCAT(medico.nombres_medico,' ',medico.apellidos_medico)Medico,especialidad.desc_especialidad,
                (DATE_ADD(interconsulta.fec_intercon, INTERVAL 1 DAY))fec_intercon,interconsulta.coment_interconsulta 
                FROM medicinaingsw.paciente JOIN medicinaingsw.interconsulta JOIN medicinaingsw.especialidad JOIN medicinaingsw.medico 
                WHERE paciente.rut_paciente = interconsulta.id_paciente AND interconsulta.id_especialidad = especialidad.idESPECIALIDAD
                AND interconsulta.id_medico = medico.idMEDICO
                AND paciente.rut_paciente = """ + rut + """ ORDER BY interconsulta.fec_intercon"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-parientes)"}

#GET Interconsulta(rut,id_intercon)
@app.route('/historial/<string:rut>/<string:id_intercon>', methods=['GET'])
def DatosInterconsulta(rut,id_intercon):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT interconsulta.idINTERCONSULTA,interconsulta.motivo_intercon,
                CONCAT(medico.nombres_medico,' ',medico.apellidos_medico)Medico,especialidad.desc_especialidad,
                (DATE_ADD(interconsulta.fec_intercon, INTERVAL 1 DAY))fec_intercon,interconsulta.coment_interconsulta 
                FROM medicinaingsw.paciente JOIN medicinaingsw.interconsulta JOIN medicinaingsw.especialidad JOIN medicinaingsw.medico 
                WHERE paciente.rut_paciente = interconsulta.id_paciente AND interconsulta.id_especialidad = especialidad.idESPECIALIDAD
                AND interconsulta.id_medico = medico.idMEDICO
                AND paciente.rut_paciente = """ + rut + """ AND interconsulta.idINTERCONSULTA = """ + id_intercon + """ ORDER BY interconsulta.fec_intercon"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-parientes)"}

#GET Diagnostico(id_intercon)
@app.route('/historial/diagnostico/<string:id_intercon>', methods=['GET'])
def Diagnostico(id_intercon):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT diagnostico.desc_diagnostico
                FROM medicinaingsw.interconsulta JOIN medicinaingsw.diagnostico
                WHERE interconsulta.idINTERCONSULTA=diagnostico.id_interconsulta
                AND interconsulta.idINTERCONSULTA = """ + id_intercon
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-parientes)"}

#GET Indicacion(id_intercon)
@app.route('/historial/indicacion/<string:id_intercon>', methods=['GET'])
def Indicacion(id_intercon):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT indicacion.desc_indicacion
                FROM medicinaingsw.interconsulta JOIN medicinaingsw.indicacion
                WHERE interconsulta.idINTERCONSULTA=indicacion.id_interconsulta
                AND interconsulta.idINTERCONSULTA = """ + id_intercon
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-parientes)"}

#GET Datos del Paciente
@app.route('/pacientes/<string:rut_paciente>', methods=['GET'])
def getPerfilPaciente(rut_paciente):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT rut_paciente,dig_verif,nombres,apellidos,direccion,cor_elec,comuna,fono,id_prevision,(DATE_ADD(fec_nacim, INTERVAL 1 DAY))fec_nacim,sexo,edad_menarq,DATE_ADD(fec_menarq, INTERVAL 1 DAY)fec_menarq,actividad,deporte,DATE_ADD(fec_ingreso, INTERVAL 1 DAY)fec_ingreso,tiempo_libre,rendimiento,prof_futuro
                    FROM medicinaingsw.paciente
                    WHERE rut_paciente = """ + rut_paciente
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#POST Paciente
@app.route('/pacientes/ingresarpaciente', methods=['POST'])
def postPaciente():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        rut_paciente = data['rut_paciente']
        dig_verif = data['dig_verif']
        nombres = data['nombres']
        apellidos = data['apellidos']
        direccion = data['direccion']
        cor_elec = data['cor_elec']
        comuna = data['comuna']
        fono = data['fono']
        id_prevision = data['id_prevision']
        fec_nacim = data['fec_nacim']
        sexo = data['sexo']
        edad_menarq = data['edad_menarq']
        fec_menarq = data['fec_menarq']
        actividad = data['actividad']
        deporte = data['deporte']
        fec_ingreso = data['fec_ingreso']
        tiempo_libre = data['tiempo_libre']
        rendimiento = data['rendimiento']
        prof_futuro = data['prof_futuro']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = "INSERT INTO medicinaingsw.paciente (rut_paciente, dig_verif, nombres, apellidos, direccion, cor_elec, comuna, fono, id_prevision, fec_nacim, sexo, edad_menarq, fec_menarq, actividad, deporte, fec_ingreso, tiempo_libre, rendimiento, prof_futuro) VALUES (%s,%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            values = (rut_paciente,dig_verif,nombres,apellidos,direccion,cor_elec,comuna,fono,id_prevision,fec_nacim,sexo,edad_menarq,fec_menarq,actividad,deporte,fec_ingreso,tiempo_libre,rendimiento,prof_futuro)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Paciente creado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#POST Control
@app.route('/pacientes/ingresarcontrol', methods=['POST'])
def postControl():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        evolucion = data['evolucion']
        edad = data['edad']
        peso = data['peso']
        var_masa = data['var_masa']
        veloc_masa = data['veloc_masa']
        peso_acum = data['peso_acum']
        talla = data['talla']
        var_talla = data['var_talla']
        veloc_talla = data['veloc_talla']
        vello = data['vello']
        test_izq = data['test_izq']
        MG = data['MG']
        MM = data['MM']
        mama = data['mama']
        test_der = data['test_der']
        MB = data['MB']
        GV = data['GV']
        genital = data['genital']
        agua = data['agua']
        imc = data['imc']
        observaciones = data['observaciones']
        id_interconsulta = data['id_interconsulta']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = "INSERT INTO medicinaingsw.control (evolucion, edad, peso, var_masa, veloc_masa, peso_acum, talla, var_talla, veloc_talla, vello, test_izq, MG, MM, mama, test_der, MB, GV, genital, agua, imc, observaciones, id_interconsulta) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            values = ( evolucion, edad, peso, var_masa, veloc_masa, peso_acum, talla, var_talla, veloc_talla, vello, test_izq, MG, MM, mama, test_der, MB, GV, genital, agua, imc, observaciones, id_interconsulta)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Paciente creado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#POST Pariente
@app.route('/pacientes/ingresarpariente', methods=['POST'])
def postPariente():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        antec_enferm = data['antec_enferm']
        apellidos = data['apellidos']
        fec_nac_pariente = data['fec_nac_pariente']
        id_paciente = data['id_paciente']
        id_parentezco = data['id_parentezco']
        nombres = data['nombres']
        peso_pariente = data['peso_pariente']
        sexo = data['sexo']
        talla_pariente = data['talla_pariente']
        vivo_pariente = data['vivo_pariente']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = "INSERT INTO medicinaingsw.pariente (nombres, apellidos, id_parentezco, peso_pariente, talla_pariente, fec_nac_pariente, sexo, vivo_pariente, antec_enferm, id_paciente) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            values = (nombres, apellidos, id_parentezco, peso_pariente, talla_pariente, fec_nac_pariente, sexo, vivo_pariente, antec_enferm, id_paciente)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Paciente creado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#POST Interconsulta
@app.route('/pacientes/ingresarinterconsulta', methods=['POST'])
def postInterconsulta():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        id_especialidad = data['id_especialidad']
        motivo_intercon = data['motivo_intercon']
        fec_intercon = data['fec_intercon']
        id_paciente = data['id_paciente']
        id_medico = data['id_medico']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = "INSERT INTO medicinaingsw.interconsulta (id_especialidad, motivo_intercon, fec_intercon, id_paciente, id_medico) VALUES (%s, %s, %s, %s, %s)"
            values = (id_especialidad, motivo_intercon, fec_intercon, id_paciente,id_medico)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Paciente creado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#POST Diagnostico
@app.route('/pacientes/ingresardiagnostico', methods=['POST'])
def postDiagnostico():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        desc_diagnostico = data['desc_diagnostico']
        id_interconsulta = data['id_interconsulta']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = "INSERT INTO medicinaingsw.diagnostico (desc_diagnostico, id_interconsulta) VALUES (%s, %s)"
            values = (desc_diagnostico, id_interconsulta)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Diagnostico agregedado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#POST Indicacion
@app.route('/pacientes/ingresarindicacion', methods=['POST'])
def postIndicacion():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        desc_indicacion = data['desc_indicacion']
        id_interconsulta = data['id_interconsulta']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = "INSERT INTO medicinaingsw.indicacion (desc_indicacion, id_interconsulta) VALUES (%s, %s)"
            values = (desc_indicacion, id_interconsulta)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Indicacion agregada"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#POST Examen Laboratorio
@app.route('/pacientes/ingresarexlab', methods=['POST'])
def postExlab():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        Hb = data['Hb']
        T3 = data['T3']
        CT = data['CT']
        PT = data['PT']
        Hto = data['Hto']
        T4 = data['T4']
        T = data['T']
        ALB = data['ALB']
        GR = data['GR']
        TSH = data['TSH']
        HDL = data['HDL']
        SG = data['SG']
        GB = data['GB']
        Fe = data['Fe']
        LDL = data['LDL']
        creatinina = data['creatinina']
        EOS = data['EOS']
        insulina = data['insulina']
        uremia = data['uremia']
        VHS = data['VHS']
        glicemia = data['glicemia']
        orina = data['orina']
        parasito = data['parasito']
        otros_exam = data['otros_exam']
        radiografia = data['radiografia']
        idEX_LAB = data['idEX_LAB']


        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """INSERT INTO medicinaingsw.ex_lab (Hb,T3,CT,PT,Hto,T4,T,ALB,GR,TSH,HDL,SG,GB,Fe,LDL,creatinina,EOS,insulina,uremia,VHS,glicemia,orina,parasito,otros_exam,radiografia,idEX_LAB)
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            values = (Hb,T3,CT,PT,Hto,T4,T,ALB,GR,TSH,HDL,SG,GB,Fe,LDL,creatinina,EOS,insulina,uremia,VHS,glicemia,orina,parasito,otros_exam,radiografia,idEX_LAB)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Paciente creado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#DELETE Paciente
@app.route('/pacientes/eliminarpaciente/<string:rut>', methods=['DELETE'])
def deletePaciente(rut):
    if request.method == 'DELETE':
        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """DELETE FROM medicinaingsw.paciente
                    WHERE paciente.rut_paciente = """ + rut
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query)
            connection.commit()
            connection.close()
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#DELETE Pariente(id_pariente)
@app.route('/pacientes/eliminarpariente/<string:rut>', methods=['DELETE'])
def deletePariente(rut):
    if request.method == 'DELETE':
        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """DELETE FROM medicinaingsw.pariente
                    WHERE pariente.id_pariente = """ + rut
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query)
            connection.commit()
            connection.close()
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#DELETE Control(id_control)
@app.route('/pacientes/eliminarcontrol/<string:rut>', methods=['DELETE'])
def deleteControl(rut):
    if request.method == 'DELETE':
        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """DELETE FROM medicinaingsw.control
                    WHERE control.id_control = """ + rut
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query)
            connection.commit()
            connection.close()
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#DELETE Interconsulta(idINTERCONSULTA)
@app.route('/pacientes/eliminarinterconsulta/<string:id_intercon>', methods=['DELETE'])
def deleteInterconsulta(id_intercon):
    if request.method == 'DELETE':
        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """DELETE FROM medicinaingsw.interconsulta
                    WHERE interconsulta.idINTERCONSULTA = """ + id_intercon
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query)
            connection.commit()
            connection.close()
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#UPDATE Paciente
@app.route('/pacientes/actualizarpaciente/<string:rut>', methods=['PATCH'])
def updatePaciente(rut):
    if request.method == 'PATCH':
        data = request.get_json()
        print(data)
        nombres = data['nombres']
        apellidos = data['apellidos']
        direccion = data['direccion']
        cor_elec = data['cor_elec']
        comuna = data['comuna']
        fono = data['fono']
        id_prevision = data['id_prevision']
        sexo = data['sexo']
        edad_menarq = data['edad_menarq']
        actividad = data['actividad']
        deporte = data['deporte']
        tiempo_libre = data['tiempo_libre']
        rendimiento = data['rendimiento']   
        prof_futuro = data['prof_futuro']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """UPDATE medicinaingsw.paciente
                    SET nombres = %s,apellidos = %s,direccion = %s,cor_elec = %s,comuna = %s,fono = %s,id_prevision = %s,sexo = %s,edad_menarq = %s,actividad = %s,deporte = %s,tiempo_libre = %s,rendimiento = %s,prof_futuro = %s
                    WHERE paciente.rut_paciente  = """ + rut
            values = (nombres,apellidos,direccion,cor_elec,comuna,fono,id_prevision,sexo,edad_menarq,actividad,deporte,tiempo_libre,rendimiento,prof_futuro)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Paciente creado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#UPDATE InterconComent(idINTERCONSULTA)
@app.route('/pacientes/addcommentintercon/<string:id_intercon>', methods=['PATCH'])
def updateInterComent(id_intercon):
    if request.method == 'PATCH':
        data = request.get_json()
        print(data)
        id_paciente = data['id_paciente']
        coment_interconsulta = data['coment_interconsulta']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """UPDATE medicinaingsw.interconsulta
                    SET id_paciente = %s, coment_interconsulta = %s
                    WHERE interconsulta.idINTERCONSULTA = """ + id_intercon
            values = (id_paciente, coment_interconsulta)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Comentario agregado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#UPDATE Pariente
@app.route('/pacientes/actualizarpariente/<string:rut>', methods=['PATCH'])
def updatePariente(rut):
    if request.method == 'PATCH':
        data = request.get_json()
        print(data)
        antec_enferm = data['antec_enferm']
        apellidos = data['apellidos']
        id_parentezco = data['id_parentezco']
        nombres = data['nombres']
        peso_pariente = data['peso_pariente']
        sexo = data['sexo']
        talla_pariente = data['talla_pariente']
        vivo_pariente = data['vivo_pariente']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """UPDATE medicinaingsw.pariente
                    SET antec_enferm = %s, nombres = %s, apellidos = %s, id_parentezco = %s,peso_pariente = %s,sexo = %s,talla_pariente = %s,vivo_pariente = %s
                    WHERE pariente.id_pariente  = """ + rut
            values = (antec_enferm,nombres,apellidos,id_parentezco,peso_pariente,sexo,talla_pariente,vivo_pariente)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Paciente creado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#GET Sexos
@app.route('/sexos', methods=['GET'])
def getSexos():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT * FROM medicinaingsw.sexo"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET Previsiones
@app.route('/previsiones', methods=['GET'])
def getPrevisiones():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT * from medicinaingsw.prevision"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET Parentezcos
@app.route('/parentezcos', methods=['GET'])
def getParentezcos():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT * FROM medicinaingsw.tipo_parentezco"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET Especialidades
@app.route('/especialidades', methods=['GET'])
def getEspecialidades():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT * FROM medicinaingsw.especialidad"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET LastInterconsultaID
@app.route('/lastIntercon', methods=['GET'])
def getLastRowIntercon():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT idINTERCONSULTA
                FROM medicinaingsw.interconsulta
                ORDER BY idINTERCONSULTA DESC LIMIT 1"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET LRControl(id_intercon)
@app.route('/lastControl/<string:id_intercon>', methods=['GET'])
def getLastRowControl(id_intercon):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT control.id_control
                FROM medicinaingsw.control JOIN medicinaingsw.interconsulta
                WHERE interconsulta.idINTERCONSULTA = control.id_interconsulta AND interconsulta.idINTERCONSULTA = """ + id_intercon + """ ORDER BY id_control DESC LIMIT 1"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET LastInterconsulta
@app.route('/lastInterconsulta/<string:rut_pac>/<string:id_intercon>', methods=['GET'])
def getLastIntercon(rut_pac,id_intercon):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT idINTERCONSULTA,id_especialidad,motivo_intercon,(DATE_ADD(fec_intercon, INTERVAL 1 DAY))fec_intercon,id_medico,coment_interconsulta
                    FROM medicinaingsw.interconsulta
                    WHERE interconsulta.idINTERCONSULTA = """ + id_intercon + """ AND interconsulta.id_paciente = """ + rut_pac
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

if __name__ == '__main__':
    app.run(debug=True)

