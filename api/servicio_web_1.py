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

#GET NombrePaciente
@app.route('/paciente/<string:rut_paciente>/<string:dig_verif>', methods=['GET'])
def getNombrePaciente(rut_paciente,dig_verif):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT nombres, apellidos
                FROM medicinaingsw.paciente 
                WHERE rut_paciente = """ + rut_paciente + """ AND dig_verif = '""" + dig_verif + """'"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET APPaciente
@app.route('/appaciente/<string:rut_paciente>', methods=['GET'])
def getAPPaciente(rut_paciente):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT paciente.rut_paciente,paciente.dig_verif,paciente.nombres,paciente.apellidos,paciente.direccion,paciente.cor_elec,
                paciente.comuna,paciente.fono,paciente.id_prevision, (DATE_ADD(paciente.fec_nacim, INTERVAL 1 DAY))fec_nacim,
                paciente.sexo,paciente.edad_menarq,(DATE_ADD(paciente.fec_menarq, INTERVAL 1 DAY))fec_menarq,paciente.actividad,paciente.deporte,
                (DATE_ADD(paciente.fec_ingreso, INTERVAL 1 DAY))fec_ingreso,paciente.tiempo_libre,paciente.rendimiento,paciente.prof_futuro,
                paciente.acompanante,paciente.cor_elec_acomp
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

#GET AntecAnamPaciente
@app.route('/antecanampaciente/<string:rut_paciente>', methods=['GET'])
def getAntecAnamaciente(rut_paciente):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT paciente.anamnesis,paciente.antec_morbidos
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

#//GET Medicos
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

#//GET Parientes(rut_paciente)
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

#GET Control(id_paciente)
@app.route('/control/<string:id_paciente>', methods=['GET'])
def getControl(id_paciente):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT * FROM medicinaingsw.control 
                WHERE id_paciente = """ + id_paciente
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-parientes)"}

#GET Exlab(id_control)
@app.route('/exlab/<string:id_control>', methods=['GET'])
def getExlab(id_control):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT ex_lab.idEX_LAB,ex_lab.Hb,ex_lab.T3,ex_lab.CT,ex_lab.PT,ex_lab.Hto,ex_lab.T4,ex_lab.T,ex_lab.ALB,ex_lab.GR,ex_lab.TSH,ex_lab.HDL,ex_lab.SG,ex_lab.GB,Fe,LDL,ex_lab.creatinina,ex_lab.EOS,ex_lab.insulina,ex_lab.uremia,ex_lab.VHS,ex_lab.glicemia,ex_lab.orina,ex_lab.parasito,ex_lab.otros_exam,ex_lab.radiografia
                FROM medicinaingsw.ex_lab JOIN medicinaingsw.control
                WHERE ex_lab.idEX_LAB = control.id_control AND ex_lab.idEX_LAB = """ + id_control
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
                AND interconsulta.idINTERCONSULTA = """ + id_intercon + """ ORDER BY diagnostico.idDIAGNOSTICO"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-parientes)"}

#GET ExFisico(id_intercon)
@app.route('/historial/exfisico/<string:rut_pac>', methods=['GET'])
def getExfisico(rut_pac):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT idEX_FISICO,edad,MG,MB,MM,GV,agua,imc,peso,talla,vello,mama,genital,tes_izq,test_der,diagnostico,indicacion,(DATE_ADD(sig_visita, INTERVAL 1 DAY))sig_visita,observacion
                FROM medicinaingsw.ex_fisico
                WHERE ex_fisico.idEX_FISICO = """ + rut_pac
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
                AND interconsulta.idINTERCONSULTA = """ + id_intercon + """ ORDER BY indicacion.idINDICACION"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-parientes)"}

#POST Paciente
@app.route('/pacientes/ingresarpaciente', methods=['POST'])
def postPaciente():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        acompanante = data['acompanante']
        rut_paciente = data['rut_paciente']
        dig_verif = data['dig_verif']
        nombres = data['nombres']
        apellidos = data['apellidos']
        direccion = data['direccion']
        cor_elec = data['cor_elec']
        cor_elec_acomp = data['cor_elec_acomp']
        comuna = data['comuna']
        fono = data['fono']
        id_prevision = data['id_prevision']
        fec_nacim = data['fec_nacim']
        sexo = data['sexo']
        edad_menarq = data['edad_menarq']
        fec_menarq = data['fec_menarq']
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
            query = "INSERT INTO medicinaingsw.paciente (rut_paciente,dig_verif,nombres,apellidos,direccion,cor_elec,comuna,fono,id_prevision,fec_nacim,sexo,edad_menarq,fec_menarq,actividad,deporte,fec_ingreso,tiempo_libre,rendimiento,prof_futuro,acompanante,cor_elec_acomp) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,curdate(),%s,%s,%s,%s,%s)"
            values = (rut_paciente,dig_verif,nombres,apellidos,direccion,cor_elec,comuna,fono,id_prevision,fec_nacim,sexo,edad_menarq,fec_menarq,actividad,deporte,tiempo_libre,rendimiento,prof_futuro,acompanante,cor_elec_acomp)
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

#POST Examen Fisico
@app.route('/paciente/ingresarexfisico', methods=['POST'])
def postExfisico():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        GV = data['GV']
        MB = data['MB']
        MG = data['MG']
        MM = data['MM']
        agua = data['agua']
        diagnostico = data['diagnostico']
        edad = data['edad']
        genital = data['genital']
        idEX_FISICO = data['idEX_FISICO']
        imc = data['imc']
        indicacion = data['indicacion']
        mama = data['mama']
        observacion = data['observacion']
        peso = data['peso']
        sig_visita = data['sig_visita']
        talla = data['talla']
        test_der = data['test_der']
        test_izq = data['test_izq']
        vello = data['vello']
        ctrl_existe = data['ctrl_existe']


        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """INSERT INTO medicinaingsw.ex_fisico (GV,MB,MG,MM,agua,diagnostico,edad,genital,idEX_FISICO,imc,indicacion,mama,observacion,peso,sig_visita,talla,test_der,tes_izq,vello,ctrl_existe)
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"""
            values = (GV,MB,MG,MM,agua,diagnostico,edad,genital,idEX_FISICO,imc,indicacion,mama,observacion,peso,sig_visita,talla,test_der,test_izq,vello,ctrl_existe)
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
        acompanante = data['acompanante']
        actividad = data['actividad']
        apellidos = data['apellidos']
        comuna = data['comuna']
        cor_elec = data['cor_elec']
        cor_elec_acomp = data['cor_elec_acomp']
        deporte = data['deporte']
        direccion = data['direccion']
        edad_menarq = data['edad_menarq']
        fec_menarq = data['fec_menarq']
        fec_nacim = data['fec_nacim']
        fono = data['fono']
        id_prevision = data['id_prevision']
        nombres = data['nombres']
        prof_futuro = data['prof_futuro']
        rendimiento = data['rendimiento']
        sexo = data['sexo']
        tiempo_libre = data['tiempo_libre']
        
        
        
        

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """UPDATE medicinaingsw.paciente
                    SET acompanante=%s,cor_elec_acomp=%s,fec_menarq=%s,fec_nacim=%s,nombres = %s,apellidos = %s,direccion = %s,cor_elec = %s,comuna = %s,fono = %s,id_prevision = %s,sexo = %s,edad_menarq = %s,actividad = %s,deporte = %s,tiempo_libre = %s,rendimiento = %s,prof_futuro = %s
                    WHERE paciente.rut_paciente  = """ + rut
            values = (acompanante,cor_elec_acomp,fec_menarq,fec_nacim,nombres,apellidos,direccion,cor_elec,comuna,fono,id_prevision,sexo,edad_menarq,actividad,deporte,tiempo_libre,rendimiento,prof_futuro)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Paciente creado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#UPDATE AntecMorbidosAnamnesis
@app.route('/pacientes/actualizarantec/<string:rut>', methods=['PATCH'])
def updateAntec(rut):
    if request.method == 'PATCH':
        data = request.get_json()
        print(data)
        anamnesis = data['anamnesis']
        antec_morbidos = data['antec_morbidos']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """UPDATE medicinaingsw.paciente
                    SET anamnesis=%s,antec_morbidos=%s
                    WHERE paciente.rut_paciente  = """ + rut
            values = (anamnesis,antec_morbidos)
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

#UPDATE ExFisico(idEX_FISICO)
@app.route('/exfisico/update/<string:id_exfisico>', methods=['PATCH'])
def updateExFisico(id_intercon):
    if request.method == 'PATCH':
        data = request.get_json()
        print(data)
        GV = data['GV']
        MB = data['MB']
        MG = data['MG']
        MM = data['MM']
        agua = data['agua']
        diagnostico = data['diagnostico']
        genital = data['genital']
        imc = data['imc']
        indicacion = data['indicacion']
        mama = data['mama']
        observacion = data['observacion']
        peso = data['peso']
        sig_visita = data['sig_visita']
        talla = data['talla']
        test_der = data['test_der']
        tes_izq = data['test_izq']
        vello = data['vello']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = """UPDATE medicinaingsw.interconsulta
                    SET GV=%s,MB=%s,MG=%s,MM=%s,agua=%s,diagnostico=%s,genital=%s,imc=%s,indicacion=%s,mama=%s,observacion=%s,peso=%s,sig_visita=%s,talla=%s,test_der=%s,tes_izq=%s,vello=%s
                    WHERE interconsulta.idINTERCONSULTA = """ + id_intercon
            values = (GV,MB,MG,MM,agua,diagnostico,genital,imc,indicacion,mama,observacion,peso,sig_visita,talla,test_der,tes_izq,vello)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Examen fisico actualizado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#//UPDATE Pariente
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

#GET CurrentDateAsString
@app.route('/date', methods=['GET'])
def getFecha():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT DATE_FORMAT(curdate(), '%d - %m - %Y')fec_real;"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET AgePacient
@app.route('/age/<string:rut_pac>', methods=['GET'])
def getEdad(rut_pac):
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT (DATEDIFF(CURDATE(),paciente.fec_nacim)/365.242190402)edad
                FROM medicinaingsw.paciente
                WHERE paciente.rut_paciente = """ + rut_pac
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

